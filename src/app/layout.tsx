import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "ShopHub - Your Ultimate Shopping Companion",
  description: "ShopHub is your ultimate shopping companion, offering a seamless and personalized shopping experience. Discover a wide range of products, manage your favorites, and explore categories with ease. Shop smarter and faster with ShopHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={roboto.className}>{children}</body>

    </html>
  );
}
