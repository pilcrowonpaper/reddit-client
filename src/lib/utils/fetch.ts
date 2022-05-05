import { $fetch as ohmyfetch } from 'ohmyfetch';

export const retryFetch = async (url: string, fetch: Function, count: number = 1) => {
	let attempts = 0;
	while (attempts < count) {
		try {
			return await ohmyfetch(url);
		} catch (e) {
			console.log(e);
			await sleep((attempts + 1) * 100);
			attempts += 1;
		}
	}
    throw new Error()
};

const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
