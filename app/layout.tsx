import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import Provider from "./_trpc/Provider";
import clsx from "clsx";
import NavBar from "./_components/NavBar";
import { NavMenuLarge } from "./_components/NavMenus";
import Main from "./_components/Main";
import { getServerSession } from "next-auth";
import SessionProvider from "@/app/_components/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const bodyClassName = clsx([
  inter.className,
  "flex",
  "flex-col",
  "min-h-screen",
]);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <html lang="en">
      <Provider>
        <body className={bodyClassName}>
          <SessionProvider session={session}>
            <NavBar>
              <NavMenuLarge></NavMenuLarge>
            </NavBar>

            <Main>{children}</Main>
          </SessionProvider>
        </body>
      </Provider>
    </html>
  );
}
