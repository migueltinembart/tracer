import clsx from "clsx";
import { ReactNode } from "react";
import { sharedPadding } from "./shared";

export default function Main({
  children,
  padding = true,
}: {
  children?: ReactNode;
  padding?: boolean;
}) {
  const mainClass = clsx([
    "flex flex-1 flex-col p-6",
    padding ? sharedPadding : "px-0",
  ]);

  return <main className={mainClass}>{children}</main>;
}
