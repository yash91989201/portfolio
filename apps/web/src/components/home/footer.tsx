import type { Profile } from "@/content/homepage";

type FooterProps = {
	profile: Profile;
};

export function Footer({ profile }: FooterProps) {
	const year = new Date().getFullYear();

	return (
		<footer className="border-border border-t px-4 py-6 lg:px-8">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
				<p className="font-mono text-muted-foreground text-xs">
					© {year} {profile.name}
				</p>
				<div className="flex items-center gap-4">
					<a
						className="font-mono text-muted-foreground text-xs transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
						href={`mailto:${profile.email}`}
					>
						Email
					</a>
					{profile.links
						.filter((l) => l.kind === "github")
						.map((link) => (
							<a
								aria-label={link.label}
								className="font-mono text-muted-foreground text-xs transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
								href={link.href}
								key={link.kind}
								rel="noopener noreferrer"
								target="_blank"
							>
								GitHub
							</a>
						))}
				</div>
			</div>
		</footer>
	);
}
