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
import { CheckIcon, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import SiteForm from "@/app/entities/sites/create/page";
import type { RouterInput } from "@/app/_trpc/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { capitalize, UnionTuple } from "@/lib/helpers";
import { CreateButton } from "@/app/_components/createButton";
import { Dialog } from "@/components/ui/dialog";

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
  location_group_id: z.optional(z.number().nullable()),
});

export default function LocationForm() {
  const { toast } = useToast();
  const sitesQuery =
    trpc.entities.sites.select.all.useQuery();
  const context = trpc.useContext();
  const locationCreator = trpc.entities.locations.create.one.useMutation({
    onSuccess: (data) => {
      context.entities.locations.select.all.invalidate();
      return toast({
        title: `Location "${data.name}" created`,
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
      description: undefined,
      site_id: undefined,
      status: "active",
    },
  });

  function SubmitButton() {
    if (locationCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <RefreshCw className="animate-spin"></RefreshCw>
        </Button>
      );
    }

    if (locationCreator.status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (locationCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    } else {
      return null;
    }
  }

  async function onSubmit(values: z.infer<typeof locationFormSchema>) {
    locationCreator.mutate(values);
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
                <FormLabel>Location Name</FormLabel>
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        className={"capitalize"}
                        placeholder={capitalize(field.value)}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {status.map((value) => {
                        return (
                          <SelectItem
                            key={value}
                            value={value}
                            className="capitalize"
                          >
                            {capitalize(value)}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Set the Status</FormDescription>
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
                  Add a description to the newly created location
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="site_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Location group</FormLabel>
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
                          ? sitesQuery.data?.find(
                              (site) =>
                                site.id === field.value
                            )?.name
                          : "Select location group"}
                        <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[200px] p-0"
                    align="center"
                    side="bottom"
                  >
                    {sitesQuery.isStale && (
                      <Command className="w-full">
                        <CommandInput
                          placeholder="Search location groups"
                          className="pt-1 h-9"
                        />
                        {sitesQuery.data?.length === 0 && (
                          <div className="flex flex-col text-center">
                            <p className="p-3">
                              there are no location Groups...
                            </p>
                            <CreateButton
                              goToElement={<SiteForm />}
                              title="create Location Group"
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
                              goToElement={<SiteForm />}
                              title="Create Location Group"
                            ></CreateButton>
                          </CommandEmpty>

                          <CommandGroup>
                            {sitesQuery.data?.map((site) => (
                              <CommandItem
                                value={site.name}
                                key={site.id}
                                onSelect={() => {
                                  form.setValue(
                                    "site_id",
                                    site.id
                                  );
                                }}
                              >
                                {site.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    site.id === field.value
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
