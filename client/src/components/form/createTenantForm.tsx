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
import { Dialog } from "@/components/ui/dialog";
import { TenantGroupForm } from "./createTenantGroupForm";
import type { RouterInput } from "@/trpc";
import { ScrollArea } from "../ui/scroll-area";
import { CreateButton } from "../layout/navbar/createButton";

type tenantFormInput = RouterInput["tenants"]["create"]["one"];

const tenantFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  description: z.string({ description: "Add a description" }).optional(),
  tenantGroupId: z.optional(z.number().nullable()),
});

export function TenantForm() {
  const tenantCreator = trpc.tenants.create.one.useMutation({
    onSuccess: (data) => {
      return toast({
        title: `Tenant "${data.name}" created`,
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
  const context = trpc.useContext();

  const form = useForm<tenantFormInput>({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      name: "",
      description: undefined,
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
    setTimeout(() => {
      context.tenants.select.all.invalidate();
    }, 1000);
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
                <FormLabel>Tenant Name</FormLabel>
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
                  Add a description to the newly created tenant
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
                          : "Select tenant group"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[200px] p-0"
                    align="center"
                    side="bottom"
                  >
                    <Dialog>
                      {tenantGroupsQuery.isStale && (
                        <Command
                          className="w-full"
                          onFocusCapture={() => tenantGroupsQuery.refetch()}
                        >
                          <CommandInput
                            placeholder="Search tenant groups"
                            className="h-9 pt-1"
                          />
                          {tenantGroupsQuery.data?.length === 0 && (
                            <div className="flex flex-col text-center p-1">
                              <p className="p-3">Group not found?</p>
                              <CreateButton
                                goToElement={<TenantGroupForm />}
                                title="Create Tenant Group"
                              />
                            </div>
                          )}
                          <ScrollArea className="max-h-[300px]">
                            <CommandEmpty>
                              <p className="pb-2">Group not found?</p>
                              <CreateButton
                                goToElement={<TenantGroupForm />}
                                title="Create Tenant Group"
                              />
                            </CommandEmpty>

                            <CommandGroup>
                              {tenantGroupsQuery.data?.map((tenantGroup) => (
                                <CommandItem
                                  value={tenantGroup.name}
                                  key={tenantGroup.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "tenantGroupId",
                                      tenantGroup.id
                                    );
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
                          </ScrollArea>
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
