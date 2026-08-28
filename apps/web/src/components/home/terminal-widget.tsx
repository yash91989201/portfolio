import { Link } from "@tanstack/react-router";

type Chip = {
	label: string;
	hash: string;
};

const defaultChips: Chip[] = [
	{ hash: "projects", label: "view projects" },
	{ hash: "contact", label: "get in touch" },
	{ hash: "home", label: "back to top" },
];

export function TerminalWidget() {
	return (
		<div className="flex-1">
			<div className="overflow-hidden rounded-lg border border-border bg-card">
				<div className="flex items-center gap-2 border-border border-b px-4 py-2.5">
					<span className="size-2.5 rounded-full bg-[#ff5f57]" />
					<span className="size-2.5 rounded-full bg-[#febc2e]" />
					<span className="size-2.5 rounded-full bg-[#28c840]" />
					<span className="ml-2 font-mono text-muted-foreground text-xs">
						~/ask-me.sh
					</span>
					<span className="ml-auto flex items-center gap-1.5 font-mono text-primary text-xs">
						<span className="inline-block size-1.5 rounded-full bg-primary" />
						ready
					</span>
				</div>
				<div className="p-4">
					<p className="mb-3 font-mono text-muted-foreground text-xs">
						Ask me anything:
					</p>
					<div className="flex flex-wrap gap-2">
						{defaultChips.map((chip) => (
							<Link
								className="rounded-md border border-border bg-muted/50 px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
								hash={chip.hash}
								key={chip.hash}
								to="."
							>
								{chip.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
