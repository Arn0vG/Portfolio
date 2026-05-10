import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arnav Gupta — Hardware & Embedded Systems",
  description:
    "Portfolio of Arnav Gupta — Hardware Design Engineering Intern at Geoanalysis Engineering, Mechatronics & Robotics Engineering student at the University of Alberta. PCB design, embedded systems, and high-speed electronics.",
  openGraph: {
    title: "Arnav Gupta — Hardware & Embedded Systems",
    description:
      "Hardware Design Engineering Intern at Geoanalysis Engineering. PCB design, embedded systems, UAARG, ARVP.",
    url: "https://arnav-gupta.vercel.app",
    siteName: "Arnav Gupta",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Arnav Gupta — Hardware & Embedded Systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arnav Gupta — Hardware & Embedded Systems",
    description:
      "Hardware Design Engineering Intern at Geoanalysis Engineering. PCB design, embedded systems, UAARG, ARVP.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
