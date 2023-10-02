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
import { RefreshCw, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { RouterInput } from "@/app/_trpc/client";
import { FormEvent } from "react";

type SiteGroupFormInput =
  RouterInput["entities"]["siteGroups"]["create"]["one"];

const siteGroupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  description: z.string({ description: "Add a description" }).optional(),
});

export default function SiteGroupForm() {
  // load hooks so they become available from the beginning
  const context = trpc.useContext();
  const { toast } = useToast();
  const siteGroupCreator = trpc.entities.siteGroups.create.one.useMutation({
    onSuccess: (data) => {
      context.entities.siteGroups.select.all.invalidate();
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
      description: undefined,
    },
  });

  function SubmitButton() {
    if (siteGroupCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <RefreshCw className="animate-spin"></RefreshCw>
        </Button>
      );
    }

    if (siteGroupCreator.status === "success") {
      setTimeout(() => {}, 1000);
      return <Button type="submit">Deploy</Button>;
    }

    if (siteGroupCreator.status === "error") {
      return (
        <Button type="submit" className="bg-red-800">
          Deploy
        </Button>
      );
    }

    if (siteGroupCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    }
  }

  async function onSubmit(values: z.infer<typeof siteGroupFormSchema>) {
    siteGroupCreator.mutate(values);

    form.reset();
  }

  return (
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
              <FormLabel>Site group Name</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea {...field}></Textarea>
              </FormControl>
              <FormDescription>
                Add a description to the newly created site
              </FormDescription>
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
  );
}
