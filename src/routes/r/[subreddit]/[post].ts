import type { Filter } from '$lib/types/filter';
import { getCommentsRequestUrl } from '$lib/utils/reddit/comments';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params, url }) => {
	const subreddit = params.subreddit;
	const post_id = params.post;
	const id = url.searchParams.get('comment') || null;
	if (!subreddit) return { status: 404 };
	const sort = params.sort || url.searchParams.get('sort') || 'best';
	const filter: Filter = { sort };
	const request_url = getCommentsRequestUrl(subreddit, post_id, filter, id);
	const data_promise = fetch(request_url);
	const about_promise = fetch(`https://www.reddit.com/r/${subreddit}/about.json?raw_json=1`);
	try {
		const response = (await Promise.allSettled([data_promise, about_promise])) as {
			status: string;
			value?: Response;
		}[];
		if (response.filter((val) => val.status !== 'fulfilled').length > 0) {
			return { status: 404 };
		}
		const post_data: any = await response[0].value.json();
		const about: any = await response[1].value.json();
		if (about.error || post_data.error) {
			return {
				status: about.error || post_data.error
			};
		}
		if (about.kind !== 't5') return { status: 404 };
		const post_listing = post_data[0];
		const comment_listing = post_data[1];
		return {
			body: {
				post_listing,
				comment_listing,
				about,
				filter,
				id
			}
		};
	} catch (e) {
		console.log(e);
		return { status: 500 };
	}
};
