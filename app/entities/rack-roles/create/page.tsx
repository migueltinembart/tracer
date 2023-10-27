"use client";
import { FormInput } from "@/app/_components/FormFields";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import { SymbolIcon, CheckIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

import type { RouterInput } from "@/app/_trpc/client";
import { capitalize, UnionTuple } from "@/lib/helpers";
import { Dialog } from "@/components/ui/dialog";
import clsx from "clsx";

import { DialogClose } from "@radix-ui/react-dialog";
import { ColorPicker } from "@/components/ui/color-picker";
import { useState } from "react";

type RackRoleInput = RouterInput["entities"]["rack_roles"]["create"]["one"];

const rackRoleFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters" })
    .max(64, { message: "Name cannot be longer than 64 characters" }),
  description: z.string({ description: "Add a description" }).optional(),
  color: z.string(),
});

function generateRandom6DigitHexValue() {
  const min = 0x1000000; // Smallest 6-digit hex value (0x100000)
  const max = 0xfffffff; // Largest 6-digit hex value (0xFFFFFF)

  const randomHexValue = Math.floor(Math.random() * (max - min + 1)) + min;

  // Convert the random number to a hexadecimal string and remove the "0x" prefix
  return randomHexValue.toString(16).toUpperCase().slice(1);
}

export default function RackRoleForm() {
  const [color, setColor] = useState<string>(
    `#${generateRandom6DigitHexValue()}`
  );
  const { toast } = useToast();
  const context = trpc.useContext();
  const rackRoleCreator = trpc.entities.rack_roles.create.one.useMutation({
    onSuccess: (data) => {
      context.entities.rack_roles.select.all.refetch();
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

  const form = useForm<RackRoleInput>({
    resolver: zodResolver(rackRoleFormSchema),
    defaultValues: {
      name: "",
      description: undefined,
      color: color,
    },
  });

  function SubmitButton() {
    if (rackRoleCreator.status === "loading") {
      return (
        <Button type="submit" className="bg-orange-500" disabled>
          Loading <SymbolIcon className="animate-spin"></SymbolIcon>
        </Button>
      );
    }

    if (rackRoleCreator.status === "success") {
      return <Button type="submit">Deploy</Button>;
    }

    if (rackRoleCreator.status === "idle") {
      return <Button type="submit">Deploy</Button>;
    }
  }

  async function onSubmit(values: z.infer<typeof rackRoleFormSchema>) {
    rackRoleCreator.mutate(values);
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
        Rack role
      </p>
      <p className={clsx(["text-sm", "text-muted-foreground"])}>
        Create a rack role
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
                label="Give this role a name"
                description="describe the role"
              />
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormInput
                field={field}
                label="Describe the "
                description="describe the role"
              />
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <p>
                    <ColorPicker
                      background={color}
                      setBackground={(value) => {
                        setColor(value);
                        form.setValue("color", value);
                      }}
                    />
                  </p>
                </FormControl>

                <FormDescription>
                  Pick a color, This will then be used in the graphical view of
                  a rack associated with rhis role
                </FormDescription>
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
