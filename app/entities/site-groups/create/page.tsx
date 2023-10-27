"use client";
import { FormInput, FormTextarea } from "@/app/_components/FormFields";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import type { RouterInput } from "@/app/_trpc/client";
import { Dialog } from "@/components/ui/dialog";
import clsx from "clsx";
import { DialogClose } from "@radix-ui/react-dialog";

type SiteGroupFormInput =
  RouterInput["entities"]["site_groups"]["create"]["one"];

const siteGroupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  description: z.string({ description: "Add a description" }).optional(),
});

export default function SiteGroupForm() {
  const { toast } = useToast();
  const context = trpc.useContext();
  const siteGroupCreator = trpc.entities.site_groups.create.one.useMutation({
    onSuccess: (data) => {
      context.entities.site_groups.select.all.refetch();
      return toast({
        title: `Site Group "${data.name}" created`,
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
      description: undefined,
    },
  });

  function SubmitButton() {
    if (siteGroupCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <SymbolIcon className="animate-spin"></SymbolIcon>
        </Button>
      );
    }

    if (siteGroupCreator.status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (siteGroupCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    }
  }

  async function onSubmit(values: z.infer<typeof siteGroupFormSchema>) {
    siteGroupCreator.mutate(values);
    form.reset();
    <DialogClose />;
  }

  return (
    <Dialog>
      <p
        className={clsx([
          "text-lg",
          "font-semibold",
          "leading-none",
          "tracking-tight",
        ])}
      >
        Site Group
      </p>
      <p className={clsx(["text-sm", "text-muted-foreground"])}>
        Create a Site Group
      </p>
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
              <FormInput
                field={field}
                label="Site group name"
                description="Give the site group a name"
              />
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormTextarea
                field={field}
                description="Describe the Site group"
                label="Description"
              />
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
