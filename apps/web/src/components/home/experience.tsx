import { Badge } from "@portfolio/ui/components/badge";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemTitle,
} from "@portfolio/ui/components/item";
import type { Experience as ExperienceEntry } from "@/content/homepage";

type ExperienceProps = {
	experiences: ExperienceEntry[];
};

const companyInitial = (company: string): string =>
	company[0]?.toUpperCase() ?? "?";

export function Experience({ experiences }: ExperienceProps) {
	return (
		<section
			aria-labelledby="experience-heading"
			className="px-4 py-16 lg:px-8"
			id="experience"
		>
			<div className="mx-auto max-w-6xl">
				<div className="flex items-start justify-between">
					<p className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
						<span className="text-primary">03</span> Experience
					</p>
					<div className="text-right font-mono text-muted-foreground text-xs">
						<p>~/experience</p>
						<p className="text-muted-foreground/70">
							{experiences.length} companies
						</p>
					</div>
				</div>

				<h2
					className="mt-2 font-mono font-semibold text-3xl tracking-tight sm:text-4xl"
					id="experience-heading"
				>
					Where I&apos;ve worked
				</h2>

				<div className="mt-6 border-border border-t" />

				<ItemGroup className="mt-8">
					{experiences.map((experience) => (
						<Item key={experience.index} render={<article />}>
							<ItemMedia className="size-11 overflow-hidden rounded-md border border-border bg-card/50 p-1.5">
								{experience.logo ? (
									<img
										alt=""
										className="size-full object-contain"
										height={44}
										loading="lazy"
										src={experience.logo}
										width={44}
									/>
								) : (
									<span
										aria-hidden="true"
										className="font-mono font-semibold text-primary"
									>
										{companyInitial(experience.company)}
									</span>
								)}
							</ItemMedia>

							<ItemContent className="gap-1.5">
								<ItemHeader>
									<ItemTitle className="line-clamp-none font-mono font-semibold text-base sm:text-lg">
										{experience.role}
									</ItemTitle>
									{experience.current ? (
										<Badge
											className="border-primary/40 bg-primary/10 font-mono text-primary uppercase tracking-widest"
											variant="outline"
										>
											<span
												aria-hidden="true"
												className="size-1.5 rounded-full bg-primary"
											/>
											current
										</Badge>
									) : null}
								</ItemHeader>

								<ItemDescription className="font-mono">
									<span className="text-foreground">{experience.company}</span>{" "}
									· Full-time
								</ItemDescription>

								<ItemDescription className="font-mono">
									{experience.period} · {experience.duration} ·{" "}
									{experience.location}
								</ItemDescription>
							</ItemContent>

							<ItemFooter className="flex-wrap gap-2">
								<ul className="flex flex-wrap gap-2">
									{experience.skills.map((skill) => (
										<li
											className="rounded-full border border-border bg-card/50 px-2.5 py-0.5 font-mono text-muted-foreground text-xs"
											key={skill}
										>
											{skill}
										</li>
									))}
								</ul>
							</ItemFooter>
						</Item>
					))}
				</ItemGroup>

				<div className="mt-6 flex items-center border-border border-t border-dashed pt-5">
					<p className="font-mono text-muted-foreground text-xs">
						<span className="text-foreground">$</span> cat /var/log/employment{" "}
						<span className="text-muted-foreground/60">
							{"// full work history"}
						</span>
					</p>
				</div>
			</div>
		</section>
	);
}
