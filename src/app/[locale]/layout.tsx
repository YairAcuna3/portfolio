import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yair Acuña - Portfolio",
  description: "TODO",
  icons: {
    icon: "/favicon.ico",
  }
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${mulish.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}