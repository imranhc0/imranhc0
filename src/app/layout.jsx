import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Md Imran Hossen | Software Engineer",
  description:
    "Frontend Engineer Skilled in ReactJS, NextJS, Redux, TailwindCSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
