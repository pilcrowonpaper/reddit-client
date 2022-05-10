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
	import Loading from '$lib/components/utils/Loading.svelte';

	import type { Listing, Post } from '$lib/types/reddit';
	import type { Filter } from '$lib/types/filter';

	import { getPostListing, getPostPathname } from '$lib/utils/reddit/home';
	import { page } from '$app/stores';
	import selected_post from '$lib/stores/post';
	import { onMount } from 'svelte';
	import about_data from '$lib/stores/about';

	let posts = initial_listing.data.children;
	let latest_post_in_view: number = 0;
	let after_id = initial_listing.data.after;
	let batch_count = initial_listing.data.dist;
	let loading = false;

	let card = 'large';

	const updateLatestPostInView = (id: number) => {
		if (id > latest_post_in_view) {
			latest_post_in_view = id;
			getNextPostBatch(latest_post_in_view);
		}
	};

	const getNextPostBatch = async (id: number) => {
		if (id > 0) {
			if ((id + 1) % batch_count !== 0) return;
			if (!after_id) return;
		}
		loading = true;
		const initial_sort = filter.sort ? filter.sort.valueOf() : null;
		const initial_time = filter.time ? filter.time.valueOf() : null;
		const result = await getPostListing(after_id, filter);
		if (!result.success) return (loading = false);
		if (initial_sort !== filter.sort || initial_time !== filter.time) return (loading = false);
		const listing = result.data;
		const new_posts = listing.data.children;
		posts = [...posts, ...new_posts];
		latest_post_in_view = 0;
		after_id = listing.data.after;
		batch_count = listing.data.dist;
		loading = false;
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
		loading = true;
		const new_url = $page.url.origin + getPostPathname(filter);
		if (update_history) {
			window.history.replaceState({}, document.title, new_url);
		}
		const initial_sort = filter.sort.valueOf();
		const initial_time = filter.time.valueOf();
		let result = await getPostListing(null, filter);
		if (initial_sort !== filter.sort || initial_time !== filter.time) return (loading = false);
		if (!result.success) return (loading = false);
		const listing = result.data;
		posts = listing.data.children;
		latest_post_in_view = 0;
		after_id = listing.data.after;
		batch_count = listing.data.dist;
		loading = false;
	};

	const openPost = (e: CustomEvent) => {
		about_data.set(null);
		selected_post.set(e.detail.post as Post);
	};

	onMount(() => {
		getNextPostBatch(0);
	});
</script>

<svelte:head>
	{#if $selected_post}
		<title>{$selected_post.data.title}</title>
	{:else}
		<title>arctic</title>
	{/if}
</svelte:head>

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
				id={i}
			/>
		{/if}
	{/each}
	{#if loading}
		<div class="flex w-full place-content-center py-12">
			<Loading />
		</div>
	{/if}
</div>
