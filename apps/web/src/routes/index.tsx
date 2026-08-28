import { createFileRoute } from "@tanstack/react-router";
import { GridPattern } from "../components/grid-pattern";
import { Contact } from "../components/home/contact";
import { Footer } from "../components/home/footer";
import { Hero } from "../components/home/hero";
import { Nav } from "../components/home/nav";
import { Projects } from "../components/home/projects";
import { TerminalWidget } from "../components/home/terminal-widget";
import { profile, projects } from "../content/homepage";

export const Route = createFileRoute("/")({
	component: HomeComponent,
	head: () => ({
		meta: [
			{
				content:
					"Personal portfolio of Yashraj Jaiswal — full-stack developer specializing in TypeScript, React, and Node.js.",
				name: "description",
			},
		],
		title: "Yashraj Jaiswal — Portfolio",
	}),
});

function HomeComponent() {
	return (
		<div className="relative isolate overflow-x-clip">
			<GridPattern />
			<div className="relative z-10">
				<Nav profile={profile} />
				<main id="main">
					<section
						aria-labelledby="home-heading"
						className="px-4 pt-16 lg:px-8"
						id="home"
					>
						<div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
							<div className="sr-only" id="home-heading">
								Hero
							</div>
							<Hero profile={profile} />
							<TerminalWidget />
						</div>
					</section>
					<Projects projects={projects} />
					<Contact profile={profile} />
				</main>
				<Footer profile={profile} />
			</div>
		</div>
	);
}
