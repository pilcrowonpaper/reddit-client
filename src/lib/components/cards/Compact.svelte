<script lang="ts">
	import Horizontal from '$lib/components/voting/post/Horizontal.svelte';

	import { formatTime, removeEmoji } from '$lib/utils/format';
	import { inViewport } from '$lib/utils/actions';
	import { createEventDispatcher } from 'svelte';

	import type { Post } from '$lib/types/reddit';

	export let post: Post;
	export let show: string[];
	export let show_nsfw = false;

	const dispatch = createEventDispatcher();

	const openPost = () => {
		dispatch('open', {
			post
		});
	};
</script>

<div class="group cursor-pointer py-4" use:inViewport on:display on:click={openPost}>
	<div class="flex gap-x-2">
		{#if post.data.thumbnail === 'self' || post.data.selftext}
			<div
				class="flex h-16 w-16 shrink-0 place-content-center place-items-center rounded-md bg-gray-200"
			>
				<p class="text-sm text-gray-400">text</p>
			</div>
		{:else if (post.data.thumbnail === 'nsfw' || post.data.over_18) && !show_nsfw}
			<div
				class="h-16 w-16 shrink-0 rounded-md bg-gray-200 flex place-content-center place-items-center"
			>
				<p class="text-sm text-gray-400">nsfw</p>
			</div>
		{:else if post.data.thumbnail === 'spoiler'}
			<div
				class="h-16 w-16 shrink-0 rounded-md bg-gray-200 flex place-content-center place-items-center"
			>
				<p class="text-sm text-gray-400">spoiler</p>
			</div>
		{:else if post.data.thumbnail === 'default' || !post.data.thumbnail}
			<div
				class="h-16 w-16 shrink-0 rounded-md bg-gray-200 flex place-content-center place-items-center"
			>
				<p class="text-sm text-gray-400">link</p>
			</div>
		{:else}
			<img
				class="h-16 w-16 object-cover rounded"
				src={post.data.thumbnail}
				alt="{post.data.thumbnail} thumbnail"
			/>
		{/if}
		<div class="grow">
			<h2
				class="semibold break-long-words text-sm leading-tight group-hover:text-blue-500 md:text-base md:leading-tight"
			>
				{post.data.title}
				{#if post.data.link_flair_text}
					<span
						class="w-fit rounded px-2 text-xs font-medium text-white"
						style:background-color={post.data.link_flair_background_color}
						class:text-white={post.data.link_flair_text_color === 'light'}
						class:text-black={post.data.link_flair_text_color === 'dark'}
					>
						{removeEmoji(post.data.link_flair_text)}
					</span>
				{/if}
			</h2>
			<div class="-mt-2 flex w-full flex-wrap place-items-center gap-x-2 whitespace-nowrap">
				{#if show.includes('subreddit')}
					<a
						class="text-xs hover:underline"
						href="/r/{post.data.subreddit}"
						on:click|stopPropagation={() => {}}>r/{post.data.subreddit}</a
					>
				{/if}
				{#if show.includes('user')}
					<a
						class="text-xs hover:underline"
						href="/u/{post.data.author}"
						on:click|stopPropagation={() => {}}>u/{post.data.author}</a
					>
				{/if}
				<p class="text-xs text-gray-400">
					{formatTime(new Date().getTime() - post.data.created_utc * 1000)} ago
				</p>
			</div>
			<div class="mt-3 flex gap-x-4">
				<Horizontal {post} />
				<p class="text-xs text-gray-400">{post.data.num_comments.toLocaleString()} comments</p>
				<p class="text-xs text-gray-400">save</p>
			</div>
		</div>
	</div>
</div>
