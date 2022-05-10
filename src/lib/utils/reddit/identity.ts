export const getUser = async (access_token: string) => {
	const response = await fetch('https://oauth.reddit.com/api/v1/me', {
		headers: {
			Authorization: `bearer ${access_token}`
		}
	});
	if (!response.ok || response.status !== 200) return { success: false };
	return {
		success: true,
		data: await response.json()
	};
};

export const getUserPrefs = async (access_token: string) => {
    const response = await fetch('https://oauth.reddit.com/api/v1/me/prefs', {
		headers: {
			Authorization: `bearer ${access_token}`
		}
	});
	if (!response.ok || response.status !== 200) return { success: false };
	return {
		success: true,
		data: await response.json()
	};
}