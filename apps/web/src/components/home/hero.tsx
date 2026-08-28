import {
	ArrowRightIcon,
	EnvelopeSimpleIcon,
	GithubLogoIcon,
	LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { Badge } from "@portfolio/ui/components/badge";
import { buttonVariants } from "@portfolio/ui/components/button";
import { Typewriter } from "@portfolio/ui/components/typewriter";
import { Link } from "@tanstack/react-router";
import type { Profile } from "@/content/homepage";
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
				<Typewriter
					className="text-primary"
					cursorBlinkDuration={1}
					loop={false}
					phrases={[profile.name]}
					startDelay={300}
					trigger="mount"
					typeSpeed={80}
				/>
			</h1>

			<p className="font-mono text-muted-foreground text-sm">
				{profile.rolesLine}
			</p>

			<p className="max-w-lg font-sans leading-relaxed">{bio}</p>

			<div className="flex flex-wrap items-center gap-3">
				<Link className={buttonVariants({ size: "lg" })} hash="contact" to=".">
					Get in touch
					<ArrowRightIcon className="ml-1 size-3.5" />
				</Link>
				<Link
					className={buttonVariants({ size: "lg", variant: "outline" })}
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
							{...(isExternal
								? { rel: "noopener noreferrer", target: "_blank" }
								: {})}
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
