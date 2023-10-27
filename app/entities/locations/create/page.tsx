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
import SiteForm from "@/app/entities/sites/create/page";
import type { RouterInput } from "@/app/_trpc/client";
import { capitalize, UnionTuple } from "@/lib/helpers";
import { Dialog } from "@/components/ui/dialog";
import clsx from "clsx";
import { DialogClose } from "@radix-ui/react-dialog";
import { contextProps } from "@trpc/react-query/shared";

type LocationFormInput = RouterInput["entities"]["locations"]["create"]["one"];

const status: UnionTuple<LocationFormInput["status"]> = [
  "active",
  "planned",
  "retired",
  "staging",
];

const locationFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  status: z.enum(["active", "planned", "staging", "retired"]),
  description: z.string({ description: "Add a description" }).optional(),
  site_id: z.number({ required_error: "This Field is required" }),
});

export default function LocationForm() {
  const { toast } = useToast();
  const sitesQuery = trpc.entities.sites.select.all.useQuery();
  const context = trpc.useContext();
  const locationCreator = trpc.entities.locations.create.one.useMutation({
    onSuccess: (data) => {
      context.entities.rack_roles.select.all.refetch();
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

  const form = useForm<LocationFormInput>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      name: "",
      status: "active",
      description: undefined,
      site_id: undefined,
    },
  });

  function SubmitButton() {
    if (locationCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <SymbolIcon className="animate-spin"></SymbolIcon>
        </Button>
      );
    }

    if (locationCreator.status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (locationCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    }
  }

  async function onSubmit(values: z.infer<typeof locationFormSchema>) {
    locationCreator.mutate(values);
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
        Location
      </p>
      <p className={clsx(["text-sm", "text-muted-foreground"])}>
        Create a location
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
                label="Location Name"
                description="Describe the location"
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
                description="Set the Status of this location"
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
                description="Describe the Site"
                label="Description"
              />
            )}
          />
          <FormField
            control={form.control}
            name="site_id"
            render={({ field }) => (
              <FormCommandWrapper
                field={field}
                label="Site"
                description="assign the location to a site"
                buttonValue={
                  field.value
                    ? sitesQuery.data?.find((v) => v.id === field.value)?.name
                    : "Select item"
                }
              >
                <FormCommand
                  modalButton={{
                    formComponent: <SiteForm />,
                    variant: "default",
                  }}
                >
                  {sitesQuery.data?.map((v) => (
                    <CommandItem
                      key={v.id}
                      value={v.name}
                      onSelect={() => form.setValue("site_id", v.id)}
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
