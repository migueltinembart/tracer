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
import { trpc } from "@/lib/trpc";
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
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";

const siteFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  status: z.enum(["active", "planned", "staging", "retired"]),
  comment: z.string({ description: "Add a comment" }).optional(),
  siteGroupId: z.number().optional(),
});

const siteGroups = [
  {
    value: 1,
    label: "Site Group 1",
  },
  {
    value: 2,
    label: "Sit Group 2",
  },
  {
    value: 3,
    label: "Site Group 3",
  },
];

export function SiteForm() {
  const form = useForm<z.infer<typeof siteFormSchema>>({
    resolver: zodResolver(siteFormSchema),
    defaultValues: {
      name: "",
      status: "active",
      comment: undefined,
      siteGroupId: undefined,
    },
  });

  const { data, mutate } = trpc.sites.insertOne.useMutation();

  async function onSubmit(values: z.infer<typeof siteFormSchema>) {
    console.log(values);
    mutate(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Name</FormLabel>
              <FormControl>
                <Input placeholder="Contoso" {...field} />
              </FormControl>
              <FormDescription>Try to be as exact as possible</FormDescription>
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
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Add a comment to the site</FormDescription>
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
              <FormDescription>Try to be as exact as possible</FormDescription>
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
                        ? siteGroups.find(
                            (sitegroup) => sitegroup.value === field.value
                          )?.label
                        : "Select site group"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command className="w-full">
                    <CommandInput
                      placeholder="Search site groups"
                      className="h-9"
                    />
                    <CommandEmpty>
                      <div className="flex flex-col">
                        <div>Want to create a new site?</div>
                        <div>
                          <Button>Create</Button>
                        </div>
                      </div>
                    </CommandEmpty>
                    <CommandGroup>
                      {siteGroups.map((sitegroup) => (
                        <CommandItem
                          value={sitegroup.label}
                          key={sitegroup.value}
                          onSelect={() => {
                            form.setValue("siteGroupId", sitegroup.value);
                          }}
                        >
                          {sitegroup.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              sitegroup.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the sitegroup that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full">
          <Button type="submit">Deploy</Button>
        </div>
      </form>
    </Form>
  );
}
