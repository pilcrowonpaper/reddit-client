import { $fetch as ohmyfetch } from 'ohmyfetch';

export const retryFetch = async (url: string, fetch: Function, count: number = 1) => {
	let attempts = 0;
	while (attempts < count) {
		try {
			const result = await ohmyfetch(url);
            console.log("success")
            return result
		} catch (e) {
			console.log("error", e);
			await sleep((attempts + 1) * 100);
			attempts += 1;
		}
	}
    throw new Error()
};

const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
