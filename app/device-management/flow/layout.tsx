import { ReactNode } from "react";
import Main from "@/app/_components/main";

export default function EntitiesLayout({children}: {children: ReactNode}) {
  return (
    <Main padding={false}>{children}</Main>
  )
}