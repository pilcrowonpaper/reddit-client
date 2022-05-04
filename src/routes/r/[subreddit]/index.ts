import type { About, Listing, Post } from '$lib/types/reddit';
import { getPostRequestUrl } from '$lib/utils/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params, url }) => {
	const subreddit = params.subreddit;
	if (!subreddit)
		return {
			status: 404
		};
	const sort = url.searchParams.get('sort') || null;
	const time = url.searchParams.get('time') || null;
	const filter = { sort, time };
	const request_url = getPostRequestUrl(subreddit, null, filter);
	const data_promise = fetch(request_url);
	const about_promise = fetch(`https://www.reddit.com/r/${subreddit}/about.json?raw_json=1`);
	const response = await Promise.all([data_promise, about_promise]);
	const listing: any = await response[0].json();
	const about: any = await response[1].json();
	if (about.error || listing.error) {
		return {
			status: 400
		};
	}
	if (about.kind !== 't5') {
		return {
			status: 404
		};
	}
	return {
		body: {
			initial_listing: listing as Listing<Post>,
			about: about as About,
			filter
		}
	};
};
