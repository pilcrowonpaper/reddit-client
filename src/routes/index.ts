import { getPostRequestUrl } from '$lib/utils/reddit/home';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url, params }) => {
	const sort = url.searchParams.get('sort') || 'hot';
	const time = url.searchParams.get('time') || null;
	const filter = { sort, time };
	const request_url = getPostRequestUrl(null, filter);
	try {
		const response = await fetch(request_url);
		const listing: any = await response.json();
		if (listing.error) throw Error();
		return {
			body: {
				initial_listing: listing,
				filter
			}
		};
	} catch (e) {
		console.log(e);
		return { status: 500 };
	}
};
