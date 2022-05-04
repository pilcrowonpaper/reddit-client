<script lang="ts">
	import Comment_Block from '$lib/components/post/Comment.svelte';
	import Post_Block from '$lib/components/post/Post.svelte';
	import Sort from '$lib/components/post/Sort.svelte';
	import Header from '$lib/components/subreddit/Header.svelte';
	import Back_Arrow from '$lib/components/icons/Back_Arrow.svelte';

	import type { About, Post, Comment } from '$lib/types/reddit';
	import type { Filter } from '$lib/types/filter';

	import { getCommentContents, getCommentsListing } from '$lib/utils/comments';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let post: Post;
	export let comments: Comment[] = [];
	export let about: About = null;
	export let filter: Filter = {
		sort: 'best'
	};
	export let id: string = null;
	let next_comments: Comment[] = [];

	const batch_count = 50;

	const handleSort = (e: CustomEvent) => {
		filter = e.detail.options as Filter;
		getNewComments(post.data.subreddit, post.data.id);
	};

	const getNewComments = async (subreddit: string, post_id: string, comment_id?: string) => {
		comments = [];
		const initial_sort = filter.sort.valueOf();
		let result = await getCommentsListing(subreddit, post_id, filter, comment_id);
		if (initial_sort !== filter.sort) return;
		if (!result.success) return;
		const comment_listing = result.data.comment;
		comments = comment_listing.data.children;
	};

	const handleContinueThread = async (e: CustomEvent) => {
		const comment_id = e.detail.id;
		await getNewComments(post.data.subreddit, post.data.id, comment_id);
		id = comment_id;
		const new_url = window.location.origin + window.location.pathname + '?comment=' + comment_id;
		window.history.replaceState({}, '', new_url);
	};

	let innerWidth: number;
	let depth_limit = 10;

	const handleCommentDepth = (width: number): number => {
		if (!width) return 10;
		if (width >= 900) return 10;
		if (width < 400) return 5;
		return Math.floor((width + 100) / 100);
	};

	let next_children_start = 0;

	const getNextCommentBatch = async () => {
		const next_children = more_children.slice(
			next_children_start,
			next_children_start + batch_count
		);
		const comment_result = await getCommentContents(
			post.data.subreddit,
			post.data.id,
			next_children
		);
		if (!comment_result.success) return;
		next_children_start += comment_result.data.length;
		next_comments = [...next_comments, ...comment_result.data];
	};

	$: depth_limit = handleCommentDepth(innerWidth);

	if (comments.length === 0) {
		getNewComments(post.data.subreddit, post.data.id, id);
	}

	let more_children: string[] = [];
	$: if (comments.length) {
		more_children =
			comments[comments.length - 1].kind === 'more'
				? comments[comments.length - 1].data.children
				: [];
	}

	const viewAll = () => {
		window.history.replaceState({}, '', window.location.origin + window.location.pathname);
		getNewComments(post.data.subreddit, post.data.id);
	};
</script>

<Header {about} show={false} subreddit={post.data.subreddit} />
<svelte:window bind:innerWidth />
<div class="mt-8 w-full">
	<div class="h-full w-full">
		<div class="mb-1">
			<Back_Arrow
				size={6}
				on:click={() => {
					dispatch('close');
				}}
				custom_class="cursor-pointer"
			/>
		</div>
		<Post_Block {post} />
		<div class="mt-12">
			<div class="flex place-content-between place-items-center">
				<Sort options={filter} on:select={handleSort} />
				{#if id}
					<button class="text-sm text-blue-500 hover:underline" on:click={viewAll}>view all</button>
				{/if}
			</div>
			<div class="mt-2 flex flex-col gap-y-4">
				{#each comments as comment}
					{#if comment.kind !== 'more'}
						<Comment_Block
							{comment}
							on:continue={handleContinueThread}
							{depth_limit}
							op={post.data.author}
						/>
					{/if}
				{/each}
				{#each next_comments as comment}
					<Comment_Block
						{comment}
						on:continue={handleContinueThread}
						{depth_limit}
						op={post.data.author}
					/>
				{/each}
				{#if more_children.length > 0 && more_children.length - next_comments.length > 0}
					<button
						class="cursor-pointer text-sm text-blue-500 hover:underline"
						on:click={getNextCommentBatch}>show more</button
					>
				{/if}
			</div>
		</div>
	</div>
</div>
