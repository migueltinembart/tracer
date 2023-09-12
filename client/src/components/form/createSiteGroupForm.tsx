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
import { trpc } from "@/trpc";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, X } from "lucide-react";
import { useToast } from "../ui/use-toast";
import type { RouterInput } from "@/trpc";
import { FormEvent } from "react";

type SiteGroupFormInput = RouterInput["siteGroups"]["create"]["one"];

const siteGroupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  comment: z.string({ description: "Add a comment" }).optional(),
});

export function SiteGroupForm() {
  const siteGroupCreator = trpc.siteGroups.create.one.useMutation({
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

  const form = useForm<SiteGroupFormInput>({
    resolver: zodResolver(siteGroupFormSchema),
    defaultValues: {
      name: "",
      comment: undefined,
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
      return <Button type="submit">Deploy</Button>;
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
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea {...field}></Textarea>
              </FormControl>
              <FormDescription>
                Add a comment to the newly created site
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
