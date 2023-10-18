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
import SiteGroupForm from "@/app/entities/site-groups/create/page";
import type { RouterInput } from "@/app/_trpc/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { capitalize, UnionTuple } from "@/lib/helpers";
import { CreateButton } from "@/app/_components/createButton";
import { Dialog } from "@/components/ui/dialog";

type SiteGroupFormInput = RouterInput["entities"]["site_groups"]["create"]["one"];

const siteGroupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  status: z.enum(["active", "planned", "staging", "retired"]),
  site_group_id: z.optional(z.number().nullable()),
});

export default function SiteForm() {
  const { toast } = useToast();
  const siteGroupsQuery = trpc.entities.site_groups.select.all.useQuery();
  const context = trpc.useContext();
  const siteCreator = trpc.entities.sites.create.one.useMutation({
    onSuccess: (data) => {
      context.entities.sites.select.all.invalidate();
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

  const form = useForm<SiteGroupFormInput>({
    resolver: zodResolver(siteGroupFormSchema),
    defaultValues: {
      name: "",
      status: "active",
      description: undefined,
      site_group_id: undefined,
    },
  });

  function SubmitButton() {
    if (siteCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <RefreshCw className="animate-spin"></RefreshCw>
        </Button>
      );
    }

    if (siteCreator.status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (siteCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    } else {
      return null;
    }
  }

  async function onSubmit(values: z.infer<typeof siteGroupFormSchema>) {
    siteCreator.mutate(values);
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
                <FormLabel>Site Name</FormLabel>
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
                  Add a description to the newly created site
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="site_group_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Site group</FormLabel>
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
                          ? siteGroupsQuery.data?.find(
                              (sitegroup) => sitegroup.id === field.value
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
                    {siteGroupsQuery.isStale && (
                      <Command className="w-full">
                        <CommandInput
                          placeholder="Search site groups"
                          className="pt-1 h-9"
                        />
                        {siteGroupsQuery.data?.length === 0 && (
                          <div className="flex flex-col text-center">
                            <p className="p-3">there are no site Groups...</p>
                            <CreateButton
                              goToElement={<SiteGroupForm />}
                              title="create Site Group"
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
                              goToElement={<SiteGroupForm />}
                              title="Create Site Group"
                            ></CreateButton>
                          </CommandEmpty>

                          <CommandGroup>
                            {siteGroupsQuery.data?.map((sitegroup) => (
                              <CommandItem
                                value={sitegroup.name}
                                key={sitegroup.id}
                                onSelect={() => {
                                  form.setValue("site_group_id", sitegroup.id);
                                }}
                              >
                                {sitegroup.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    sitegroup.id === field.value
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
