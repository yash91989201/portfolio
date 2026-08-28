import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import type { Project } from "@/content/homepage";

type ProjectsProps = {
	projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
	const featured = projects.filter((p) => p.featured);

	return (
		<section
			aria-labelledby="projects-heading"
			className="px-4 py-16 lg:px-8"
			id="projects"
		>
			<div className="mx-auto max-w-6xl">
				<div className="flex items-start justify-between">
					<p className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
						<span className="text-primary">[02]</span> Featured work
					</p>
					<div className="text-right font-mono text-muted-foreground text-xs">
						<p>~/projects/featured</p>
						<p className="text-muted-foreground/70">
							{featured.length} of {projects.length} visible
						</p>
					</div>
				</div>

				<h2
					className="mt-2 font-mono font-semibold text-3xl tracking-tight sm:text-4xl"
					id="projects-heading"
				>
					Selected projects
				</h2>

				<div className="mt-6 border-border border-t" />

				<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{featured.map((project) => (
						<article
							className="group flex flex-col rounded-lg border border-border bg-card/50 p-5 transition-colors hover:border-primary/30"
							key={project.index}
						>
							<span className="font-mono text-primary text-xs">
								[{String(project.index).padStart(2, "0")}]
							</span>
							<h3 className="mt-3 font-mono font-semibold text-foreground text-xl leading-snug">
								{project.title}
							</h3>
							<p className="mt-2 font-mono text-muted-foreground text-xs">
								{project.year} · {project.role}
							</p>
							<p className="mt-3 flex-1 font-sans text-muted-foreground text-sm leading-relaxed">
								{project.description}
							</p>
							{project.liveUrl ? (
								<>
									<div className="mt-5 border-border border-t border-dashed" />
									<a
										aria-label={`${project.title} — opens in new tab`}
										className="mt-3 inline-flex items-center gap-1 font-mono text-muted-foreground text-xs transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 group-hover:text-foreground"
										href={project.liveUrl}
										rel="noopener noreferrer"
										target="_blank"
									>
										<ArrowUpRightIcon className="size-3.5" weight="light" />
										live
										<span className="sr-only">(external)</span>
									</a>
								</>
							) : null}
						</article>
					))}
				</div>

				<div className="mt-10 flex items-center justify-between border-border border-t border-dashed pt-5">
					<p className="font-mono text-muted-foreground text-xs">
						<span className="text-foreground">$</span> ls -al /projects{" "}
						<span className="text-muted-foreground/60">
							{"// list all projects"}
						</span>
					</p>
					<Link
						className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-input/30 px-3 font-mono text-foreground text-xs transition-colors hover:bg-input/50 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
						hash="projects"
						to="."
					>
						<span className="text-muted-foreground">$</span> view all
					</Link>
				</div>
			</div>
		</section>
	);
}
