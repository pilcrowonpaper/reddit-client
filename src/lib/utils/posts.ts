import type { Promise_Status } from '$lib/types';
import type { Post_Filter } from '$lib/types/filter';
import type { Batch } from '$lib/types/posts';
import type { Listing, Post } from '$lib/types/reddit';

export const getPostListing = async (
	subreddit: string,
	after?: string,
	filter?: Post_Filter
): Promise<Promise_Status<Listing<Post>>> => {
	const url = getPostRequestUrl(subreddit, after, filter);
	const response = await fetch(url);
	if (!response.ok) {
		return {
			success: false
		};
	}
	const result = (await response.json()) as Listing<Post>;
	return {
		success: true,
		data: result
	};
};

export const getPostRequestUrl = (subreddit: string, after?: string, filter?: Post_Filter): string => {
	let base_url = `https://www.reddit.com/r/${subreddit}`;
	if (filter.sort) {
		base_url = base_url + `/${filter.sort}`;
	}
	let url = base_url + '.json?raw_json=1';
	if (filter.time) {
		url = url + `&t=${filter.time}`;
	}
	if (after) {
		url = url + `&after=${after}`;
	}
	return url;
};

export const getPostPathname = (subreddit: string, after?: string, filter?: Post_Filter): string => {
	let base = `/r/${subreddit}`;
	if (filter.sort) {
		base = base + `/${filter.sort}?`;
	}
	let pathname = base;
	if (filter.time) {
		pathname = pathname + `&t=${filter.time}`;
	}
	if (after) {
		pathname = pathname + `&after=${after}`;
	}
	return pathname;
};

export const fetchNextPostBatch = async (
	subreddit: string,
	after?: string,
	filter?: Post_Filter
): Promise<Promise_Status<Batch>> => {
	const result = await getPostListing(subreddit, after, filter);
	if (!result.success) {
		return {
			success: false
		};
	}
	const listing = result.data;
	return {
		success: true,
		data: {
			posts: listing.data.children,
			batch_count: listing.data.dist,
			after_id: listing.data.after
		}
	};
};
