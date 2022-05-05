import { getSearchRequestUrl } from '$lib/utils/reddit/search';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');
	const sort = url.searchParams.get('sort') || 'relevance';
	const time = url.searchParams.get('time') || 'all';
	const filter = { sort, time };
	let query_text: string;
	let subreddit: string = null;
	if (query.includes(':')) {
		subreddit = query.split(':')[0];
		query_text = query.split(':')[1];
	} else {
		query_text = query;
	}
    if (!query_text) return { status: 400 };
	try {
		const request_url = getSearchRequestUrl(query_text, 'link', subreddit, null, filter);
		const listing_response = await fetch(request_url);
		if (!listing_response.ok) return { status: 404 };
		const listing = await listing_response.json();
		return {
			body: {
				initial_listing: listing,
				filter,
				subreddit,
				query_text,
				query
			}
		};
	} catch {
		return { status: 500 };
	}
};
