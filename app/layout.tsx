import type { Metadata } from "next";
import type { ReactNode } from "react";
import { questrial } from "./fonts";
import StyledComponentsRegistry from "./registry";
import "../styles/globals.css";
import Image from "next/image";
interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: "Impact Calculator",
    template: "%s | Impact Calculator",
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${questrial.variable}`}>
      <body>
        <header>
          <link rel="shortcut icon" href="#" />
        </header>
        <main>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </main>
        <footer className="footer">
          <Image
            src={"/icons/globalGoals.svg"}
            alt=""
            width="0"
            height="0"
            className="footerLogo"
          />
          <Image
            src={"/icons/pri.svg"}
            alt=""
            width="0"
            height="0"
            className="footerLogo"
          />
        </footer>
      </body>
    </html>
  );
}
