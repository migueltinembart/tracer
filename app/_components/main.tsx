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
    "flex flex-col p-6" ,
    padding ? sharedPadding : "px-0",
    padding ? "flex-1" : "h-[94vh]"
  ]);

  return <main className={mainClass}>{children}</main>;
}
