<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch, url }) => {
		const user = params.user;
		if (!user)
			return {
				status: 404
			};
		const sort = url.searchParams.get('sort') || null;
		const time = url.searchParams.get('time') || null;
		const filter = { sort, time };
		const request_url = getUserRequestUrl(user, 'comments', null, filter);
		const data_promise = fetch(request_url);
		const about_promise = fetch(`https://www.reddit.com/user/${user}/about.json?raw_json=1`);
		const response = (await Promise.allSettled([data_promise, about_promise])) as {
			status: string;
			value?: Response;
		}[];
		if (response.filter((val) => val.status !== 'fulfilled').length > 0) {
			return { status: 404 };
		}
		const listing: any = await response[0].value.json();
		const about: any = await response[1].value.json();
		if (about.error || listing.error) {
			return {
				status: 400
			};
		}
		if (about.kind !== 't5') {
			return {
				status: 404
			};
		}
		return {
			props: {
				initial_listing: listing as Listing<Comment>,
				about: about as User,
				filter
			}
		};
	};
</script>

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

	import type { User, Listing, Comment, Post } from '$lib/types/reddit';
	import type { Filter } from '$lib/types/filter';

	import {
		fetchNextPostBatch,
		getUserListing,
		getUserPathname,
		getUserRequestUrl
	} from '$lib/utils/users';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { inViewport } from '$lib/utils/actions';
	import { selected_post } from '$lib/stores';

	let comments = initial_listing.data.children;
	let latest_post_in_view: number = 0;
	let after_id = initial_listing.data.after;
	let batch_count = initial_listing.data.dist;
	const user = $page.params.user;

	const updateLatestPostInView = (id: number) => {
		if (id > latest_post_in_view) {
			latest_post_in_view = id;
		}
	};

	const getNextPostBatch = async (id: number) => {
		if (id > 0) {
			if (id % batch_count !== 0) return;
			if (!after_id) return;
		}
		const initial_sort = filter.sort ? filter.sort.valueOf() : null;
		const initial_time = filter.time ? filter.time.valueOf() : null;
		const result = await fetchNextPostBatch(user, 'comments', after_id, filter);
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
		getNewPosts(true);
	};

	const getNewPosts = async (update_history: boolean) => {
		comments = [];
		const new_url = $page.url.origin + getUserPathname(user, 'comments', null, filter);
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

	$: getNextPostBatch(latest_post_in_view);
</script>

<svelte:head>
	{#if $selected_post}
		<title>{$selected_post.data.title}</title>
	{:else}
		<title>u/{user}</title>
	{/if}
</svelte:head>

<div
	class="h-full overflow-auto px-4 py-3 sm:px-8 md:px-16 lg:px-24"
	class:overflow-hidden={!!$selected_post}
	class:overflow-auto={!$selected_post}
>
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
				<div class="mb-1 flex flex-wrap gap-x-2 text-xs font-medium">
					<p>{comment.data.link_title}</p>
					<p>r/{comment.data.subreddit}</p>
				</div>
				<div>
					<Comment_Block {comment} op={comment.data.link_author} collapsable={false} />
				</div>
			</div>
		{/each}
	</div>
</div>
