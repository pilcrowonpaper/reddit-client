export const inViewport = (node) => {
	const observer: IntersectionObserver = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			node.dispatchEvent(new CustomEvent('display'));
		} else {
			node.dispatchEvent(new CustomEvent('hidden'));
		}
	});
	observer.observe(node);
	return {
		destroy() {
			observer.disconnect();
		}
	};
};

export const clickOutside = (node) => {
	const handleClick = (event) => {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};
	document.addEventListener('click', handleClick, true);
	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
