import type { Metadata } from "next";
import type { ReactNode } from "react";
import { questrial } from "./fonts";
import StyledComponentsRegistry from "./registry";
import Header from "../components/Header";
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
        <header></header>
        <main>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </main>
        <footer style={{ display: 'flex', width: "800px", margin: "auto", columnGap: '30px', marginTop: '30px', marginBottom: '30px'}}>
          <Image
            src={"/icons/globalGoals.svg"}
            alt=""
            width="0"
            height="0"
            style={{ width: "auto", height: "40px" }}
          />
          <Image
            src={"/icons/pri.svg"}
            alt=""
            width="0"
            height="0"
            style={{ width: "auto", height: "40px" }}
          />
        </footer>
      </body>
    </html>
  );
}
