import clsx from "clsx";
import { ReactNode } from "react";
import { sharedPadding } from "./Shared";

const mainClass = clsx([
  "flex flex-1 flex-col p-6",
  sharedPadding,
]);

export default function Main({ children }: { children?: ReactNode }) {
  return <main className={mainClass}>{children}</main>;
}
