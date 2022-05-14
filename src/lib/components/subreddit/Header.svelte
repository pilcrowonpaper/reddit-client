<script lang="ts">
	import { goto } from '$app/navigation';

	export let about: About;
	export let show = true;
	export let subreddit = null;

	import type { About } from '$lib/types/reddit/index';

	const getAbout = async () => {
		const response = await fetch(`https://www.reddit.com/r/${subreddit}/about.json?raw_json=1`);
		about = (await response.json()) as About;
	};
	if (!about && subreddit) {
		getAbout();
	}
</script>

<div>
	<div class="flex place-items-center gap-2 pt-8 pb-4">
		{#if about && (about.data.community_icon || about.data.icon_img)}
			<img
				class="h-12 w-12 rounded-full"
				src={about.data.community_icon || about.data.icon_img}
				alt="r/{about.data.display_name} icon"
			/>
		{:else}
			<div
				class="h-12 w-12 rounded-full bg-blue-500 flex place-items-center place-content-center text-white text-2xl font-semibold"
			>
				{subreddit ? subreddit.charAt(0).toLocaleLowerCase() : about.data.display_name.charAt(0).toLocaleLowerCase()}
			</div>
		{/if}
		<h1
			class="cursor-pointer text-2xl font-semibold"
			on:click={() => {
				goto(`/r/${subreddit || about.data.display_name}`);
			}}
		>
			r/{subreddit || about.data.display_name}
		</h1>
	</div>
	{#if show}
		<div class="mt-2 flex flex-col gap-y-2 text-sm">
			<div class="flex gap-4  font-medium">
				<p>{about.data.subscribers.toLocaleString()} members</p>
				<p>{about.data.accounts_active.toLocaleString()} online</p>
				{#if about.data.over18}
					<p class="text-red-400">nsfw</p>
				{/if}
			</div>
			<div>
				<p id="md">{@html about.data.public_description_html || ''}</p>
				<a
					class="mt-4 text-sm text-blue-500 hover:underline"
					href="/r/{about.data.display_name}/about">rules</a
				>
			</div>
		</div>
	{/if}
</div>
