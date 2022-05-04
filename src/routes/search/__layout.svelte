<script lang="ts">

	import Header from '$lib/components/user/Header.svelte';
	import Filter_Select from '$lib/components/subreddit/Filter.svelte';
	import Cards from '$lib/components/subreddit/Cards.svelte';
	import PostPage from '$lib/components/post/Post_Page.svelte';
	import Large from '$lib/components/cards/Large.svelte';
	import Compact from '$lib/components/cards/Compact.svelte';

	import type { User, Listing, Post } from '$lib/types/reddit';
	import type { Filter } from '$lib/types/filter';

	import {
		fetchNextPostBatch,
		getUserListing,
		getUserPathname,
		getUserRequestUrl
	} from '$lib/utils/users';
	import { page } from '$app/stores';

	const user = $page.params.user;

	let card = 'large';
	let selected_post;

	const handleFilter = () => {};
	const handleCardTypeChange = () => {};
	const closePost = () => {};

    console.log($page)
</script>

<svelte:head>
	<title>/u/{user}</title>
</svelte:head>

<div
	class="h-full overflow-auto px-4 py-3 sm:px-8 md:px-16 lg:px-24"
	class:overflow-hidden={!!selected_post}
	class:overflow-auto={!selected_post}
>
	<div class="mt-12">
		<div class="flex w-full text-sm place-content-evenly sm:place-content-start">
			<a href="/search/posts{$page.url.search}" class="sm:px-3 font-medium hover:opacity-70" class:selected-tab={$page.routeId === "search/posts"}>Posts</a>
			<a href="/search/communities{$page.url.search}" class="sm:px-3 font-medium hover:opacity-70" class:selected-tab={$page.routeId === "search/communities"}>Communities</a>
			<a href="/search/users{$page.url.search}" class="sm:px-3 font-medium hover:opacity-70" class:selected-tab={$page.routeId === "search/users"}>Users</a>
		</div>
		<div class="w-full border-t" style:margin="-0.05rem" />
	</div>
	<slot/>
</div>

<style lang="postcss">
	.selected-tab {
		@apply border-b-2 border-blue-500;
	}
</style>
