import type { Metadata } from "next";
import "./globals.css";
import SideNav from "@/components/navbar/sideNav";
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
          <SideNav />
          <main className="flex-1 md:pl-60 mt-4 ml-8 bg-background">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
