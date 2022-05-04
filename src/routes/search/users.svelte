<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url }) => {
		const query = url.searchParams.get('q');
		let query_text: string;
		if (query.includes(':')) {
			query_text = query.split(':')[1];
		} else {
			query_text = query;
		}
		const request_url = getSearchRequestUrl(query_text, 'user');
		const listing_response = await fetch(request_url);
		if (!listing_response.ok) {
			return {
				status: 404
			};
		}
		const listing = await listing_response.json();
		return {
			props: {
				initial_listing: listing as Listing<User>,
				query_text
			}
		};
	};
</script>

<script lang="ts">
	export let initial_listing: Listing<User>;
	export let query_text: string;

	import type { Listing, Post, User } from '$lib/types/reddit';

	import { getSearchListing, getSearchRequestUrl } from '$lib/utils/search';
	import { inViewport } from '$lib/utils/actions';
	import { goto } from '$app/navigation';
	import { dataset_dev } from 'svelte/internal';

	let users = initial_listing.data.children;
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
			if (id % batch_count !== 0) return;
			if (!after_id) return;
		}
		if (batch_count < 25) return;
		const result = await getSearchListing(query_text, 'user', null, after_id);
		if (!result.success) return;
		const listing = result.data;
		const new_users = listing.data.children as User[];
		users = [...users, ...new_users];
		after_id = result.data.data.after;
		batch_count = new_users.length;
	};

	$: getNextPostBatch(latest_post_in_view);
</script>

<div class="mt-2 flex flex-col divide-y">
	{#each users as user, i}
		<div
			class="flex gap-x-4 py-2"
			use:inViewport
			on:display={() => {
				updateLatestPostInView(i);
			}}
			on:click={() => {
				if (user.data.is_suspended) return;
				goto(`/u/${user.data.name}`);
			}}
			class:cursor-pointer={!user.data.is_suspended}
		>
			{#if user.data.icon_img}
				<img class="h-8 rounded-full" src={user.data.icon_img} alt={user.data.name} />
			{:else}
				<div
					class="h-8 w-8 flex-shrink-0 rounded-full bg-blue-500 flex place-items-center place-content-center text-white text-lg font-semibold"
				>
					{user.data.name.charAt(0).toLocaleLowerCase()}
				</div>
			{/if}

			<div>
				<p class="text-sm font-medium">{user.data.name}</p>
				{#if user.data.subreddit}
					<p class="text-xs">{user.data.subreddit.public_description}</p>
				{/if}
				{#if user.data.is_suspended}
					<p class="text-xs text-red-500">user suspended</p>
				{/if}
			</div>
		</div>
	{/each}
</div>
