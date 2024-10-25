import type { Metadata } from "next";
import "./globals.css";
import SideNav from "../components/navbar/SideNav";
import HeaderMobile from "../components/navbar/HeaderMobile";
import WrapperMain from "../components/navbar/pageWrapper";
import HeaderMain from "../components/navbar/HeaderMain";

const currentDate = new Date();
const year = currentDate.getFullYear();

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
      <body className="light">
        <HeaderMain />
        <HeaderMobile />
        <div className="flex">
          <SideNav />
          <main className="flex-1">
            <WrapperMain>{children}</WrapperMain>
          </main>
        </div>
      </body>
    </html>
  );
}
