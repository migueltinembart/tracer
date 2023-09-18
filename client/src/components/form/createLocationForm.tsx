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
import { trpc } from "@/trpc";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { CheckIcon, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";
import type { RouterInput } from "@/trpc";
import { ScrollArea } from "../ui/scroll-area";
import { capitalize, UnionTuple } from "@/lib/helpers";
import { CreateButton } from "../layout/navbar/createButton";
import { Dialog } from "@/components/ui/dialog";
import { SiteForm } from "./createSiteForm";

type LocationFormInput = RouterInput["locations"]["create"]["one"];
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
  siteId: z.number().optional(),
});

export function LocationForm() {
  const { toast } = useToast();
  const context = trpc.useContext();
  const siteQuery = trpc.sites.select.all.useQuery();
  const locationCreator = trpc.locations.create.one.useMutation({
    onSuccess: (data) => {
      context.locations.select.all.invalidate();
      return toast({
        title: `Location "${data.name}" created`,
      });
    },
    onError: (error) => {
      return toast({
        variant: "destructive",
        title: `Something with request went wrong! Trying again...`,
      });
    },
  });

  const form = useForm<LocationFormInput>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      name: "",
      status: "active",
      description: undefined,
      siteId: undefined,
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
            name="siteId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Site</FormLabel>
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
                          ? siteQuery.data?.find(
                              (site) => site.id === field.value
                            )?.name
                          : "Select site"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[200px] p-0"
                    align="center"
                    side="bottom"
                  >
                    {siteQuery.isStale && (
                      <Command className="w-full">
                        <CommandInput
                          placeholder="Search site"
                          className="h-9 pt-1"
                        />
                        {siteQuery.data?.length === 0 && (
                          <div className="flex flex-col text-center">
                            <p className="p-3">there are no site Groups...</p>
                            <CreateButton
                              goToElement={<SiteForm />}
                              title="create Site"
                            ></CreateButton>
                          </div>
                        )}
                        <ScrollArea
                          className="
                        max-h-40"
                        >
                          <CommandEmpty>
                            <p className="pb-2">Site not found?</p>
                            <CreateButton
                              goToElement={<SiteForm />}
                              title="Create Site"
                            ></CreateButton>
                          </CommandEmpty>

                          <CommandGroup>
                            {siteQuery.data?.map((site) => (
                              <CommandItem
                                value={site.name}
                                key={site.id}
                                onSelect={() => {
                                  form.setValue("siteId", site.id);
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
          <div className="flex pt-3 justify-end w-full">
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
