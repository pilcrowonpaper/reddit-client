import { $fetch as ohmyfetch } from 'ohmyfetch';

export const retryFetch = async (url: string, count: number = 1) => {
	let attempts = 0;
	while (attempts < count) {
		try {
			const response = await fetch(url);
            if (!response.ok) throw Error()
            console.log("success")
            return await response.json()
		} catch (e) {
			console.log("error");
			await sleep((attempts + 1) * 100);
			attempts += 1;
		}
	}
    throw Error()
};

const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
