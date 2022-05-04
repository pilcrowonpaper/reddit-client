import type { Image_Size } from '$lib/types/format';

export const calculateImageSize = (
	width: number,
	height: number,
	max_width: number,
	max_height: number
): Image_Size => {
	let result = {
		width: null,
		height: null
	};
	if (width > height) {
		result.width = max_width;
		result.height = (height * max_width) / width;
	} else {
		result.height = max_height;
		result.width = (width * max_height) / height;
	}
	if (result.width > max_width) {
		result.height = (result.height / result.width) * max_width;
		result.width = max_width;
	}
	if (result.height > max_height) {
		result.width = (result.width / result.height) * max_height;
		result.height = max_height;
	}
	return result;
};

export const validateGif = (url: string): boolean => {
	return (
		url.includes('.gifv') ||
		url.includes('.gif') ||
		url.includes('.ogg') ||
		url.includes('.mp4') ||
		url.includes('.webm')
	);
};

export const convertGif = (url: string): string => {
	return url
		.replace('.gifv', '.mp4')
		.replace('.gif', '.mp4')
		.replace('.ogg', '.mp4')
		.replace('.webm', '.mp4');
};
