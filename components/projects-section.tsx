"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import { gsap } from "gsap"
import { createScrollTrigger } from "@/utils/animations"

export default function ProjectsSection({ forwardedRef }: { forwardedRef: React.RefObject<HTMLElement> }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      const headingAnim = gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
      createScrollTrigger(headingRef.current, headingAnim)
    }

    // Description animation
    if (descriptionRef.current) {
      const descAnim = gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
      createScrollTrigger(descriptionRef.current, descAnim)
    }

    // Projects animation
    if (projectsRef.current) {
      const projects = projectsRef.current.querySelectorAll(".project-card")
      projects.forEach((project, index) => {
        const projectAnim = gsap.fromTo(
          project,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.2 * index,
          },
        )
        createScrollTrigger(project, projectAnim)
      })
    }
  }, [])

  return (
    <section ref={forwardedRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 ref={headingRef} className="text-4xl font-bold mb-4 inline-block border-b-4 border-lime-400 pb-2">
            FEATURED PROJECTS
          </h2>
          <p ref={descriptionRef} className="max-w-3xl mx-auto mt-6 text-gray-300">
            A selection of projects I've developed and led throughout my career.
          </p>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full project-card">
            <div className="aspect-video relative">
              <Image src="/placeholder.svg?height=400&width=600" alt="Mingo App" fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Mingo App</h3>
              <p className="text-gray-400 mb-4">
                An open-source AR-based educational app inspired by Kahoot, gamifying learning experiences for students
                and teachers. Published on Google Play Store.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  Unity
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  C#
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  Firebase
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  AR Foundation
                </Badge>
              </div>
              <div className="flex justify-between">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.danielawde9.mingo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-400 hover:text-lime-300 flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-1" /> Demo
                </Link>
                <Link
                  href="https://github.com/danielawde9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-400 hover:text-lime-300 flex items-center"
                >
                  <Github className="w-4 h-4 mr-1" /> Code
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full project-card">
            <div className="aspect-video relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Echoes Of History"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Echoes Of History</h3>
              <p className="text-gray-400 mb-4">
                Augmented Reality (AR) application to showcase the Kfarmatta Silk Mill in Lebanon, featuring a 3D
                scanned reconstruction of the site's historical and current states.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  Unity
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  C#
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  Firebase
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  AR Foundation
                </Badge>
              </div>
              <div className="flex justify-between">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.danielawde9.echoesofhistory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-400 hover:text-lime-300 flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-1" /> Demo
                </Link>
                <Link
                  href="https://github.com/danielawde9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-400 hover:text-lime-300 flex items-center"
                >
                  <Github className="w-4 h-4 mr-1" /> Code
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full project-card">
            <div className="aspect-video relative">
              <Image src="/placeholder.svg?height=400&width=600" alt="SEO Projects" fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">SEO Projects for MENA Clients</h3>
              <p className="text-gray-400 mb-4">
                Undertook SEO projects for international clients targeting the MENA region, focusing on on-page and
                off-page SEO using content, trending topics, and localization.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  SEO
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  Content Strategy
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  WordPress
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  Google Analytics
                </Badge>
              </div>
              <div className="flex justify-between">
                <Link href="#" className="text-lime-400 hover:text-lime-300 flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" /> Case Study
                </Link>
                <span className="text-gray-500">Private Project</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
