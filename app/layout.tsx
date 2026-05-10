import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arnav Gupta — Hardware & Embedded Systems",
  description:
    "Portfolio of Arnav Gupta, Mechatronics & Robotics Engineering student at the University of Alberta. Specializing in PCB design, embedded systems, and high-speed electronics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

