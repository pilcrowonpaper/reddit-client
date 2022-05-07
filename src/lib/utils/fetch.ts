import { $fetch as ohmyfetch } from 'ohmyfetch';

export const retryFetch = async (url: string, count: number = 1) => {
	let attempts = 0;
	while (attempts < count) {
		try {
			const response = await fetch(url);
            if (!response.ok) throw Error()
            return await response.json()
		} catch (e) {
			await sleep((attempts + 1) * 100);
			attempts += 1;
		}
	}
    throw Error()
};

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
