import { useEffect } from "react";

const OFFSCREEN_POSITION = -9999;
const POINTER_EASING = 0.18;

export function GridPattern() {
	useEffect(() => {
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (reducedMotion.matches) return;

		let animationFrame = 0;
		let mouseX = window.innerWidth / 2;
		let mouseY = window.innerHeight / 2;
		let torchX = mouseX;
		let torchY = mouseY;

		const updateTorch = () => {
			torchX += (mouseX - torchX) * POINTER_EASING;
			torchY += (mouseY - torchY) * POINTER_EASING;
			document.documentElement.style.setProperty(
				"--grid-pointer-x",
				`${torchX}px`
			);
			document.documentElement.style.setProperty(
				"--grid-pointer-y",
				`${torchY}px`
			);
			animationFrame = window.requestAnimationFrame(updateTorch);
		};

		const handlePointerMove = (event: PointerEvent) => {
			mouseX = event.clientX;
			mouseY = event.clientY;
		};

		const handlePointerLeave = () => {
			mouseX = OFFSCREEN_POSITION;
			mouseY = OFFSCREEN_POSITION;
		};

		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerleave", handlePointerLeave);
		animationFrame = window.requestAnimationFrame(updateTorch);

		return () => {
			window.cancelAnimationFrame(animationFrame);
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerleave", handlePointerLeave);
		};
	}, []);

	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
			<div className="grid-pattern-layer grid-pattern-guides" />
			<div className="grid-pattern-layer grid-pattern-dots" />
			<div className="grid-pattern-layer grid-pattern-torch" />
			<div className="grid-pattern-layer grid-pattern-vignette" />
		</div>
	);
}
