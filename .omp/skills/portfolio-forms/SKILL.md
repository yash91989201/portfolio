---
name: portfolio-forms
description: Form implementation conventions for the portfolio monorepo using TanStack Form, Zod, and the shared form components in @portfolio/ui. Use when building ANY form — simple or complex, form schemas, form validation, useAppForm, dynamic field arrays, or form mutations. Covers FormSchema/FormType naming, useAppForm setup, field components (field.Attachment for files, etc.), and dynamic array patterns. Trigger on ANY form-related task, even if the user just says "add an input" or "create a form" or "add validation."
---

# Form Implementation with TanStack Form

## Project Structure

- **Schemas** → `<workspace>/src/lib/schemas/` grouped by domain (e.g. `auth.ts`, `workspace.ts`) — see the portfolio-schema skill for the full rule.
- **Types** → `<workspace>/src/lib/types.ts` (auto-generated, do not edit).
- **Form Components** → co-located in feature folders (`apps/web/src/components`, route folders, etc.).

## Schema & Type Naming

Always suffix schemas with `FormSchema` and inferred types with `FormType` (matches the type generator: `XSchema` → `XType`):

- `LogInFormSchema` → `LogInFormType`
- `CreateOrgFormSchema` → `CreateOrgFormType`

Types are auto-generated from schemas via `z.infer`. Import from `@/lib/types` (web) or the package's `lib/types`, never define types manually inside components.

## Form Setup with useAppForm

Import the custom form hook from the shared UI package:

```ts
import { useAppForm } from "@portfolio/ui/components/form/hooks";
```

Initialize:

```ts
const form = useAppForm({
  defaultValues: {
    email: "",
    password: "",
  } satisfies LogInFormType as LogInFormType,
  validators: {
    onSubmit: LogInFormSchema,
  },
  onSubmit: async ({ value }) => {
    // Handle form submission
  },
});
```

Wrap with `<form.AppForm>`:

```tsx
<form.AppForm>
  <form onSubmit={(e) => {
    e.preventDefault();
    form.handleSubmit();
  }}>
    {/* fields */}
  </form>
</form.AppForm>
```

## Mutations & Submissions

Use `@tanstack/react-query`'s `useMutation` with oRPC `queryUtils.<procedure>.mutationOptions()` from `@/utils/orpc`:

```tsx
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryUtils } from "@/utils/orpc";

const { mutateAsync: createExample } = useMutation(
  queryUtils.example.create.mutationOptions({
    onSuccess: () => {
      toast.success("Form submitted successfully");
      form.reset();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    },
  })
);
```

- Handle side effects (`toast`, `invalidateQueries`, `navigate`) in mutation callbacks.
- `toast` comes from `sonner` (already globally wired; the query cache also surfaces errors).
- For auth operations, use `authClient` directly — `import { authClient } from "@/lib/auth-client"` (a `better-auth/react` client).

## UX Rules

1. **Buttons**
   - `<button>` defaults to `type="submit"`.
   - Use `type="button"` for non-submit actions (cancel, add, remove).
   - Use `type="reset"` for reset actions.
   - Omit `type` when the button should submit the form.
2. **Validation** → errors are automatically displayed by `FormBase` (shows when the field is touched and invalid).
3. **Loading state** → use `form.Subscribe` to access `canSubmit`, `isSubmitting`, `isValidating`.
4. **Reset** → call `form.reset()` after successful submission or pass a handler to the `onReset` prop.

## Available Field Components

The custom form wrapper (`@portfolio/ui/components/form/hooks`) exposes these field components (all accept `label` required, `description` optional, plus standard HTML input props):

- `field.Input` — Text input
- `field.Textarea` — Textarea
- `field.Select` — Select dropdown (children are `SelectItem`s from `@portfolio/ui/components/select`)
- `field.Checkbox` — Checkbox
- `field.Attachment` — File upload (single or multiple; supports `accept`, `multiple`, `capture`)
- `field.InputGroup` — Input with addons
- `field.InputGroupInput` — Input within InputGroup
- `field.InputGroupTextarea` — Textarea within InputGroup
- `field.InputGroupSpinner` — Spinner shown while a field validates

> The file-upload field is `field.Attachment`, **not** `field.FileInput`.

Raw layout primitives (not field-wrapped) come from `@portfolio/ui/components/{field,input-group}`: `Field`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldContent`, `FieldDescription`, `FieldError`, `InputGroup`, `InputGroupAddon`, `InputGroupButton`.

## Simple vs Complex Forms

- **Simple form** (single component, flat fields) → see [references/simple-form.md](./references/simple-form.md) for full boilerplate.
- **Complex form** (nested objects, dynamic arrays, multi-section) → see [references/complex-form.md](./references/complex-form.md) for full boilerplate including array field mode, conditional fields, and checkbox groups.

## Key Patterns

### Error Handling in onSubmit

```tsx
onSubmit: async ({ value }) => {
  try {
    await createExample(value);
  } catch (err) {
    form.setFieldMeta("email", (prev) => ({
      ...prev,
      errorMap: {
        onSubmit: err instanceof Error ? err.message : "Submission failed",
      },
    }));
  }
}
```

### Async Validation with Zod

Use `.refine()` with async functions (Zod v4):

```ts
const schema = z.object({
  username: z.string()
    .min(3)
    .refine(async (val) => {
      const { data } = await checkAvailability(val);
      return data?.available ?? false;
    }, {
      message: "Username already taken",
    }),
});
```

### Conditional (Cross-field) Validation

```ts
const schema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
```

### Conditional Fields Based on Form State

Use `form.Subscribe` to read a slice of form state and render conditionally:

```tsx
<form.Subscribe selector={(state) => state.values.type}>
  {(type) => (type === "team" ? (
    <TeamSelect form={form} />
  ) : (
    <GroupSelect form={form} />
  )}
</form.Subscribe>
```
