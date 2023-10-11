import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import Provider from "./_trpc/Provider";
import clsx from "clsx";
import NavBar from "./_components/nav-bar";

import Main from "./_components/Main";
import { getServerSession } from "next-auth";
import SessionProvider from "@/app/_components/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const bodyClassName = clsx([inter.className, "min-h-screen"]);

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
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar></NavBar>

              <Main padding={false}>{children}</Main>
              <Toaster></Toaster>
            </ThemeProvider>
          </SessionProvider>
        </body>
      </Provider>
    </html>
  );
}
