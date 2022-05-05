<script lang="ts">
	export let initial_listing: Listing<About>;
	export let query_text: string;

	import type { Listing, About } from '$lib/types/reddit';

	import { getSearchListing } from '$lib/utils/reddit/search';
	import { inViewport } from '$lib/utils/actions';
	import { goto } from '$app/navigation';
import { browser } from '$app/env';

	let communities = initial_listing.data.children;
	let latest_post_in_view: number = 0;
	let after_id = initial_listing.data.after;
	let batch_count = initial_listing.data.dist;

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
		if (batch_count < 25) return;
		const result = await getSearchListing(query_text, 'sr', null, after_id);
		if (!result.success) return;
		const listing = result.data;
		const new_communities = listing.data.children as About[];
		communities = [...communities, ...new_communities];
		after_id = result.data.data.after;
		batch_count = new_communities.length;
	};

	$: if (browser) {
		getNextPostBatch(latest_post_in_view);
	}
</script>

<div class="mt-2 flex flex-col divide-y">
	{#each communities as community, i}
		<div
			class="flex cursor-pointer gap-x-4 py-2"
			use:inViewport
			on:display={() => {
				updateLatestPostInView(i);
			}}
			on:click={() => {
				goto(`/r/${community.data.display_name}`);
			}}
		>
			{#if community.data.icon_img}
				<img class="h-8 rounded-full" src={community.data.icon_img} alt={community.data.name} />
			{:else}
				<div
					class="h-8 w-8 flex-shrink-0 rounded-full bg-blue-500 flex place-items-center place-content-center text-white text-lg font-semibold"
				>
					{community.data.display_name.charAt(0).toLocaleLowerCase()}
				</div>
			{/if}
			<div>
				<p class="text-sm font-medium">{community.data.display_name}</p>
				<p class="text-xs font-medium">{community.data.subscribers.toLocaleString()} subscribers</p>
				<p class="text-xs">{community.data.public_description}</p>
			</div>
		</div>
	{/each}
</div>
