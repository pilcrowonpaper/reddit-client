import type { Promise_Status } from '$lib/types';
import type { Filter } from '$lib/types/filter';
import type { Listing, Post } from '$lib/types/reddit/index';

export const getPostListing = async (
	after?: string,
	filter?: Filter
): Promise<Promise_Status<Listing<Post>>> => {
	try {
		const url = getPostRequestUrl(after, filter);
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
	} catch {
		return {
			success: false
		};
	}
};

export const getPostRequestUrl = (after?: string, filter?: Filter): string => {
	let base_url = `https://www.reddit.com`;
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

export const getPostPathname = (filter?: Filter): string => {
	let base = '';
	let pathname = base + '?';
	if (filter.sort) {
		pathname = pathname + `&sort=${filter.sort}`;
	}
	if (filter.time) {
		pathname = pathname + `&time=${filter.time}`;
	}
	return pathname;
};
