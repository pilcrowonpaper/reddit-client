<script lang="ts">
	import selected_post from '$lib/stores/post';
	import { page } from '$app/stores';
</script>

<svelte:head>
	{#if $selected_post}
		<title>{$selected_post.data.title}</title>
	{:else}
		<title>arctic search results</title>
	{/if}
</svelte:head>

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

<style lang="postcss">
	.selected-tab {
		@apply border-b-2 border-blue-500;
	}
</style>
