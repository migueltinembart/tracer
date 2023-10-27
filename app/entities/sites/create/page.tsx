"use client";
import {
  FormCommand,
  FormCommandWrapper,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/app/_components/FormFields";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { CommandItem } from "@/components/ui/command";
import { SymbolIcon, CheckIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import SiteGroupForm from "@/app/entities/site-groups/create/page";
import type { RouterInput } from "@/app/_trpc/client";
import { capitalize, UnionTuple } from "@/lib/helpers";
import { Dialog } from "@/components/ui/dialog";
import clsx from "clsx";
import TenantForm from "../../tenants/create/page";
import { DialogClose } from "@radix-ui/react-dialog";

type SiteFormInput = RouterInput["entities"]["sites"]["create"]["one"];

const status: UnionTuple<SiteFormInput["status"]> = [
  "active",
  "planned",
  "retired",
  "staging",
];

const siteFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  status: z.enum(["active", "planned", "staging", "retired"]),
  description: z.string({ description: "Add a description" }).optional(),
  site_group_id: z.optional(z.number().nullable()),
  tenant_id: z.number().optional().nullable(),
});

export default function SiteForm() {
  const { toast } = useToast();
  const tenantsQuery = trpc.entities.tenants.select.all.useQuery();
  const siteGroupsQuery = trpc.entities.site_groups.select.all.useQuery();
  const context = trpc.useContext();
  const siteCreator = trpc.entities.sites.create.one.useMutation({
    onSuccess: (data) => {
      context.entities.sites.select.all.refetch();
      return toast({
        title: `Site "${data.name}" created`,
      });
    },
    onError: () => {
      return toast({
        variant: "destructive",
        title: "Something with request went wrong! Trying again...",
      });
    },
  });

  const form = useForm<SiteFormInput>({
    resolver: zodResolver(siteFormSchema),
    defaultValues: {
      name: "",
      status: "active",
      description: undefined,
      site_group_id: undefined,
      tenant_id: undefined,
    },
  });

  function SubmitButton() {
    if (siteCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <SymbolIcon className="animate-spin"></SymbolIcon>
        </Button>
      );
    }

    if (siteCreator.status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (siteCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    }
  }

  async function onSubmit(values: z.infer<typeof siteFormSchema>) {
    siteCreator.mutate(values);
    form.reset();
    <DialogClose />;
  }

  return (
    <Dialog>
      <p
        className={clsx([
          "text-lg",
          "font-semibold",
          "leading-none",
          "tracking-tight",
        ])}
      >
        Site
      </p>
      <p className={clsx(["text-sm", "text-muted-foreground"])}>
        Create a Site
      </p>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInput
                field={field}
                label="Site name"
                description="Give the site a name"
              />
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormSelect
                label="Status"
                field={field}
                description="Set the status of this aite"
              >
                {status.map((v, index) => (
                  <SelectItem value={v} key={index}>
                    {capitalize(v)}
                  </SelectItem>
                ))}
              </FormSelect>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormTextarea
                field={field}
                description="Describe the site"
                label="Description"
              />
            )}
          />
          <FormField
            control={form.control}
            name="site_group_id"
            render={({ field }) => (
              <FormCommandWrapper
                field={field}
                label="Site group"
                description="assign this site to a site group"
                buttonValue={
                  field.value
                    ? siteGroupsQuery.data?.find((v) => v.id === field.value)
                        ?.name
                    : "Select item"
                }
              >
                <FormCommand
                  modalButton={{
                    formComponent: <SiteGroupForm />,
                    variant: "default",
                  }}
                >
                  {siteGroupsQuery.data?.map((v) => (
                    <CommandItem
                      key={v.id}
                      value={v.name}
                      onSelect={() => form.setValue("site_group_id", v.id)}
                    >
                      {v.name}
                      <CheckIcon
                        className={clsx(
                          "ml-auto h-4 w-4",
                          v.id === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </FormCommand>
              </FormCommandWrapper>
            )}
          />
          <FormField
            control={form.control}
            name="tenant_id"
            render={({ field }) => (
              <FormCommandWrapper
                field={field}
                label="Tenant"
                description="assign a tenant to this site"
                buttonValue={
                  field.value
                    ? tenantsQuery.data?.find((v) => v.id === field.value)?.name
                    : "Select item"
                }
              >
                <FormCommand
                  modalButton={{
                    formComponent: <TenantForm />,
                    variant: "default",
                  }}
                >
                  {tenantsQuery.data?.map((v) => (
                    <CommandItem
                      key={v.id}
                      value={v.name}
                      onSelect={() => form.setValue("tenant_id", v.id)}
                    >
                      {v.name}
                      <CheckIcon
                        className={clsx(
                          "ml-auto h-4 w-4",
                          v.id === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </FormCommand>
              </FormCommandWrapper>
            )}
          />
          <div className="flex justify-end w-full pt-3">
            <FormField
              name={"submit"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SubmitButton></SubmitButton>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </Dialog>
  );
}
