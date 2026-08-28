import { ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "@portfolio/ui/components/button";
import { FieldGroup } from "@portfolio/ui/components/field";
import { useAppForm } from "@portfolio/ui/components/form/hooks";
import { Spinner } from "@portfolio/ui/components/spinner";
import { formOptions } from "@tanstack/react-form";
import { toast } from "sonner";
import type { Profile, SocialLink } from "@/content/homepage";
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

const handleFromHref = (link: SocialLink): string => {
	try {
		const slug = new URL(link.href).pathname
			.split("/")
			.filter(Boolean)
			.join("/");
		return link.kind === "github" ? `@${slug}` : slug;
	} catch {
		return link.label;
	}
};

export function Contact({ profile }: ContactProps) {
	const socialLinks = profile.links.filter((link) => link.kind !== "email");

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
			<div className="mx-auto max-w-6xl">
				<div className="flex items-start justify-between">
					<p className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
						<span className="text-primary">03</span> Get in touch
					</p>
					<div className="text-right font-mono text-muted-foreground text-xs">
						<p>~/contact</p>
						<p className="text-primary">
							<span aria-hidden="true">●</span> replies in &lt; 24h
						</p>
					</div>
				</div>

				<h2
					className="mt-2 font-mono font-semibold text-3xl tracking-tight sm:text-4xl"
					id="contact-heading"
				>
					Let&apos;s build something.
				</h2>

				<div className="mt-6 border-border border-t" />

				<div className="mt-8 grid gap-10 lg:grid-cols-2">
					<div className="space-y-6">
						<div className="space-y-5">
							<a
								className="group inline-flex items-center gap-2 font-mono font-semibold text-2xl text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
								href={`mailto:${profile.email}`}
							>
								{profile.email}
								<ArrowRightIcon
									className="size-5 transition-transform group-hover:translate-x-1"
									weight="light"
								/>
							</a>
							<div className="border-border border-b border-dotted" />
						</div>

						<dl className="space-y-2 font-mono text-sm">
							<div className="flex gap-3">
								<dt className="w-20 shrink-0 text-muted-foreground">
									location
								</dt>
								<dd className="text-foreground">{profile.location}</dd>
							</div>
							<div className="flex gap-3">
								<dt className="w-20 shrink-0 text-muted-foreground">status</dt>
								<dd className="text-primary">{profile.statusNote}</dd>
							</div>
							<div className="flex gap-3">
								<dt className="w-20 shrink-0 text-muted-foreground">stack</dt>
								<dd className="text-foreground">{profile.stackLine}</dd>
							</div>
							{socialLinks.map((link) => (
								<div className="flex gap-3" key={link.kind}>
									<dt className="w-20 shrink-0 text-muted-foreground">
										{link.kind}
									</dt>
									<dd>
										<a
											aria-label={link.label}
											className="text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
											href={link.href}
											rel="noopener noreferrer"
											target="_blank"
										>
											{handleFromHref(link)}
										</a>
									</dd>
								</div>
							))}
						</dl>

						{profile.scheduleUrl ? (
							<div className="space-y-3">
								<p className="font-mono text-muted-foreground text-xs">
									prefer a call?
								</p>
								<a
									className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-border bg-input/30 px-3 font-mono text-foreground text-xs transition-colors hover:bg-input/50 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
									href={profile.scheduleUrl}
									rel="noopener noreferrer"
									target="_blank"
								>
									<span className="text-muted-foreground">$</span>
									schedule a 30-min call
								</a>
							</div>
						) : null}
					</div>

					<div className="rounded-lg border border-border bg-card p-5">
						<form.AppForm>
							<form
								className="space-y-4"
								onSubmit={(e) => {
									e.preventDefault();
									form.handleSubmit();
								}}
							>
								<FieldGroup>
									<form.AppField name="name">
										{(field) => (
											<field.Input
												className="h-9 font-mono"
												label={
													<>
														NAME <span className="text-primary">*</span>
													</>
												}
												labelClassName="font-mono tracking-widest"
											/>
										)}
									</form.AppField>

									<form.AppField name="email">
										{(field) => (
											<field.Input
												className="h-9 font-mono"
												label={
													<>
														EMAIL <span className="text-primary">*</span>
													</>
												}
												labelClassName="font-mono tracking-widest"
												type="email"
											/>
										)}
									</form.AppField>

									<form.AppField name="message">
										{(field) => (
											<field.Textarea
												className="font-mono"
												label={
													<>
														MESSAGE <span className="text-primary">*</span>
													</>
												}
												labelClassName="font-mono tracking-widest"
												placeholder="What are you building?"
												rows={5}
											/>
										)}
									</form.AppField>

									<div className="flex flex-wrap items-center justify-between gap-3 pt-2">
										<p className="font-mono text-muted-foreground text-xs">
											protected · rate-limited
										</p>
										<form.Subscribe
											selector={(state) => [
												state.canSubmit,
												state.isValidating,
												state.isSubmitting,
											]}
										>
											{([canSubmit, isValidating, isSubmitting]) => (
												<Button
													className="font-mono"
													disabled={!canSubmit || isValidating || isSubmitting}
													size="lg"
													type="submit"
												>
													{isSubmitting ? (
														<>
															<Spinner />
															sending...
														</>
													) : (
														<>
															<ArrowRightIcon />
															send message
														</>
													)}
												</Button>
											)}
										</form.Subscribe>
									</div>
								</FieldGroup>
							</form>
						</form.AppForm>
					</div>
				</div>
			</div>
		</section>
	);
}
