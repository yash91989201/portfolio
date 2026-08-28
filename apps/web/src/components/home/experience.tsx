import type { Experience as ExperienceEntry } from "@/content/homepage";

import { cn } from "@/lib/utils";

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

				<div className="mt-8">
					{experiences.map((experience, i) => (
						<article
							className={cn(
								"flex gap-4 py-6 sm:gap-6",
								i > 0 && "border-border border-t border-dashed"
							)}
							key={experience.index}
						>
							<div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-card/50 p-1.5">
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
							</div>

							<div className="min-w-0 flex-1">
								<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
									<h3 className="font-mono font-semibold text-foreground text-lg leading-snug">
										{experience.role}
									</h3>
									{experience.current ? (
										<span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary uppercase tracking-widest">
											<span className="size-1.5 rounded-full bg-primary" />
											current
										</span>
									) : null}
								</div>

								<p className="mt-1 font-mono text-muted-foreground text-sm">
									<span className="text-foreground">{experience.company}</span>{" "}
									· Full-time
								</p>

								<p className="mt-1 font-mono text-muted-foreground text-xs">
									{experience.period} · {experience.duration} ·{" "}
									{experience.location}
								</p>

								<ul className="mt-3 flex flex-wrap gap-2">
									{experience.skills.map((skill) => (
										<li
											className="rounded-full border border-border bg-card/50 px-2.5 py-0.5 font-mono text-muted-foreground text-xs"
											key={skill}
										>
											{skill}
										</li>
									))}
								</ul>
							</div>
						</article>
					))}
				</div>

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
