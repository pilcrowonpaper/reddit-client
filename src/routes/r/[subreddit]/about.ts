import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const subreddit = params.subreddit;
	if (!subreddit) return { status: 404 };
	const rules_promise = fetch(`https://www.reddit.com/r/${subreddit}/about/rules.json?raw_json=1`);
	const about_promise = fetch(`https://www.reddit.com/r/${subreddit}/about.json?raw_json=1`);
	try {
		const response = (await Promise.allSettled([rules_promise, about_promise])) as {
			status: string;
			value?: Response;
		}[];
		if (response.filter((val) => val.status !== 'fulfilled').length > 0) {
			return { status: 404 };
		}
		const rules: any = await response[0].value.json();
		const about: any = await response[1].value.json();
		if (about.error) return { status: 500 };
		if (about.kind !== 't5') return { status: 404 };
		return {
			body: {
				rules,
				about
			}
		};
	} catch (e) {
		console.log(e);
		return { status: 500 };
	}
};
