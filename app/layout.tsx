import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md Imran Hossen | Software Engineer",
  description: "Portfolio, projects, and writing of Md Imran Hossen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app-body">{children}</body>
    </html>
  );
}
