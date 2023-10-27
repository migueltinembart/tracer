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
import LocationForm from "../../locations/create/page";
import RackRoleForm from "../../rack-roles/create/page";
const unitsArray: number[] = Array.from(
  { length: 58 - 4 + 1 },
  (_, index) => 4 + index
);
type RackFormInput = RouterInput["entities"]["racks"]["create"]["one"];

const rackFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  description: z.string({ description: "Add a description" }).optional(),
  role_id: z.number(),
  location_id: z.number(),
  units: z.coerce.number(),
});

export default function SiteForm() {
  const { toast } = useToast();
  const locationsQuery = trpc.entities.locations.select.all.useQuery();
  const rackRoleQuery = trpc.entities.rack_roles.select.all.useQuery();
  const context = trpc.useContext();
  const rackCreator = trpc.entities.racks.create.one.useMutation({
    onSuccess: (data) => {
      context.entities.racks.select.all.refetch();
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

  const form = useForm<RackFormInput>({
    resolver: zodResolver(rackFormSchema),
    defaultValues: {
      name: "",
      description: undefined,
      units: undefined,
      location_id: undefined,
    },
  });

  function SubmitButton() {
    if (rackCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <SymbolIcon className="animate-spin"></SymbolIcon>
        </Button>
      );
    }

    if (rackCreator.status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (rackCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    }
  }

  async function onSubmit(values: z.infer<typeof rackFormSchema>) {
    rackCreator.mutate(values);
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
        Rack
      </p>
      <p className={clsx(["text-sm", "text-muted-foreground"])}>
        Create a rack
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
            name="units"
            render={({ field }) => (
              <FormSelect
                label="Units"
                description="Select the height in units"
                field={field}
              >
                {unitsArray.map((v) => (
                  <SelectItem {...field} value={v.toString()}>
                    {v}
                  </SelectItem>
                ))}
              </FormSelect>
            )}
          />
          <FormField
            control={form.control}
            name="location_id"
            render={({ field }) => (
              <FormCommandWrapper
                field={field}
                label="Location"
                description="assign this site to a location"
                buttonValue={
                  field.value
                    ? locationsQuery.data?.find((v) => v.id === field.value)
                        ?.name
                    : "Select item"
                }
              >
                <FormCommand
                  modalButton={{
                    formComponent: <LocationForm />,
                    variant: "default",
                  }}
                >
                  {locationsQuery.data?.map((v) => (
                    <CommandItem
                      key={v.id}
                      value={v.name}
                      onSelect={() => form.setValue("location_id", v.id)}
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
            name="role_id"
            render={({ field }) => (
              <FormCommandWrapper
                field={field}
                label="Role"
                description="assign this site to a Role"
                buttonValue={
                  field.value
                    ? rackRoleQuery.data?.find((v) => v.id === field.value)
                        ?.name
                    : "Select item"
                }
              >
                <FormCommand
                  modalButton={{
                    formComponent: <RackRoleForm />,
                    variant: "default",
                  }}
                >
                  {rackRoleQuery.data?.map((v) => (
                    <CommandItem
                      key={v.id}
                      value={v.name}
                      onSelect={() => form.setValue("role_id", v.id)}
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
