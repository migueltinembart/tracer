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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TenantGroupForm } from "./createTenantgroupForm";
import type { RouterInput } from "@/trpc";

type tenantFormInput = RouterInput["tenants"]["create"]["one"];

const tenantFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  comment: z.string({ description: "Add a comment" }).optional(),
  tenantGroupId: z.optional(z.number().nullable()),
});

export function TenantForm() {
  const tenantCreator = trpc.tenants.create.one.useMutation({
    onSuccess: (data) => {
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
  const { toast } = useToast();
  const tenantGroupsQuery = trpc.tenantGroups.select.all.useQuery();

  const form = useForm<tenantFormInput>({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      name: "",
      comment: undefined,
      tenantGroupId: undefined,
    },
  });

  function SubmitButton() {
    if (tenantCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <RefreshCw className="animate-spin"></RefreshCw>
        </Button>
      );
    }

    if (tenantCreator.status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (tenantCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    }
  }

  async function onSubmit(values: z.infer<typeof tenantFormSchema>) {
    tenantCreator.mutate(values);
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
          name="tenantGroupId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tenant group</FormLabel>
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
                        ? tenantGroupsQuery.data?.find(
                            (tenantGroup) => tenantGroup.id === field.value
                          )?.name
                        : "Select site group"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Dialog>
                    {tenantGroupsQuery.isStale && (
                      <Command className="w-full">
                        <CommandInput
                          placeholder="Search site groups"
                          className="h-9 pt-1"
                        />
                        {tenantGroupsQuery.data?.length == 0 && (
                          <div className="flex flex-col text-center">
                            <p className="p-3">Create site group?</p>
                            <DialogTrigger>
                              <Button>Create</Button>
                            </DialogTrigger>
                          </div>
                        )}
                        <CommandEmpty>
                          <DialogTrigger>
                            <p className="pb-2">Create a new group?</p>
                            <Button>Create</Button>
                          </DialogTrigger>
                        </CommandEmpty>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create site group</DialogTitle>
                            <DialogDescription>
                              Create a site group and and make accessing devices
                              belonging to the same site group easier.
                            </DialogDescription>
                          </DialogHeader>
                          <TenantGroupForm></TenantGroupForm>
                        </DialogContent>

                        <CommandGroup>
                          {tenantGroupsQuery.data?.map((tenantGroup) => (
                            <CommandItem
                              value={tenantGroup.name}
                              key={tenantGroup.id}
                              onSelect={() => {
                                form.setValue("tenantGroupId", tenantGroup.id);
                              }}
                            >
                              {tenantGroup.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  tenantGroup.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    )}
                  </Dialog>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex pt-3 justify-end w-full">
          <SubmitButton></SubmitButton>
        </div>
      </form>
    </Form>
  );
}
