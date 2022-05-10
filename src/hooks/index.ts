import { dev } from '$app/env';
import type { RefreshTokenResponse } from '$lib/types/reddit/auth';
import { client_id, reddit_secret } from '$lib/utils/reddit/auth';
import { getUser, getUserPrefs } from '$lib/utils/reddit/identity';
import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { Buffer } from 'buffer/index';

export const handle: Handle = async ({ event, resolve }) => {
	let { access_token, refresh_token } = cookie.parse(event.request.headers.get('cookie') || '');
	let access_token_cookie: string;
	if (!refresh_token) return await resolve(event);
	if (access_token) {
		event.locals['access_token'] = access_token;
	} else {
		// fetch response
		const response = await fetch('https://www.reddit.com/api/v1/access_token', {
			method: 'POST',
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${Buffer.from(`${client_id}:${reddit_secret}`).toString('base64')}`
			}
		});
		if (!response.ok || response.status !== 200) return await resolve(event);
		const result = (await response.json()) as RefreshTokenResponse;
		access_token_cookie = cookie.serialize('access_token', result.access_token, {
			httpOnly: true,
			secure: !dev,
			path: '/',
			maxAge: 60 * 55
		});
		access_token = result.access_token;
	}
	const getUser_promise = getUser(access_token);
	const getUserPrefs_promise = getUserPrefs(access_token);
	try {
		const response_arr = (await Promise.allSettled([getUser_promise, getUserPrefs_promise])) as {
			status: string;
			value?: Response;
		}[];
		if (response_arr.filter((val) => val.status !== 'fulfilled').length > 0)
			return await resolve(event);
		const getUser_result: any = response_arr[0].value;
		const getUserPrefs_result: any = response_arr[1].value;
		if (!getUser_result.success || !getUserPrefs_result.success) throw Error();
		const user = getUser_result.data;
		const user_prefs = getUserPrefs_result.data;
		event.locals['user'] = user;
		event.locals['prefs'] = user_prefs;
		const response = await resolve(event);
		if (access_token_cookie) {
			response.headers.set('set-cookie', access_token_cookie);
		}
		return response;
	} catch (e) {
		console.log(e);
		return await resolve(event);
	}
};

export const getSession: GetSession = ({ locals }) => {
	if (!locals['user'] || !locals['prefs']) return { exists: false };
	const icon_img_url = locals['user'].icon_img ? new URL(locals['user'].icon_img) : null
	return {
		exists: true,
		user: locals['user'],
		prefs: locals['prefs'],
		arctic: {
			icon_img: icon_img_url ? icon_img_url.origin + icon_img_url.pathname : null
		}
	};
};
