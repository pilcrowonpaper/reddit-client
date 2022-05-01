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
		const request_url = getUserRequestUrl(user, 'submitted', null, filter);
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
		if (about.error || listing.error)
			return {
				status: 404
			};
		return {
			props: {
				initial_listing: listing as Listing<Post>,
				about: about as User,
				filter
			}
		};
	};
</script>

<script lang="ts">
	export let initial_listing: Listing<Post>;
	export let about: User;
	export let filter: Post_Filter = {
		sort: null,
		time: null
	};

	import Header from '$lib/components/user/Header.svelte';
	import Filter from '$lib/components/subreddit/Filter.svelte';
	import Cards from '$lib/components/subreddit/Cards.svelte';
	import PostPage from '$lib/components/post/Post_Page.svelte';
	import Large from '$lib/components/cards/Large.svelte';
	import Compact from '$lib/components/cards/Compact.svelte';

	import type { User, Listing, Post } from '$lib/types/reddit';
	import type { Post_Filter } from '$lib/types/filter';

	import {
		fetchNextPostBatch,
		getUserListing,
		getUserPathname,
		getUserRequestUrl
	} from '$lib/utils/users';
	import { page } from '$app/stores';

	let posts = initial_listing.data.children;
	let latest_post_in_view: number = 0;
	let after_id = initial_listing.data.after;
	let batch_count = initial_listing.data.dist;
	const user = $page.params.user;

	let card = 'large';

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
		const result = await fetchNextPostBatch(user, 'submitted', after_id, filter);
		if (!result.success) return;
		if (initial_sort !== filter.sort || initial_time !== filter.time) return;
		const batch = result.data;
		posts = [...posts, ...batch.posts];
		after_id = batch.after_id;
		batch_count = batch.batch_count;
	};

	const handleFilter = (e: CustomEvent) => {
		filter = e.detail.options as Post_Filter;
		getNewPosts(true);
	};

	const handleCardTypeChange = (e: CustomEvent) => {
		card = e.detail.value;
	};

	const getNewPosts = async (update_history: boolean) => {
		posts = [];
		const new_url = $page.url.origin + getUserPathname(user, 'posts', null, filter);
		if (update_history) {
			window.history.replaceState({}, document.title, new_url);
		}
		const initial_sort = filter.sort.valueOf();
		const initial_time = filter.time.valueOf();
		let result = await getUserListing(user, 'submitted', null, filter);
		if (initial_sort !== filter.sort || initial_time !== filter.time) return;
		if (!result.success) return;
		const listing = result.data;
		posts = listing.data.children;
		latest_post_in_view = 0;
		after_id = listing.data.after;
		batch_count = listing.data.dist;
	};

	let selected_post: Post = null;

	const openPost = (e: CustomEvent) => {
		selected_post = e.detail.post as Post;
		const new_url = `${window.location.origin}/r/${selected_post.data.subreddit}/${selected_post.data.id}`;
		window.history.replaceState({}, selected_post.data.title, new_url);
	};

	const closePost = () => {
		window.history.replaceState({}, null, `${window.location.origin}/u/${user}`);
		selected_post = null;
	};

	$: getNextPostBatch(latest_post_in_view);
</script>

<svelte:head>
	<title>/u/{user}</title>
</svelte:head>

{#if selected_post}
	<div
		class="fixed z-50 h-screen w-full overflow-auto bg-white px-4 py-3 sm:px-8 md:px-16 lg:px-24"
		style="-webkit-overflow-scrolling: touch"
	>
		<PostPage post={selected_post} on:close={closePost} />
	</div>
{/if}
<div
	class="h-screen px-4 py-3 sm:px-8 md:px-16 lg:px-24"
	class:disable-scroll={selected_post}
	class:overflow-auto={!selected_post}
	style="-webkit-overflow-scrolling: touch"
>
	<Header user={about} />
	<div class="mt-12 flex place-content-between">
		<Filter {filter} on:select={handleFilter} />
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
					show={["subreddit"]}
				/>
			{:else if card === 'large'}
				<Large
					{post}
					on:display={() => {
						updateLatestPostInView(i);
					}}
					on:open={openPost}
					show={["subreddit"]}
				/>
			{/if}
		{/each}
	</div>
</div>

<style lang="postcss">
	.disable-scroll {
		@apply h-screen overflow-hidden;
	}
</style>
