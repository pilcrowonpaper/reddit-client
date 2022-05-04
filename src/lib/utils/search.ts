import type { Promise_Status } from '$lib/types';
import type { Filter } from '$lib/types/filter';
import type { Batch } from '$lib/types/posts';
import type { Listing, Post } from '$lib/types/reddit';

export const getSearchListing = async (
	query: string,
	type: string,
	subreddit?: string,
	after?: string,
	filter?: Filter
): Promise<Promise_Status<Listing<any>>> => {
	const url = getSearchRequestUrl(query, type, subreddit, after, filter);
	const response = await fetch(url);
	if (!response.ok) {
		return {
			success: false
		};
	}
	const result = (await response.json()) as Listing<Post | Comment>;
	return {
		success: true,
		data: result
	};
};

export const getSearchRequestUrl = (
	query: string,
	type: string,
	subreddit?: string,
	after?: string,
	filter?: Filter
): string => {
	let url = 'https://api.reddit.com';
	if (subreddit) {
		url = url + `/r/${subreddit}/search?q=${query}&type=${type}`;
	} else {
		url = url + `/search?q=${query}&type=${type}`;
	}
	if (filter && filter.sort) {
		url = url + `&sort=${filter.sort}`;
	}
	if (filter && filter.time) {
		url = url + `&t=${filter.time}`;
	}
	if (after) {
		url = url + `&after=${after}`;
	}
	url = url + '&raw_json=1&restrict_sr=1'
	return url;
};

export const getSearchPathname = (
	query: string,
	type: string,
	filter?: Filter
): string => {
	let pathname = `/search/${type}?q=${query}`;
	if (filter.sort) {
		pathname = pathname + `&sort=${filter.sort}`;
	}
	if (filter.time) {
		pathname = pathname + `&t=${filter.time}`;
	}
	return pathname;
};
