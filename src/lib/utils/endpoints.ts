export const returnError = (code: number, message: string) : Record<string, any> => {
	return {
		status: code,
		body: JSON.stringify({ message })
	};
};
