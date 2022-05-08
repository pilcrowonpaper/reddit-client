<script lang="ts">
	import Post_Page from '$lib/components/post/Post_Page.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import selected_post from '$lib/stores/post';

	import type { Filter } from '$lib/types/filter';
	import type { About, Listing, Post, Comment } from '$lib/types/reddit';

	export let post_listing: Listing<Post>;
	export let comment_listing: Listing<Comment>;
	export let about: About;
	export let filter: Filter = {
		sort: 'best'
	};
	export let id: string = null;

	const post = post_listing.data.children[0];
	const comments = comment_listing.data.children;

	const returnHome = () => {
		goto(`/r/${$page.params.subreddit}`, { replaceState: true });
	};

	selected_post.set(null)
</script>

<div class="px-4 py-3 sm:px-8 md:px-16 lg:px-24 pb-12">
	<Post_Page {post} {comments} {about} {filter} {id} on:close={returnHome} />
</div>
