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
import { SiteGroupForm } from "./createSiteGroupForm";
import type { RouterInput } from "@/trpc";
import { ScrollArea } from "../ui/scroll-area";
import { capitalize, UnionTuple } from "@/lib/helpers";
import { CreateButton } from "../layout/navbar/createButton";
import { Dialog } from "@/components/ui/dialog";

type SiteFormInput = RouterInput["sites"]["create"]["one"];
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
  comment: z.string({ description: "Add a comment" }).optional(),
  siteGroupId: z.optional(z.number().nullable()),
});

export function SiteForm() {
  const { toast } = useToast();
  const siteGroupsQuery = trpc.siteGroups.select.all.useQuery();
  const context = trpc.useContext();
  const siteCreator = trpc.sites.create.one.useMutation({
    onSuccess: (data) => {
      context.sites.select.all.invalidate();
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
      comment: undefined,
      siteGroupId: undefined,
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

  async function onSubmit(values: z.infer<typeof siteFormSchema>) {
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
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea value={field.value}></Textarea>
                </FormControl>
                <FormDescription>
                  Add a comment to the newly created site
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="siteGroupId"
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
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                          className="h-9 pt-1"
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
                        <ScrollArea className="
                        max-h-40">
                          <CommandEmpty>
                            <p className="pb-2">Create a new group?</p>
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
                                  form.setValue("siteGroupId", sitegroup.id);
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
