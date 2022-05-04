<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url }) => {
		const sort = url.searchParams.get('sort') || 'hot';
		const time = url.searchParams.get('time') || null;
		const filter = { sort, time };
		const request_url = getPostRequestUrl(null, filter);
		const data_promise = fetch(request_url);
		const response = (await Promise.allSettled([data_promise])) as {
			status: string;
			value?: Response;
		}[];
		if (response.filter((val) => val.status !== 'fulfilled').length > 0) {
			return { status: 404 };
		}
		const listing: any = await response[0].value.json();
		if (listing.error)
			return {
				status: 404
			};
		return {
			props: {
				initial_listing: listing as Listing<Post>,
				filter
			}
		};
	};
</script>

<script lang="ts">
	export let initial_listing: Listing<Post>;
	export let filter: Filter = {
		sort: null,
		time: null
	};

	import Compact from '$lib/components/cards/Compact.svelte';
	import Filter_Select from '$lib/components/subreddit/Filter.svelte';
	import Cards from '$lib/components/subreddit/Cards.svelte';
	import Large from '$lib/components/cards/Large.svelte';
	import Header from '$lib/components/home/Header.svelte';

	import type { Listing, Post } from '$lib/types/reddit';
	import type { Filter } from '$lib/types/filter';

	import {
		getPostListing,
		getPostPathname,
		getPostRequestUrl
	} from '$lib/utils/home';
	import { page } from '$app/stores';
	import { selected_post } from '$lib/stores';

	let posts = initial_listing.data.children;
	let latest_post_in_view: number = 0;
	let after_id = initial_listing.data.after;
	let batch_count = initial_listing.data.dist;

	let card = 'large';

	const updateLatestPostInView = (id: number) => {
		if (id > latest_post_in_view) {
			latest_post_in_view = id;
		}
	};

	const getNextPostBatch = async (id: number) => {
		if (id > 0) {
			if ((id + 1) % batch_count !== 0) return;
			if (!after_id) return;
		}
		const initial_sort = filter.sort ? filter.sort.valueOf() : null;
		const initial_time = filter.time ? filter.time.valueOf() : null;
		const result = await getPostListing(after_id, filter);
		if (!result.success) return;
		if (initial_sort !== filter.sort || initial_time !== filter.time) return;
		const listing = result.data;
		const new_posts = listing.data.children;
		posts = [...posts, ...new_posts];
		latest_post_in_view = 0;
		after_id = listing.data.after;
		batch_count = listing.data.dist;
	};

	const handleFilter = (e: CustomEvent) => {
		filter = e.detail.options as Filter;
		getNewPosts(true);
	};

	const handleCardTypeChange = (e: CustomEvent) => {
		card = e.detail.value;
	};

	const getNewPosts = async (update_history: boolean) => {
		posts = [];
		const new_url = $page.url.origin + getPostPathname(filter);
		if (update_history) {
			window.history.replaceState({}, document.title, new_url);
		}
		const initial_sort = filter.sort.valueOf();
		const initial_time = filter.time.valueOf();
		let result = await getPostListing(null, filter);
		if (initial_sort !== filter.sort || initial_time !== filter.time) return;
		if (!result.success) return;
		const listing = result.data;
		posts = listing.data.children;
		latest_post_in_view = 0;
		after_id = listing.data.after;
		batch_count = listing.data.dist;
	};

	const openPost = (e: CustomEvent) => {
		selected_post.set(e.detail.post as Post);
	};

	$: getNextPostBatch(latest_post_in_view);
</script>

<svelte:head>
	{#if $selected_post}
		<title>{$selected_post.data.title}</title>
	{:else}
		<title>artic</title>
	{/if}
</svelte:head>

<div
	class="h-full overflow-auto px-4 py-3 sm:px-8 md:px-16 lg:px-24"
	class:overflow-hidden={!!$selected_post}
	class:overflow-auto={!$selected_post}
>
	<Header />
	<div class="mt-12 flex place-content-between">
		<Filter_Select {filter} on:select={handleFilter} />
		<Cards bind:type={card} on:select={handleCardTypeChange} />
	</div>
	<div class="flex flex-col divide-y">
		{#each posts as post, i}
			{#if card === 'compact'}
				<Compact
					{post}
					on:display={() => {
						updateLatestPostInView(i);
					}}
					on:open={openPost}
					show={['user', 'subreddit']}
				/>
			{:else if card === 'large'}
				<Large
					{post}
					on:display={() => {
						updateLatestPostInView(i);
					}}
					on:open={openPost}
					show={['user', 'subreddit']}
				/>
			{/if}
		{/each}
	</div>
</div>
