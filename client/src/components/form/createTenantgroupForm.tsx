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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/form/Dialog";
import { AppRouter } from "@server/utils/trpc/routers";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

type TenantGroupInput = RouterInput["tenantGroups"]["insertOne"];
type TenantGroupOutput = RouterOutput["tenantGroups"]["getOneById"];

const tenantGroupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  comment: z.string({ description: "Add a comment" }).optional(),
});

export function TenantGroupForm() {
  const form = useForm<TenantGroupInput>({
    resolver: zodResolver(tenantGroupFormSchema),
    defaultValues: {
      name: "",
      comment: undefined,
    },
  });

  const { toast } = useToast();

  const { mutate: mutate, status: status } =
    trpc.tenantGroups.insertOne.useMutation({
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

  function SubmitButton(props: {
    status: "idle" | "success" | "error" | "loading";
  }) {
    if (status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <RefreshCw className="animate-spin"></RefreshCw>
        </Button>
      );
    }

    if (status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (status === "idle") {
      return <Button type="submit">Deploy</Button>;
    }
  }

  async function onSubmit(values: z.infer<typeof tenantGroupFormSchema>) {
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

        <div className="flex pt-3 justify-end w-full">
          <SubmitButton status={status}></SubmitButton>
        </div>
      </form>
    </Form>
  );
}
