import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/website/seo/json-ld"
import { siteName } from "@/lib/site"
import { getProjectBySlug } from "@/lib/website-projects"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested interior design project could not be found.",
    }
  }

  const title = `${project.title} | ${siteName}`
  const description =
    project.description?.slice(0, 160) ||
    `${project.title} - Modern contemporary interior design project in ${project.location ?? "Dhaka, Bangladesh"} by ${siteName}.`

  const ogImages = project.bannerImage
    ? [
        {
          url: project.bannerImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ]
    : undefined

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
      type: "article",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.bannerImage ? [project.bannerImage] : undefined,
    },
  }
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white pt-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${slug}` },
        ]}
      />
      <ProjectJsonLd project={project} />

      <section className="relative h-[45vh] md:h-[60vh] overflow-hidden">
        <Image
          src={project.bannerImage}
          alt={`${project.title} banner image`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 pb-10 md:pb-14 text-white">
            <p className="text-[#d8b251] uppercase tracking-widest text-xs mb-2">Project Details</p>
            <h1 className="text-3xl md:text-5xl font-serif">{project.title}</h1>
            {project.ownerName && <p className="mt-2 text-white/85">Owner: {project.ownerName}</p>}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-gray-500">Project Type</p>
              <p className="font-medium">{project.type ?? "Interior Design"}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-gray-500">Area</p>
              <p className="font-medium">{project.sqft ? `${project.sqft} sqft` : "Custom scope"}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{project.duration ?? "Consultation based"}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{project.location ?? "Bangladesh"}</p>
            </div>
          </div>

          <p className="text-[#0d3d3d]/80 mb-4 max-w-3xl">{project.description}</p>
          {project.details && (
            <p className="text-[#0d3d3d]/70 mb-8 max-w-3xl whitespace-pre-line">{project.details}</p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {project.images.map((image, index) => (
              <div key={image} className="overflow-hidden rounded-xl border">
                <Image
                  src={image}
                  alt={`${project.title} image ${index + 1}`}
                  width={1400}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
