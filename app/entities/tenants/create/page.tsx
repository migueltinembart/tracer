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
import TenantGroupForm from "@/app/entities/tenant-groups/create/page";
import type { RouterInput } from "@/app/_trpc/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { capitalize, UnionTuple } from "@/lib/helpers";
import { CreateButton } from "@/app/_components/createButton";
import { Dialog } from "@/components/ui/dialog";

type TenantFormInput = RouterInput["entities"]["tenants"]["create"]["one"];

const tenantFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  description: z.string({ description: "Add a description" }).optional(),
  tenant_group_id: z.optional(z.number().nullable()),
});

export default function TenantForm() {
  const { toast } = useToast();
  const tenantGroupCreator = trpc.entities.tenant_groups.select.all.useQuery();
  const context = trpc.useContext();
  const tenantCreator = trpc.entities.tenants.create.one.useMutation({
    onSuccess: (data) => {
      context.entities.tenants.select.all.invalidate();
      return toast({
        title: `Tenant "${data.name}" created`,
      });
    },
    onError: () => {
      return toast({
        variant: "destructive",
        title: "Something with request went wrong!",
      });
    },
  });

  const form = useForm<TenantFormInput>({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      name: "",
      description: undefined,
      tenant_group_id: undefined,
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
    } else {
      return null;
    }
  }

  async function onSubmit(values: z.infer<typeof tenantFormSchema>) {
    tenantCreator.mutate(values);
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
            name="tenant_group_id"
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
                          ? tenantGroupCreator.data?.find(
                              (tenantgroup) => tenantgroup.id === field.value
                            )?.name
                          : "Select tenant group"}
                        <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[200px] p-0"
                    align="center"
                    side="bottom"
                  >
                    {tenantGroupCreator.isStale && (
                      <Command className="w-full">
                        <CommandInput
                          placeholder="Search tenant groups"
                          className="pt-1 h-9"
                        />
                        {tenantGroupCreator.data?.length === 0 && (
                          <div className="flex flex-col text-center">
                            <p className="p-3">there are no tenant Groups...</p>
                            <CreateButton
                              goToElement={<TenantGroupForm />}
                              title="create Tenant Group"
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
                              goToElement={<TenantGroupForm />}
                              title="Create Tenant Group"
                            ></CreateButton>
                          </CommandEmpty>

                          <CommandGroup>
                            {tenantGroupCreator.data?.map((tenantgroup) => (
                              <CommandItem
                                value={tenantgroup.name}
                                key={tenantgroup.id}
                                onSelect={() => {
                                  form.setValue(
                                    "tenant_group_id",
                                    tenantgroup.id
                                  );
                                }}
                              >
                                {tenantgroup.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    tenantgroup.id === field.value
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
