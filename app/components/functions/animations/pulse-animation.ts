export function pulseAnimation(
	element: HTMLElement,
	duration: number,
	scale: number
): void {
	let currentScale = 1;
	const startTime = performance.now();

	function animate(currentTime: number) {
		const elapsed = currentTime - startTime;
		const progress = elapsed / duration;

		if (progress >= 1) {
			element.style.transform = `scale(1)`;
			return;
		}

		currentScale = 1 + (scale - 1) * Math.sin(progress * Math.PI);
		element.style.transform = `scale(${currentScale})`;

		requestAnimationFrame(animate);
	}

	requestAnimationFrame(animate);
}
