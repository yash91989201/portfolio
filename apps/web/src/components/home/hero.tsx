import {
	ArrowRightIcon,
	EnvelopeSimpleIcon,
	GithubLogoIcon,
	LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { Badge } from "@portfolio/ui/components/badge";
import type { Profile } from "@/content/homepage";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type HeroProps = {
	profile: Profile;
};

const iconMap = {
	email: EnvelopeSimpleIcon,
	github: GithubLogoIcon,
	linkedin: LinkedinLogoIcon,
} as const;

export function Hero({ profile }: HeroProps) {
	const bio = profile.bioSegments?.map((seg, i) => {
		const key = `bio-${i}-${typeof seg === "string" ? seg.slice(0, 8) : seg.accent.slice(0, 8)}`;
		if (typeof seg === "string") return <span key={key}>{seg}</span>;
		return (
			<span className="text-primary" key={key}>
				{seg.accent}
			</span>
		);
	});

	return (
		<div className="flex-1 space-y-6 pt-8 lg:pt-0">
			<Badge variant="outline">
				<span
					className={cn(
						"inline-block size-1.5 rounded-full",
						profile.availability.open ? "bg-primary" : "bg-muted-foreground"
					)}
				/>
				{profile.availability.label}
			</Badge>
			<h1 className="font-bold font-mono text-2xl tracking-tight sm:text-3xl lg:text-5xl">
				<span className="text-muted-foreground">$</span> hi, I'm
				<br />
				<span className="text-primary">{profile.name}</span>
				<span
					aria-hidden="true"
					className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.05em] animate-blink bg-primary"
				/>
			</h1>

			<p className="font-mono text-muted-foreground text-sm">
				{profile.rolesLine}
			</p>

			<p className="max-w-lg font-sans text-muted-foreground text-sm leading-relaxed">
				{bio}
			</p>

			<div className="flex flex-wrap items-center gap-3">
				<Link
					className="inline-flex h-7 items-center justify-center gap-1 rounded-md border border-transparent bg-primary px-2 font-medium font-mono text-primary-foreground text-xs transition-colors hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
					hash="contact"
					to="."
				>
					Get in touch
					<ArrowRightIcon className="ml-1 size-3.5" />
				</Link>
				<Link
					className="inline-flex h-7 items-center justify-center gap-1 rounded-md border border-border bg-input/30 px-2 font-medium font-mono text-foreground text-xs transition-colors hover:bg-input/50 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
					hash="projects"
					to="."
				>
					View work
				</Link>
			</div>

			<div className="flex items-center gap-3 pt-2">
				{profile.links.map((link) => {
					const Icon = iconMap[link.kind];
					if (!Icon) return null;
					const isExternal =
						link.kind !== "email" && link.href.startsWith("http");
					return (
						<a
							aria-label={link.label}
							href={link.href}
							key={link.kind}
							{...(isExternal ? { rel: "noopener noreferrer", target: "_blank" } : {})}
							className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
						>
							<Icon className="size-5" weight="light" />
						</a>
					);
				})}
			</div>
		</div>
	);
}
