import type { Promise_Status } from '$lib/types';
import type { Filter } from '$lib/types/filter';
import type { Listing, Post } from '$lib/types/reddit/index';

export const getUserListing = async (
	user: string,
	type?: string,
	after?: string,
	filter?: Filter
): Promise<Promise_Status<Listing<any>>> => {
	try {
		const url = getUserRequestUrl(user, type, after, filter);
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
	} catch {
		return {
			success: false
		};
	}
};

export const getUserRequestUrl = (
	user: string,
	type?: string,
	after?: string,
	filter?: Filter
): string => {
	let base_url = `https://www.reddit.com/user/${user}`;
	if (type) {
		base_url = base_url + `/${type}`;
	}
	let url = base_url + '.json?raw_json=1';
	if (filter.sort) {
		url = url + `&sort=${filter.sort}`;
	}
	if (filter.time) {
		url = url + `&t=${filter.time}`;
	}
	if (after) {
		url = url + `&after=${after}`;
	}
	return url;
};

export const getUserPathname = (user: string, path?: string, filter?: Filter): string => {
	let base = `/u/${user}`;
	if (path) {
		base = base + `/${path}`;
	}
	base = base + '?';
	if (filter.sort) {
		base = base + `&sort=${filter.sort}`;
	}
	let pathname = base;
	if (filter.time) {
		pathname = pathname + `&time=${filter.time}`;
	}
	return pathname;
};
