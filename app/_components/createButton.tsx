import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function CreateButton(props: {
  goToElement: any;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  title: string;
}) {
  return (
    <>
      <DialogTrigger asChild>
        <Button variant={props.variant}>{props.title}</Button>
      </DialogTrigger>
      <DialogContent>
        {props.goToElement}
      </DialogContent>
    </>
  );
}
