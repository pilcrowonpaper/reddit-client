export const formatNumber = (num: number): string => {
	if (num < 10000) {
		return num.toString();
	}
	if (num < 100000) {
		return `${Math.round(num / 100) / 10}k`;
	}
	return `${Math.round(num / 1000)}k`;
};

export const formatTime = (millis: number): string => {
	const sec = Math.floor(millis / 1000);
	const min = Math.floor(sec / 60);
	const hrs = Math.floor(min / 60);
	const days = Math.floor(hrs / 24);
	const yrs = Math.floor(days / 365);
	const time_in_units_arr: [string, number][] = [
		['minute', min],
		['hour', hrs],
		['day', days],
		['year', yrs]
	];
	const time_in_units = new Map(time_in_units_arr);
	let result = {
		unit: 'minute',
		value: 1
	};
	time_in_units.forEach((val, key) => {
		if (val > 0) {
			result.unit = key;
			result.value = val;
		}
	});
	if (result.value === 1) return `${result.value} ${result.unit}`;
	return `${result.value} ${result.unit}s`;
};

export const removeEmoji = (text: string): string => {
	return text
		.replace(
			/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
			''
		)
		.replace(/:.*?:/g, '');
};
