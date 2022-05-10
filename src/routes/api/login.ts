import { dev } from '$app/env';
import type { TokenRetrievalResponse } from '$lib/types/reddit/auth';
import { returnError } from '$lib/utils/endpoints';
import { client_id, reddit_secret, redirect_uri } from '$lib/utils/reddit/auth';
import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { Buffer } from 'buffer/';

export const get: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');
	if (!code) return returnError(400, 'Missing data');
	const response = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri
		}),
		headers: {
			Authorization: `Basic ${Buffer.from(`${client_id}:${reddit_secret}`).toString('base64')}`
		}
	});
	console.log(response)
	if (!response.ok || response.status !== 200) returnError(500, 'An unkown error occured');
	const result = (await response.json()) as TokenRetrievalResponse;
	const access_token_cookie = cookie.serialize('access_token', result.access_token, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 55
	});
	const refresh_token_cookie = cookie.serialize('refresh_token', result.refresh_token, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60 * 24 * 365 * 2
	});
	return {
		status: 302,
		headers: {
			location: '/',
			'set-cookie': [access_token_cookie, refresh_token_cookie]
		}
	};
};
