<script context="module" lang="ts">
	import type { Comment_Filter } from '$lib/types/filter';

	import type { About, Listing, Post, Comment } from '$lib/types/reddit';
	import { getCommentsRequestUrl } from '$lib/utils/comments';
	import type { Load } from '@sveltejs/kit';

	// this page also handles r/[subreddit]/index.svelte

	export const load: Load = async ({ params, fetch, url }) => {
		const subreddit = params.subreddit;
		const post_id = params.post;
		const id = url.searchParams.get('comment') || null;
		if (!subreddit) {
			return {
				status: 404
			};
		}
		const sort = params.sort || url.searchParams.get('sort') || 'best';
		const filter: Comment_Filter = {
			sort
		};
		const request_url = getCommentsRequestUrl(subreddit, post_id, filter, id);
		const data_promise = fetch(request_url);
		const about_promise = fetch(`https://www.reddit.com/r/${subreddit}/about.json?raw_json=1`);
		const response = (await Promise.allSettled([data_promise, about_promise])) as {
			status: string;
			value?: Response;
		}[];
		if (response.filter((val) => val.status !== 'fulfilled').length > 0) {
			return { status: 404 };
		}
		const post_data: any = await response[0].value.json();
		const about: any = await response[1].value.json();
		if (about.error || post_data.error)
			return {
				status: 404
			};
		const post_listing = post_data[0] as Listing<Post>;
		const comment_listing = post_data[1] as Listing<Comment>;
		return {
			props: {
				post_listing,
				comment_listing,
				about: about as About,
				filter,
				id
			}
		};
	};
</script>

<script lang="ts">
	import Post_Page from '$lib/components/post/Post_Page.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let post_listing: Listing<Post>;
	export let comment_listing: Listing<Comment>;
	export let about: About;
	export let filter: Comment_Filter = {
		sort: 'best'
	};
	export let id: string = null;

	const post = post_listing.data.children[0];
	const comments = comment_listing.data.children;

	const returnHome = () => {
		goto(`/r/${$page.params.subreddit}`, { replaceState: true });
	};
</script>

<div class="h-screen px-4 py-3 sm:px-8 md:px-16 lg:px-24">
	<Post_Page {post} {comments} {about} {filter} {id} on:close={returnHome} />
</div>
