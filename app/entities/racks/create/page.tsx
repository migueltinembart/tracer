"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/_trpc/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, CheckIcon, ChevronsUpDown, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

import type { RouterInput } from "@/app/_trpc/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateButton } from "@/app/_components/createButton";
import { Dialog } from "@/components/ui/dialog";
import LocationForm from "../../locations/create/page";
import { useState } from "react";
import SiteForm from "@/app/entities/sites/create/page";
import TenantForm from "../../tenants/create/page";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  FormCommand,
  FormCommandWrapper,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/app/_components/FormFields";
import clsx from "clsx";
import RackRoleForm from "../../rack-roles/create/page";

type RackFormInput = RouterInput["entities"]["racks"]["create"]["one"];

const rackFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  description: z.string({ description: "Add a description" }).optional(),
  location_id: z.number(),
  role_id: z.number(),
  units: z.coerce.number(),
});

const unitsArray: number[] = Array.from(
  { length: 58 - 4 + 1 },
  (_, index) => 4 + index
);

export default function RackForm() {
  const [siteValue, setSiteValue] = useState(0);
  const [tenantValue, setTenantValue] = useState(0);

  const { toast } = useToast();
  const locationQuery = trpc.entities.locations.select.all.useQuery({
    site_id: siteValue !== 0 ? siteValue : undefined,
  });
  
  const tenantQuery = trpc.entities.tenants.select.all.useQuery();
  const siteQuery = trpc.entities.sites.select.all.useQuery({
    tenant_id: tenantValue !== 0 ? tenantValue : undefined,
  });
  const context = trpc.useContext();
  const rackCreator = trpc.entities.racks.create.one.useMutation({
    onSuccess: (data) => {
      context.entities.racks.select.all.invalidate();
      return toast({
        title: `Rack "${data.name}" created`,
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
      location_id: undefined,
      role_id: undefined,
      units: 4,
    },
  });

  function SubmitButton() {
    if (rackCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <RefreshCw className="animate-spin"></RefreshCw>
        </Button>
      );
    }

    if (rackCreator.status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (rackCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    } else {
      return null;
    }
  }

  function onSubmit(values: z.infer<typeof rackFormSchema>) {
    console.log(values);
    rackCreator.mutate(values);
    form.reset();
    <DialogClose />;
  }

  return (
    <Dialog>
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
                label="Name"
                description="Pick a name for this Rack"
              />
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormTextarea
                field={field}
                label="Description"
                description="Describe the rack"
              />
            )}
          />
          <FormField
            control={form.control}
            name="units"
            render={({ field }) => (
              <FormSelect
                field={field}
                label="Units"
                description="Choose the height in units"
              >
                {unitsArray.map((unit) => (
                  <SelectItem
                    onSelect={() => form.setValue("units", unit)}
                    key={unit}
                    value={unit.toString()}
                  >
                    {unit}
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
                description="assign this rack to a location"
                buttonValue={
                  field.value
                    ? locationQuery.data?.find((v) => v.id === field.value)
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
                  {locationQuery.data?.map((v) => (
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
          

          <div className="flex justify-end w-full pt-3">
            <FormField
              name="submit"
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
