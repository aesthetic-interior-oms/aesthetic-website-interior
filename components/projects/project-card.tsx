"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    category: string
    location: string
    image: string
    description: string
  }
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl cursor-pointer",
        "transform transition-all duration-500",
        index % 3 === 1 ? "md:translate-y-8" : "",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={`${project.title} in ${project.location}`}
          width={800}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100",
          )}
        />
      </div>

      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-[#0d3d3d] via-[#0d3d3d]/50 to-transparent",
          "transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Content */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-6 transform transition-all duration-500",
          isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <span className="text-[#a57c00] text-xs uppercase tracking-widest font-medium">{project.category}</span>
        <h3 className="text-xl font-serif font-light text-white mt-2">{project.title}</h3>
        <p className="text-white/70 text-sm mt-1">{project.location}</p>
        <p className="text-white/60 text-sm mt-3 line-clamp-2">{project.description}</p>
      </div>

      {/* Always visible bottom bar */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent",
          "transition-opacity duration-500",
          isHovered ? "opacity-0" : "opacity-100",
        )}
      >
        <h3 className="text-lg font-serif font-light text-white">{project.title}</h3>
        <span className="text-[#a57c00] text-xs uppercase tracking-wider">{project.category}</span>
      </div>
    </div>
  )
}
