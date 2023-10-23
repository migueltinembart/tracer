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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/_trpc/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, RefreshCw, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { RouterInput } from "@/app/_trpc/client";
import { Dialog } from "@/components/ui/dialog";

type TenantGroupFormInput =
  RouterInput["entities"]["tenant_groups"]["create"]["one"];

const tenantGroupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  description: z.string().optional(),
});

export default function TenantGroupForm() {
  const { toast } = useToast();
  const context = trpc.useContext();
  const tenantGroupCreator = trpc.entities.tenant_groups.create.one.useMutation(
    {
      onSuccess: (data) => {
        context.entities.tenant_groups.select.all.invalidate();
        return toast({
          title: `Tenant group "${data.name}" created`,
        });
      },
      onError: () => {
        return toast({
          variant: "destructive",
          title: "Something with request went wrong! Trying again...",
        });
      },
    }
  );

  const form = useForm<TenantGroupFormInput>({
    resolver: zodResolver(tenantGroupFormSchema),
    defaultValues: {
      name: "",
      description: undefined,
    },
  });

  function SubmitButton() {
    if (tenantGroupCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <RefreshCw className="animate-spin"></RefreshCw>
        </Button>
      );
    }

    if (tenantGroupCreator.status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (tenantGroupCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    } else {
      return null;
    }
  }

  async function onSubmit(values: z.infer<typeof tenantGroupFormSchema>) {
    tenantGroupCreator.mutate(values);
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
                <FormLabel>Tenant group Name</FormLabel>
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
                  Add a description to the newly created tenant group
                </FormDescription>
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
