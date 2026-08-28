"use client";

import { cn } from "@portfolio/ui/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
	className?: string;
	cursorBlinkDuration?: number;
	cursorBlinkEasing?:
		| "easeInOut"
		| "easeIn"
		| "easeOut"
		| "linear"
		| [number, number, number, number];
	deleteSpeed?: number;
	inViewThreshold?: number;
	loop?: boolean;
	pauseDuration?: number;
	phrases: readonly string[];
	startDelay?: number;
	trigger?: "mount" | "inView";
	typeSpeed?: number;
}

export function Typewriter({
	phrases,
	className,
	cursorClassName,
	trigger = "inView",
	startDelay = 0,
	typeSpeed = 100,
	deleteSpeed = 50,
	loop = true,
	pauseDuration = 2000,
	cursorBlinkDuration = 0.5,
	cursorBlinkEasing = "easeInOut",
	inViewThreshold = 0.3,
}: TypewriterProps) {
	const [phraseIndex, setPhraseIndex] = useState(0);
	const [display, setDisplay] = useState("");
	const [deleting, setDeleting] = useState(false);
	const [inView, setInView] = useState(trigger === "mount");
	const ref = useRef<HTMLSpanElement | null>(null);
	const [started, setStarted] = useState(startDelay <= 0);

	useEffect(() => {
		if (trigger !== "inView") {
			return;
		}
		const el = ref.current;
		if (!el) {
			return;
		}
		const obs = new IntersectionObserver(
			([e]) => setInView(e?.isIntersecting ?? false),
			{
				threshold: inViewThreshold,
			}
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, [trigger, inViewThreshold]);

	const shouldRun = trigger === "mount" ? true : inView;
	useEffect(() => {
		if (started || !shouldRun) {
			return;
		}
		const t = setTimeout(() => setStarted(true), startDelay);
		return () => clearTimeout(t);
	}, [started, shouldRun, startDelay]);

	useEffect(() => {
		if (!(started && shouldRun)) {
			return;
		}
		const phrase = phrases[phraseIndex] ?? "";
		if (deleting) {
			if (display.length > 0) {
				const t = setTimeout(
					() => setDisplay(display.slice(0, -1)),
					deleteSpeed
				);
				return () => clearTimeout(t);
			}
			setDeleting(false);
			setPhraseIndex((phraseIndex + 1) % phrases.length);
			return;
		}
		if (display.length < phrase.length) {
			const t = setTimeout(
				() => setDisplay(phrase.slice(0, display.length + 1)),
				typeSpeed *
					(Math.random() < 0.15 ? 2 + Math.random() : 0.8 + Math.random() * 0.7)
			);
			return () => clearTimeout(t);
		}
		if (!loop && phraseIndex === phrases.length - 1) {
			return;
		}
		const t = setTimeout(() => setDeleting(true), pauseDuration);
		return () => clearTimeout(t);
	}, [
		shouldRun,
		display,
		deleting,
		phraseIndex,
		phrases,
		typeSpeed,
		loop,
		deleteSpeed,
		started,
		startDelay,
		pauseDuration,
	]);

	const isTyping =
		shouldRun &&
		started &&
		!deleting &&
		display.length < (phrases[phraseIndex] ?? "").length;

	const cursorTransition = isTyping
		? { duration: 0.1 }
		: {
				duration: cursorBlinkDuration,
				ease: cursorBlinkEasing,
				repeat: Number.POSITIVE_INFINITY,
			};

	return (
		<span className={cn(className)} ref={ref}>
			{display}
			<motion.span
				animate={
					isTyping
						? { opacity: 1 }
						: { opacity: [1, 1, 0, 0], times: [0, 0.49, 0.5, 1] }
				}
				aria-hidden={true}
				className={cn(
					"inline-block min-h-[1em] w-0.5 shrink-0 bg-current align-middle",
					cursorClassName
				)}
				transition={cursorTransition}
			/>
		</span>
	);
}
