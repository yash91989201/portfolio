import { Link } from "@tanstack/react-router";

import type { Profile } from "@/content/homepage";

type NavProps = {
	profile: Profile;
};

const anchors = [
	{ hash: "home", label: "~/home", to: "." },
	{ hash: "projects", label: "~/projects", to: "." },
	{ hash: "contact", label: "~/contact", to: "." },
] as const;

export function Nav({ profile }: NavProps) {
	const wordmark = profile.promptName ?? profile.name;

	return (
		<>
			<Link
				className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-1.5 focus:text-primary-foreground focus:text-sm focus:outline-none"
				hash="main"
				to="."
			>
				Skip to content
			</Link>
			<header className="fixed top-0 right-0 left-0 z-40 border-border border-b bg-background/80 backdrop-blur-sm">
				<nav
					aria-label="Main navigation"
					className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4"
				>
					<Link
						className="font-mono font-semibold text-foreground text-sm tracking-tight"
						hash="home"
						to="."
					>
						{wordmark}
					</Link>
					<ul className="flex gap-6">
						{anchors.map((a) => (
							<li key={a.hash}>
								<Link
									className="font-mono text-muted-foreground text-xs transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
									hash={a.hash}
									to={a.to}
								>
									{a.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
		</>
	);
}
