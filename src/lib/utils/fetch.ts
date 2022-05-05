export const retryFetch = async (url: string, fetch: Function, count: number) => {
	let attempts = 0;
	while (attempts < count) {
		try {
			const response = await fetch(url);
			return await response.json();
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
