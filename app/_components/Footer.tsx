import clsx from "clsx";
import { Github } from "lucide-react";
import { sharedPadding } from "./Shared";
import { Button } from "@/components/ui/button";

const footerClass = clsx([
  "border-t h-10 flex items-center justify-between text-sm ",
  sharedPadding,
]);

function GitHubLink() {
  return (
    <Button variant={"ghost"}>
      <Github
        size={20}
        strokeWidth={1.25}
        absoluteStrokeWidth
        overflow={"hidden"}
      />
    </Button>
  );
}

export default function Footer() {
  return (
    <footer className={footerClass}>
      <div className="">Tracer</div>
      <div className="">footer mid</div>
      <GitHubLink />
    </footer>
  );
}
