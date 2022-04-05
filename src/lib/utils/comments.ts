import type { Promise_Status } from '$lib/types';
import type { Listing, Post, Comment, Listing_List } from '$lib/types/reddit';
import type { Comment_Filter } from '$lib/types/filter';

export const getCommentsListing = async (
	subreddit: string,
	post_id: string,
	filter?: Comment_Filter,
	comment_id?: string
): Promise<Promise_Status<Listing_List>> => {
	const url = getCommentsRequestUrl(subreddit, post_id, filter, comment_id);
	const response = await fetch(url);
	if (!response.ok) {
		return {
			success: false
		};
	}
	const result = await response.json();
	const post_listing = result[0] as Listing<Post>;
	const comment_listing = result[1] as Listing<Comment>;
	return {
		success: true,
		data: {
			post: post_listing,
			comment: comment_listing
		}
	};
};

export const getCommentsRequestUrl = (
	subreddit: string,
	post_id: string,
	filter?: Comment_Filter,
	comment_id?: string
): string => {
	if (!subreddit || !post_id) return;
	let base: string = `https://www.reddit.com/r/${subreddit}/comments/${post_id}`;
	if (comment_id) {
		base = base + `/_/${comment_id}`;
	}
	let url = base + '.json?raw_json=1';
	if (filter.sort) {
		url = url + `&sort=${filter.sort}`;
	}
	return url;
};

export const getCommentsPathname = (
	subreddit: string,
	post_id: string,
	sort_options?: Comment_Filter,
	comment_id?: string
): string => {
	let base = `/r/${subreddit}/comments/${post_id}`;
	if (!base) return;
	if (comment_id) {
		base = base + `/${comment_id}`;
	}
	let pathname = base;
	if (sort_options.sort) {
		pathname = pathname + `?sort=${sort_options.sort}`;
	}
	return pathname;
};

export const getMoreCommentsRequestUrl = (link_id: string, children : string[]) : string => {
	console.log(children)
	return `https://api.reddit.com/comments/${link_id.replace("t3_", "")}/morechildren?link=${link_id}&children=${children}&api_type=json`
}

export const getMoreCommentsListing = async (
	link_id: string, children : string[]
): Promise<Promise_Status<Listing_List>> => {
	const url = getMoreCommentsRequestUrl(link_id, children);
	console.log(url)
	const response = await fetch(url);
	if (!response.ok) {
		return {
			success: false
		};
	}
	const result = await response.json();
	const post_listing = result[0] as Listing<Post>;
	const comment_listing = result[1] as Listing<Comment>;
	return {
		success: true,
		data: {
			post: post_listing,
			comment: comment_listing
		}
	};
};
