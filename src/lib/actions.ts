export function reveal(node: HTMLElement) {
	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				node.classList.add('visible');
				observer.disconnect();
			}
		},
		{ threshold: 0.1 }
	);
	observer.observe(node);
	return {
		destroy() { observer.disconnect(); }
	};
}
