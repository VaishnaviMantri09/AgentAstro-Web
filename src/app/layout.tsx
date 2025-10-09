import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import logoIcon from '@/../public/logo.png';

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentAstro - Streamline Medical Device Approvals with AI",
  description: "AgentAstro accelerates regulatory approval for medical devices through AI, ensuring compliance and data security.",
  openGraph: {
    title: "AgentAstro - Streamline Medical Device Approvals with AI",
    description: "AgentAstro accelerates regulatory approval for medical devices through AI, ensuring compliance and data security.",
    type: "website",
    url: "https://www.agentastro.ai/",
    images: [
      {
        url: logoIcon.src,
        width: 1200,
        height: 630,
        alt: "AgentAstro Logo",
      },
    ],
  },
  other: {
    'http-equiv': 'X-UA-Compatible',
    content: 'IE=edge',
  },
  icons: {
    icon: logoIcon.src,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body className={clsx(dmSans.className, "antialiased bg-[#EAEEFE]")}>
        {children}
      </body>
    </html>
  );
}