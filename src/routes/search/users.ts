import { getSearchRequestUrl } from '$lib/utils/reddit/search';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');
	let query_text: string;
	if (query.includes(':')) {
		query_text = query.split(':')[1];
	} else {
		query_text = query;
	}
    if (!query_text) return { status: 400 };
	try {
		const request_url = getSearchRequestUrl(query_text, 'user');
		const listing_response = await fetch(request_url);
		if (!listing_response.ok) return { status: 404 };
		const listing = await listing_response.json();
		return {
			body: {
				initial_listing: listing,
				query_text
			}
		};
	} catch {
		return { status: 500 };
	}
};
