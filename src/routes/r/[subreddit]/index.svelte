<script lang="ts">
	export let initial_listing: Listing<Post>;
	export let about: About;
	export let filter: Filter = {
		sort: null,
		time: null
	};

	import Header from '$lib/components/subreddit/Header.svelte';
	import Compact from '$lib/components/cards/Compact.svelte';
	import Filter_Select from '$lib/components/subreddit/Filter.svelte';
	import Cards from '$lib/components/subreddit/Cards.svelte';
	import Large from '$lib/components/cards/Large.svelte';

	import type { About, Listing, Post } from '$lib/types/reddit';
	import type { Filter } from '$lib/types/filter';

	import { getPostListing, getPostPathname } from '$lib/utils/reddit/posts';
	import { page } from '$app/stores';
	import selected_post from '$lib/stores/post';
	import { onMount } from 'svelte';

	let posts = initial_listing.data.children;
	let latest_post_in_view = 0;
	let after_id = initial_listing.data.after;
	let batch_count = initial_listing.data.dist;
	const subreddit = $page.params.subreddit;

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
		const initial_sort = filter.sort ? filter.sort.valueOf() : null;
		const initial_time = filter.time ? filter.time.valueOf() : null;
		const result = await getPostListing(subreddit, after_id, filter);
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
		const new_url = $page.url.origin + getPostPathname(subreddit, filter);
		if (update_history) {
			window.history.replaceState({}, document.title, new_url);
		}
		const initial_sort = filter.sort.valueOf();
		const initial_time = filter.time.valueOf();
		let result = await getPostListing(subreddit, null, filter);
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

	onMount(() => {
		getNextPostBatch(0);
	});

	//over18
</script>

<svelte:head>
	{#if $selected_post}
		<title>{$selected_post.data.title}</title>
	{:else}
		<title>r/{subreddit}</title>
	{/if}
</svelte:head>


	<Header {about} />
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
					show={['user']}
					show_nsfw={about.data.over18}
				/>
			{:else if card === 'large'}
				<Large
					{post}
					on:display={() => {
						updateLatestPostInView(i);
					}}
					on:open={openPost}
					show={['user']}
					id={i}
					show_nsfw={about.data.over18}
				/>
			{/if}
		{/each}
	</div>
