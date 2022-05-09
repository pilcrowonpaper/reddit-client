<script lang="ts">
	export let initial_listing: Listing<Comment>;
	export let about: User;
	export let filter: Filter = {
		sort: null,
		time: null
	};

	import Header from '$lib/components/user/Header.svelte';
	import Filter_Select from '$lib/components/subreddit/Filter.svelte';
	import Comment_Block from '$lib/components/post/Comment.svelte';

	import type { User, Listing, Comment } from '$lib/types/reddit';
	import type { Filter } from '$lib/types/filter';

	import { getUserListing, getUserPathname } from '$lib/utils/reddit/users';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { inViewport } from '$lib/utils/actions';
	import selected_post from '$lib/stores/post';
	import { onMount } from 'svelte';

	let comments = initial_listing.data.children;
	let latest_post_in_view: number = 0;
	let after_id = initial_listing.data.after;
	let batch_count = initial_listing.data.dist;
	const user = $page.params.user;

	const updateLatestPostInView = (id: number) => {
		if (id > latest_post_in_view) {
			latest_post_in_view = id;
			getNextCommentBatch(latest_post_in_view);
		}
	};

	const getNextCommentBatch = async (id: number) => {
		if (id > 0) {
			if ((id + 1) % batch_count !== 0) return;
			if (!after_id) return;
		}
		const initial_sort = filter.sort ? filter.sort.valueOf() : null;
		const initial_time = filter.time ? filter.time.valueOf() : null;
		const result = await getUserListing(user, 'comments', after_id, filter);
		if (!result.success) return;
		if (initial_sort !== filter.sort || initial_time !== filter.time) return;
		const listing = result.data;
		const new_comments = listing.data.children as Comment[];
		comments = [...comments, ...new_comments];
		after_id = listing.data.after;
		batch_count = new_comments.length;
	};

	const handleFilter = (e: CustomEvent) => {
		filter = e.detail.options as Filter;
		getNewComments(true);
	};

	const getNewComments = async (update_history: boolean) => {
		comments = [];
		const new_url = $page.url.origin + getUserPathname(user, 'comments', filter);
		if (update_history) {
			window.history.replaceState({}, document.title, new_url);
		}
		const initial_sort = filter.sort.valueOf();
		const initial_time = filter.time.valueOf();
		let result = await getUserListing(user, 'comments', null, filter);
		if (initial_sort !== filter.sort || initial_time !== filter.time) return;
		if (!result.success) return;
		const listing = result.data as Listing<Comment>;
		comments = listing.data.children as Comment[];
		latest_post_in_view = 0;
		after_id = listing.data.after;
		batch_count = listing.data.dist;
	};

	onMount(() => {
		getNextCommentBatch(0);
	});
</script>

<svelte:head>
	{#if $selected_post}
		<title>{$selected_post.data.title}</title>
	{:else}
		<title>u/{user}</title>
	{/if}
</svelte:head>

<Header user={about} />
<div class="mt-12">
	<div class="flex w-full text-sm">
		<a href="/u/{$page.params.user}/posts" class="px-3 font-medium hover:opacity-70">Posts</a>
		<a
			href="/u/{$page.params.user}/comments"
			class="border-b-2 border-blue-500 px-3 font-medium hover:opacity-70">Comments</a
		>
	</div>
	<div class="w-full border-t" style:margin="-0.05rem" />
	<div class="mt-2 flex place-content-between">
		<Filter_Select {filter} on:select={handleFilter} />
	</div>
</div>
<div class="mt-2 flex flex-col divide-y">
	{#each comments as comment, i}
		<div
			class="cursor-pointer py-2"
			on:click={() => {
				goto(`/r/${comment.data.subreddit}/${comment.data.link_id.substring(3)}`);
			}}
			use:inViewport
			on:display={() => {
				updateLatestPostInView(i);
			}}
		>
			<div class="mb-2 flex flex-wrap gap-x-2 text-xs font-medium">
				<p>{comment.data.link_title}</p>
				<p>r/{comment.data.subreddit}</p>
			</div>
			<div>
				<Comment_Block {comment} op={comment.data.link_author} collapsable={false} />
			</div>
		</div>
	{/each}
</div>
