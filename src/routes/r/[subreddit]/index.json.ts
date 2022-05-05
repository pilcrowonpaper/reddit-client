import type { About, Listing, Post } from '$lib/types/reddit';
import { retryFetch } from '$lib/utils/fetch';
import { getPostRequestUrl } from '$lib/utils/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url, params }) => {
	const subreddit = params.subreddit;
	if (!subreddit)
		return {
			status: 404
		};
	const sort = url.searchParams.get('sort') || null;
	const time = url.searchParams.get('time') || null;
	const filter = { sort, time };
	const request_url = getPostRequestUrl(subreddit, null, filter);
	try {
		const data_promise = fetch(request_url);
		const about_promise = fetch(`https://www.reddit.com/r/${subreddit}/about.json?raw_json=1`);
		const response = await Promise.all([data_promise, about_promise]);
		const listing: any = response[0];
		const about: any = response[1];
		if (about.error || listing.error) throw Error();
		if (about.kind !== 't5') return { status: 404 };
		return {
			body: JSON.stringify({
				initial_listing: listing as Listing<Post>,
				about: about as About,
				filter
			})
		};
	} catch (e) {
		console.log('error');
		console.log(e);
		return { status: 500 };
	}
};
