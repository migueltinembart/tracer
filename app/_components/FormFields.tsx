"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { ControllerRenderProps, FieldValues, FieldPath } from "react-hook-form";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
import { capitalize } from "@/lib/helpers";

/**
 * this function returns a formfield which returns an Input
 */
export function FormInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  label,
  description,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
  description: string;
}) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder="Contoso" {...field} />
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}

export function FormTextarea<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  label,
  description,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
  description: string;
}) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea {...field}></Textarea>
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}

export function FormCommandWrapper<
  T extends Array<T>,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  label,
  description,
  buttonValue,
  children,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
  description: string;
  buttonValue?: string;
  children: ReactNode;
}) {
  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={clsx(
                "w-full justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {buttonValue}
              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="center" side="bottom">
          {children}
        </PopoverContent>
      </Popover>

      <FormMessage />
      <FormDescription>{description}</FormDescription>
    </FormItem>
  );
}

/**
 *
 * @param label
 * @param description
 * @param modalButton
 * @returns CommandDialog with CommandGroup
 * You should later map throug CommandItems an pass in an onSelect handller like this
 * () => form.setValue("FormFieldName", correspondingIdValue)
 */
export function FormCommand({
  children,
  modalButton,
}: {
  children: ReactNode;
  modalButton?: {
    variant:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | null
      | undefined;
    formComponent: any;
  };
}) {
  return (
    <Command className="w-full">
      <CommandInput placeholder="search" className="pt-1 h-9" />
      <ScrollArea className="max-h-40">
        <CommandEmpty>
          <DialogTrigger asChild>
            <Button variant={modalButton?.variant}>Create</Button>
          </DialogTrigger>
          <DialogContent>{modalButton?.formComponent}</DialogContent>
        </CommandEmpty>
        <CommandGroup>{children}</CommandGroup>
      </ScrollArea>
    </Command>
  );
}

export function FormSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  label,
  description,
  children,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue
              className={"capitalize"}
              placeholder={capitalize(field.value)}
            />
          </SelectTrigger>

          <SelectContent>
            <ScrollArea className="h-60">{children}</ScrollArea>
          </SelectContent>
        </Select>
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
