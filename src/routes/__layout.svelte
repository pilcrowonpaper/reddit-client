<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import selected_post from '$lib/stores/post';
	import { onMount } from 'svelte';

	import type { Post } from '$lib/types/reddit';

	import PostPage from '$lib/components/post/Post_Page.svelte';

	import '../app.postcss';
	import about_data from '$lib/stores/about';

	let search_text: string;
	let search_bar: HTMLInputElement;

	const handleInput = (e: KeyboardEvent) => {
		if (e.keyCode !== 13) return;
		if (!search_text) return;
		window.location.href = `/search?q=${search_text}`;
	};

	const handleWindowInput = (e: KeyboardEvent) => {
		if (!e.ctrlKey || e.code !== 'Space') return;
		search_bar.focus();
	};

	let previous_url: string;
	let previous_post = false;

	const setNewUrl = (post: Post) => {
		if (post) {
			previous_url = $page.url.href.valueOf();
			const new_url = `${window.location.origin}/r/${$selected_post.data.subreddit}/${$selected_post.data.id}`;
			previous_post = true;
			window.history.replaceState({}, null, new_url);
		} else if (previous_post) {
			previous_post = false;
			window.history.replaceState({}, null, previous_url);
		}
	};

	$: setNewUrl($selected_post);

	afterNavigate(() => {
		about_data.set(null);
		selected_post.set(null);
		body_element.style.overflow = '';
	});

	let header_height: number;
	let inner_height: number;
	let body_element: HTMLBodyElement;

	onMount(() => {
		body_element = document.body as HTMLBodyElement;
	});

	$: if (body_element && $selected_post) {
		body_element.style.overflow = 'hidden';
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<svelte:window on:keydown={handleWindowInput} bind:innerHeight={inner_height} />
<svelte:body />

<div
	class="sticky top-0 z-50 border-b bg-white px-4 py-2 sm:px-8 md:px-16 lg:px-24"
	bind:clientHeight={header_height}
>
	<div class="mx-auto flex w-full max-w-5xl place-content-between place-items-center gap-x-4">
		<button
			class="text-xl font-medium"
			on:click={() => {
				goto('/');
			}}>arctic</button
		>
		<input
			class="w-full max-w-sm rounded-md bg-gray-100 px-4 py-1.5 text-sm outline-none"
			placeholder="search"
			bind:value={search_text}
			on:keydown={handleInput}
			bind:this={search_bar}
		/>
	</div>
</div>
{#if $selected_post}
	<div
		class="fixed z-40 w-full overflow-scroll bg-white px-4 py-3 sm:px-8 md:px-16 lg:px-24"
		style:height="{inner_height - header_height}px"
		on:scroll={(e) => e.stopImmediatePropagation}
	>
		<div class="mx-auto mb-12 w-full max-w-5xl">
			<PostPage
				post={$selected_post}
				on:close={() => {
					selected_post.set(null);
					body_element.style.overflow = '';
				}}
			/>
		</div>
	</div>
{/if}
<div class=" px-4 py-3 sm:px-8 md:px-16 lg:px-24">
	<div class="mx-auto mb-12 max-w-5xl">
		<slot />
	</div>
</div>

<style lang="postcss">
	:global(body) {
		font-family: 'Poppins', sans-serif;
	}
	:global(.md) {
		@apply text-sm;
	}
	:global(.md p, h1, h2) {
		@apply mb-2;
	}
	:global(p:last-child, h1:last-child, h2:last-child) {
		@apply mb-0;
	}
	:global(.md h1, h2) {
		@apply text-base font-medium;
	}
	:global(.md strong) {
		@apply font-semibold;
	}
	:global(.md a) {
		@apply break-all text-blue-500 hover:underline;
	}
	:global(.md p:empty) {
		@apply hidden;
	}
	:global(.md ol) {
		@apply mb-2 list-inside list-decimal;
	}
	:global(.md ul) {
		@apply mb-2 list-inside list-disc;
	}
	:global(.md :not(pre) code) {
		@apply break-all rounded bg-gray-200 px-1;
	}
	:global(.md pre) {
		@apply mb-2 overflow-x-auto rounded-lg bg-gray-200 px-2 pb-3 pt-2;
	}
	:global(.md hr) {
		@apply hidden;
	}
	:global(.md blockquote) {
		@apply mb-2 ml-1 border-l-4 border-gray-200 py-0.5 pl-2;
	}
	:global(.md img) {
		@apply rounded-md;
	}
</style>
