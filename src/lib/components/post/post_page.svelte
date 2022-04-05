<script lang="ts">
	import Comment_Block from '$lib/components/post/Comment.svelte';
	import Post_Block from '$lib/components/post/Post.svelte';
	import Sort from '$lib/components/post/Sort.svelte';
	import Header from '$lib/components/subreddit/Header.svelte';
	import Back_Arrow from '$lib/components/icons/Back_Arrow.svelte';

	import type { About, Post, Comment } from '$lib/types/reddit';
	import type { Comment_Filter } from '$lib/types/filter';

	import {
		getCommentsListing,
		getCommentsPathname,
		getMoreCommentsListing,
		getMoreCommentsRequestUrl
	} from '$lib/utils/comments';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let post: Post;
	export let comments: Comment[] = [];
	export let about: About;
	export let filter: Comment_Filter = {
		sort: 'best'
	};

	const handleSort = (e: CustomEvent) => {
		filter = e.detail.options as Comment_Filter;
		getNewComments(post.data.subreddit, post.data.id, true);
	};

	const getNewComments = async (
		subreddit: string,
		post_id: string,
		update_history: boolean,
		comment_id?: string
	) => {
		comments = [];
		const new_url = $page.url.origin + getCommentsPathname(subreddit, post_id, filter, comment_id);
		if (update_history) {
			window.history.pushState({}, document.title, new_url);
		}
		const initial_sort = filter.sort.valueOf();
		let result = await getCommentsListing(subreddit, post_id, filter, comment_id);
		if (initial_sort !== filter.sort) return;
		if (!result.success) return;
		const comment_listing = result.data.comment;
		comments = comment_listing.data.children;
	};

	const handleContinueThread = (e: CustomEvent) => {
		const id = e.detail.id;
		getNewComments(post.data.subreddit, post.data.id, false, id);
	};

	let innerWidth: number;
	let depth_limit = 10;

	const handleCommentDepth = (width: number): number => {
		if (!width) return 10;
		if (width >= 900) return 10;
		if (width < 400) return 5;
		return Math.floor((width + 100) / 100);
	};

	const getMoreComments = async (e: CustomEvent) => {
		// url should be : http://www.reddit.com/api/morechildren?link_id=t3_twrc42&children=i3hi8e8&api_type=json&raw_json=1
		const children = e.detail.children as string[];
		console.log("more")
		let result = await getMoreCommentsListing(post.data.name, children);
		if (!result.success) return;
		const comment_listing = result.data.comment;
		console.log(comment_listing)
	};

	$: depth_limit = handleCommentDepth(innerWidth);

	if (comments.length === 0) {
		getNewComments(post.data.subreddit, post.data.id, false);
	}
</script>

<Header {about} show={false} />
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
		<div class="mt-8">
			<Sort options={filter} on:select={handleSort} />
			<div class="mt-2 flex flex-col gap-y-4">
				{#each comments as comment}
					<Comment_Block
						{comment}
						on:continue={handleContinueThread}
						on:more={getMoreComments}
						{depth_limit}
						op={post.data.author}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>
