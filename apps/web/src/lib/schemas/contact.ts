import { z } from "zod";

export const ContactFormSchema = z.object({
	email: z.email("Enter a valid email address"),
	message: z
		.string()
		.min(1, "Message is required")
		.max(5000, "Message is too long"),
	name: z.string().min(1, "Name is required").max(100, "Name is too long"),
});
