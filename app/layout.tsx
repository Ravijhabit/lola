import "bootstrap/dist/css/bootstrap.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import NavBar from "./NavBar";
import Providers from "./Providers";
import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOLA - Trade, Buy, Sell",
  description:
    "LOLA is a platform for trading, buying, and selling items. It is a place where you can find anything you need.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="font-sans">
      <Providers session={session}>
        <body>
          <NavBar />

          {children}
        </body>
      </Providers>
    </html>
  );
}
