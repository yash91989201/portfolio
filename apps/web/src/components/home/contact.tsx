import {
	CalendarBlankIcon,
	EnvelopeSimpleIcon,
	GithubLogoIcon,
	LinkedinLogoIcon,
	MapPinIcon,
	StackIcon,
} from "@phosphor-icons/react";
import { Button } from "@portfolio/ui/components/button";
import { FieldGroup } from "@portfolio/ui/components/field";
import { useAppForm } from "@portfolio/ui/components/form/hooks";
import { Spinner } from "@portfolio/ui/components/spinner";
import { formOptions } from "@tanstack/react-form";
import { toast } from "sonner";
import type { Profile } from "@/content/homepage";
import { ContactFormSchema } from "@/lib/schemas/contact";
import type { ContactFormType } from "@/lib/types";

type ContactProps = {
	profile: Profile;
};
const contactFormOpts = formOptions({
	defaultValues: {
		email: "",
		message: "",
		name: "",
	} satisfies ContactFormType as ContactFormType,
});

export function Contact({ profile }: ContactProps) {
	const scheduleRow = profile.scheduleUrl ? (
		<a
			className="inline-flex items-center gap-2 font-mono text-primary text-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
			href={profile.scheduleUrl}
			rel="noopener noreferrer"
			target="_blank"
		>
			<CalendarBlankIcon className="size-4" weight="light" />
			Schedule a call
		</a>
	) : null;
	const form = useAppForm({
		...contactFormOpts,
		onSubmit: () => {
			toast.success("Thanks! Your message passed validation.");
			form.reset();
		},
		validators: {
			onSubmit: ContactFormSchema,
		},
	});

	return (
		<section
			aria-labelledby="contact-heading"
			className="px-4 py-16 lg:px-8"
			id="contact"
		>
			<div className="mx-auto max-w-6xl space-y-10">
				<div className="flex items-center justify-between border-border border-b pb-4">
					<div className="flex items-center gap-3">
						<span className="font-mono text-muted-foreground text-xs">
							[03]
						</span>
						<span className="font-mono text-muted-foreground text-xs">/</span>
						<h2
							className="font-mono font-semibold text-foreground text-lg tracking-tight"
							id="contact-heading"
						>
							Contact
						</h2>
					</div>
				</div>

				<div className="grid gap-8 lg:grid-cols-2">
					<div className="space-y-6">
						<a
							className="block font-mono font-semibold text-lg text-primary transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 sm:text-xl lg:text-2xl"
							href={`mailto:${profile.email}`}
						>
							{profile.email}
						</a>

						<div className="space-y-3">
							<div className="flex items-center gap-2 font-mono text-muted-foreground text-sm">
								<MapPinIcon className="size-4" weight="light" />
								<span>{profile.location}</span>
							</div>
							<div className="flex items-center gap-2 font-mono text-muted-foreground text-sm">
								<EnvelopeSimpleIcon className="size-4" weight="light" />
								<span>{profile.statusNote}</span>
							</div>
							<div className="flex items-center gap-2 font-mono text-muted-foreground text-sm">
								<StackIcon className="size-4" weight="light" />
								<span>{profile.stackLine}</span>
							</div>
						</div>

						<div className="flex items-center gap-4">
							{profile.links
								.filter((l) => l.kind !== "email")
								.map((link) => {
									const Icon =
										link.kind === "github" ? GithubLogoIcon : LinkedinLogoIcon;
									return (
										<a
											aria-label={link.label}
											className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
											href={link.href}
											key={link.kind}
											rel="noopener noreferrer"
											target="_blank"
										>
											<Icon className="size-5" weight="light" />
										</a>
									);
								})}
						</div>

						{scheduleRow}
					</div>

					<div className="space-y-4 rounded-lg border border-border bg-card p-4">
						<p className="font-mono text-muted-foreground text-xs">
							Direct message
						</p>
						<form.AppForm>
							<form
								className="space-y-3"
								onSubmit={(e) => {
									e.preventDefault();
									form.handleSubmit();
								}}
							>
								<FieldGroup>
									<form.AppField name="name">
										{(field) => (
											<field.Input
												className="font-mono"
												label="Name"
												placeholder="Your name"
											/>
										)}
									</form.AppField>

									<form.AppField name="email">
										{(field) => (
											<field.Input
												className="font-mono"
												label="Email"
												placeholder="you@example.com"
												type="email"
											/>
										)}
									</form.AppField>

									<form.AppField name="message">
										{(field) => (
											<field.Textarea
												className="font-mono"
												label="Message"
												placeholder="Your message"
												rows={4}
											/>
										)}
									</form.AppField>

									<form.Subscribe
										selector={(state) => [
											state.canSubmit,
											state.isValidating,
											state.isSubmitting,
										]}
									>
										{([canSubmit, isValidating, isSubmitting]) => (
											<Button
												className="w-full font-mono"
												disabled={!canSubmit || isValidating || isSubmitting}
												type="submit"
											>
												{isSubmitting ? (
													<>
														<Spinner />
														Sending...
													</>
												) : (
													"Send message"
												)}
											</Button>
										)}
									</form.Subscribe>
									<p className="font-mono text-muted-foreground text-xs">
										This form validates your input; backend submission isn't
										wired up yet.
									</p>
								</FieldGroup>
							</form>
						</form.AppForm>
					</div>
				</div>
			</div>
		</section>
	);
}
