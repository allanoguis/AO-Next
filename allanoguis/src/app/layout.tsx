import type { Metadata } from "next";
import "./globals.css";
import SideBar from "@/components/navbar/sideNav";
import HeaderMobile from "@/components/navbar/mobileNav";
import HeaderMain from "@/components/navbar/topNav";
import { ThemeProvider } from "next-themes";

const year = new Date(Date.now()).getFullYear();

export const metadata: Metadata = {
  title: `madtoken © ${year}`,
  description: "Allan Oguis: Web Developer and SEO in the Philippines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <HeaderMain />
          <HeaderMobile />
          <main className="flex w-screen">
            <SideBar />
            <section className="flex-1 bg-background">{children}</section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
