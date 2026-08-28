# Complex / Nested Form Boilerplate

For nested objects, dynamic arrays, and multi-section forms.

## Schema with Nested Structures

```ts
// apps/web/src/lib/schemas/project.ts
import { z } from "zod";

export const ProjectFormSchema = z.object({
  name: z.string().min(1),
  status: z.enum(["draft", "active", "finished"]),
  description: z.string().transform((v) => v || undefined),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
  }),
  users: z
    .array(z.object({ email: z.email() }))
    .min(1, "At least one user is required")
    .max(5, "Maximum 5 users allowed"),
});
```

The matching `ProjectFormType` is auto-generated to `apps/web/src/lib/types.ts` — import it
(`import type { ProjectFormType } from "@/lib/types"`). `z.email()` is Zod v4's email validator.

## Dynamic Arrays (array field mode)

Use `form.Field` with `mode="array"` for dynamic lists:

```tsx
<form.Field mode="array" name="users">
  {(field) => (
    <div>
      <Button
        type="button"
        onClick={() => field.pushValue({ email: "" })}
      >
        Add User
      </Button>

      {field.state.value.map((_, index) => (
        <form.Field key={index} name={`users[${index}].email`}>
          {(innerField) => (
            <div>
              <field.Input
                label={`User ${index + 1} Email`}
              />
              <Button
                type="button"
                onClick={() => field.removeValue(index)}
              >
                Remove
              </Button>
            </div>
          )}
        </form.Field>
      ))}
    </div>
  )}
</form.Field>
```

Always use `field.pushValue()` and `field.removeValue()` for array operations. No `useFormContext` needed —
TanStack Form automatically provides context to nested fields via `form.AppField`.

## Nested Field Naming

Use dot notation: `"notifications.email"`, `"users[0].email"`.

## Full Boilerplate

```tsx
import { X } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@portfolio/ui/components/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@portfolio/ui/components/field";
import { useAppForm } from "@portfolio/ui/components/form/hooks";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@portfolio/ui/components/input-group";
import { SelectItem } from "@portfolio/ui/components/select";
import { Spinner } from "@portfolio/ui/components/spinner";
import { ProjectFormSchema } from "@/lib/schemas/project";
import type { ProjectFormType } from "@/lib/types";
import { queryUtils } from "@/utils/orpc";

export const PROJECT_STATUSES = ["draft", "active", "finished"] as const;

export function ProjectForm() {
  const { mutateAsync: createProject } = useMutation(
    queryUtils.project.create.mutationOptions({
      onSuccess: () => {
        toast.success("Project created successfully");
        form.reset();
      },
    })
  );

  const form = useAppForm({
    defaultValues: {
      name: "",
      description: "",
      users: [{ email: "" }],
      status: "draft",
      notifications: {
        email: false,
        sms: false,
        push: false,
      },
    } satisfies ProjectFormType as ProjectFormType,
    validators: {
      onSubmit: ProjectFormSchema,
    },
    onSubmit: async ({ value }) => {
      await createProject(value);
    },
  });

  return (
    <form.AppForm>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Simple text input */}
          <form.AppField name="name">
            {(field) => <field.Input label="Project Name" />}
          </form.AppField>

          {/* Select dropdown */}
          <form.AppField name="status">
            {(field) => (
              <field.Select label="Status">
                {PROJECT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>

          {/* Textarea */}
          <form.AppField name="description">
            {(field) => (
              <field.Textarea
                description="Be as detailed as possible"
                label="Description"
              />
            )}
          </form.AppField>

          {/* Nested object fields (checkboxes) */}
          <FieldSet>
            <FieldContent>
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>
                Select how you would like to receive notifications.
              </FieldDescription>
            </FieldContent>
            <FieldGroup data-slot="checkbox-group">
              <form.AppField name="notifications.email">
                {(field) => <field.Checkbox label="Email" />}
              </form.AppField>
              <form.AppField name="notifications.sms">
                {(field) => <field.Checkbox label="Text" />}
              </form.AppField>
              <form.AppField name="notifications.push">
                {(field) => <field.Checkbox label="In App" />}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Dynamic array fields */}
          <form.Field mode="array" name="users">
            {(field) => (
              <FieldSet>
                <div className="flex items-center justify-between gap-2">
                  <FieldContent>
                    <FieldLegend className="mb-0" variant="label">
                      User Email Addresses
                    </FieldLegend>
                    <FieldDescription>
                      Add up to 5 users to this project (including yourself).
                    </FieldDescription>
                    {field.state.meta.errors && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldContent>
                  <Button
                    onClick={() => field.pushValue({ email: "" })}
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    Add User
                  </Button>
                </div>
                <FieldGroup>
                  {field.state.value.map((_, index) => (
                    <form.Field
                      key={index.toString()}
                      name={`users[${index}].email`}
                    >
                      {(innerField) => {
                        const isInvalid =
                          innerField.state.meta.isTouched &&
                          !innerField.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            orientation="horizontal"
                          >
                            <FieldContent>
                              <InputGroup>
                                <InputGroupInput
                                  aria-invalid={isInvalid}
                                  aria-label={`User ${index + 1} email`}
                                  id={innerField.name}
                                  onBlur={innerField.handleBlur}
                                  onChange={(e) =>
                                    innerField.handleChange(e.target.value)
                                  }
                                  type="email"
                                  value={innerField.state.value}
                                />
                                {field.state.value.length > 1 && (
                                  <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                      aria-label={`Remove User ${index + 1}`}
                                      onClick={() => field.removeValue(index)}
                                      size="icon-xs"
                                      type="button"
                                      variant="ghost"
                                    >
                                      <X />
                                    </InputGroupButton>
                                  </InputGroupAddon>
                                )}
                              </InputGroup>
                              {isInvalid && (
                                <FieldError
                                  errors={innerField.state.meta.errors}
                                />
                              )}
                            </FieldContent>
                          </Field>
                        );
                      }}
                    </form.Field>
                  ))}
                </FieldGroup>
              </FieldSet>
            )}
          </form.Field>

          {/* Submit button with loading state */}
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isValidating,
              state.isSubmitting,
            ]}
          >
            {([canSubmit, isValidating, isSubmitting]) => (
              <Button
                disabled={!canSubmit || isValidating || isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Creating...
                  </>
                ) : (
                  "Create Project"
                )}
              </Button>
            )}
          </form.Subscribe>
        </FieldGroup>
      </form>
    </form.AppForm>
  );
}
```
