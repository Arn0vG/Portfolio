import type { Metadata } from "next";
import { projects } from "../../../content/project";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project — Arnav Gupta" };

  return {
    title: `${project.title} — Arnav Gupta`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} — Arnav Gupta`,
      description: project.subtitle,
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
