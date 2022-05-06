<script lang="ts">
	import { selected_post } from '$lib/stores';
	import { page } from '$app/stores';
</script>

<svelte:head>
	{#if $selected_post}
		<title>{$selected_post.data.title}</title>
	{:else}
		<title>arctic search results</title>
	{/if}
</svelte:head>

<div
	class="h-full overflow-auto px-4 py-3 sm:px-8 md:px-16 lg:px-24"
	class:overflow-hidden={!!$selected_post}
	class:overflow-auto={!$selected_post}
>
	<div class="mt-12">
		<div class="flex w-full place-content-evenly text-sm sm:place-content-start">
			<a
				href="/search/posts{$page.url.search}"
				class="font-medium hover:opacity-70 sm:px-3"
				class:selected-tab={$page.routeId === 'search/posts'}>Posts</a
			>
			<a
				href="/search/communities{$page.url.search}"
				class="font-medium hover:opacity-70 sm:px-3"
				class:selected-tab={$page.routeId === 'search/communities'}>Communities</a
			>
			<a
				href="/search/users{$page.url.search}"
				class="font-medium hover:opacity-70 sm:px-3"
				class:selected-tab={$page.routeId === 'search/users'}>Users</a
			>
		</div>
		<div class="w-full border-t" style:margin="-0.05rem" />
	</div>
	<slot />
</div>

<style lang="postcss">
	.selected-tab {
		@apply border-b-2 border-blue-500;
	}
</style>
