import clsx from "clsx";
import { ReactNode } from "react";
import { sharedPadding } from "./Shared";

const mainClass = clsx([
  sharedPadding,
  "flex flex-1 flex-col items-center p-6",
]);

export default function Main({ children }: { children?: ReactNode }) {
  return <main className={mainClass}>{children}</main>;
}
