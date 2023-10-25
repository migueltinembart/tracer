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

type RackFormInput = RouterInput["entities"]["racks"]["create"]["one"];

const rackFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  description: z.string({ description: "Add a description" }).optional(),
  location_id: z.number(),
  units: z.number()
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
    
    rackCreator.mutate(values);
    form.reset();
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
              <FormItem>
                <FormLabel>Rack Name</FormLabel>
                <FormControl>
                  <Input placeholder="Contoso" {...field} />
                </FormControl>
                <FormDescription>
                  Try to be as exact as possible
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Textarea value={field.value}></Textarea>
                </FormControl>
                <FormDescription>
                  Add a description to the newly created rack
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="units"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Units</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={field.value ? field.value : "units"}
                      />
                    </SelectTrigger>
                    <ScrollArea>
                      <SelectContent>
                        {unitsArray.map((unit) => (
                          <SelectItem
                            onSelect={() =>
                              form.setValue("units", unit)
                            }
                            key={unit}
                            value={unit.toString()}
                          >
                            {unit.toString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </ScrollArea>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Location</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? locationQuery.data?.find(
                              (location) => location.id === field.value
                            )?.name
                          : "Select site group"}
                        <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[200px] p-0"
                    align="center"
                    side="bottom"
                  >
                    {locationQuery.isStale && (
                      <Command className="w-full">
                        <CommandInput
                          placeholder="Search"
                          className="pt-1 h-9"
                        />
                        {locationQuery.data?.length === 0 && (
                          <div className="text-center">
                            <p className="p-3">there are no site Groups...</p>
                            <CreateButton
                              goToElement={<LocationForm />}
                              title="Create"
                            ></CreateButton>
                          </div>
                        )}
                        <ScrollArea
                          className="
  max-h-40"
                        >
                          <CommandEmpty>
                            <p className="pb-2">Group not found?</p>
                            <CreateButton
                              goToElement={<LocationForm />}
                              title="Create"
                            ></CreateButton>
                          </CommandEmpty>

                          <CommandGroup>
                            {locationQuery.data?.map((location) => (
                              <CommandItem
                                value={location.name}
                                key={location.id}
                                onSelect={() => {
                                  form.setValue("location_id", location.id);
                                }}
                              >
                                {location.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    location.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    )}
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
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
