"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Globe, ArrowLeft, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Resume() {
  return (
    <main className="bg-white py-8 px-6 max-w-[850px] mx-auto print:p-6 print:max-w-full">
      <div className="mb-4 print:hidden flex justify-between">
        <Link href="/" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
        </Link>
        <Button onClick={() => window.print()} variant="outline" size="sm" className="flex items-center gap-1">
          <Printer className="h-4 w-4" /> Print Resume
        </Button>
      </div>

      {/* Header Section */}
      <header className="mb-4 flex flex-col md:flex-row justify-between items-start">
        <div>
          <h1 className="font-space-grotesk text-3xl font-bold">DANIEL AWDE</h1>
          <h2 className="font-space-grotesk text-lg text-gray-600">Technical Project Manager & Software Engineer</h2>
        </div>
        <div className="mt-2 md:mt-0 text-sm text-right">
          <p>Baakline, Lebanon | +961 70 979 482</p>
          <p>hello@danielawde9.com</p>
          <div className="flex gap-2 mt-1 justify-end">
            <Link
              href="https://github.com/danielawde9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://linkedin.com/in/danielawde9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link href="https://danielawde9.com" target="_blank" rel="noopener noreferrer" className="text-gray-700">
              <Globe className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-3">
        <h2 className="font-space-grotesk text-lg font-bold mb-1 border-b pb-1">PROFESSIONAL SUMMARY</h2>
        <p className="text-sm text-gray-700">
          Technical Project Manager and Software Engineer with expertise in web, mobile, and AR development. Skilled in
          leading cross-functional teams, managing stakeholder relationships, and delivering complex projects. Combines
          technical solutions with strategic business objectives to enhance user experiences and drive organizational
          success.
        </p>
      </section>

      {/* Professional Experience */}
      <section className="mb-3">
        <h2 className="font-space-grotesk text-lg font-bold mb-1 border-b pb-1">PROFESSIONAL EXPERIENCE</h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 mb-2">
          <div>
            <p className="font-semibold text-sm">Technical Project Manager</p>
            <p className="text-xs text-gray-600">Lelabo Digital</p>
            <p className="text-xs text-gray-500">Jan 2024 – Present</p>
          </div>
          <ul className="list-disc pl-4 text-xs space-y-0.5 text-gray-700">
            <li>Lead SEO projects for international clients targeting the MENA region</li>
            <li>Manage cross-functional teams of developers, designers, and QA specialists</li>
            <li>Serve as primary point of contact for clients and stakeholders</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 mb-2">
          <div>
            <p className="font-semibold text-sm">Full Stack Development Trainer</p>
            <p className="text-xs text-gray-600">Park Innovation & AUF</p>
            <p className="text-xs text-gray-500">Nov 2022 – Jan 2024</p>
          </div>
          <ul className="list-disc pl-4 text-xs space-y-0.5 text-gray-700">
            <li>Delivered 900-hour training program for 20 non-CS background students</li>
            <li>Conducted 350-hour training for CS graduates on MERN stack</li>
            <li>Mentored students through complex technical challenges</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 mb-2">
          <div>
            <p className="font-semibold text-sm">Technical Consultant</p>
            <p className="text-xs text-gray-600">Mercy Corps</p>
            <p className="text-xs text-gray-500">Feb 2023 – Oct 2023</p>
          </div>
          <ul className="list-disc pl-4 text-xs space-y-0.5 text-gray-700">
            <li>Provided technical leadership for website launch and online visibility expansion</li>
            <li>Implemented digital marketing strategies to increase organic traffic</li>
            <li>Led training sessions in digital marketing and web development</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1">
          <div>
            <p className="font-semibold text-sm">Front-End Developer</p>
            <p className="text-xs text-gray-600">Saffron Souk</p>
            <p className="text-xs text-gray-500">Jun 2021 – Feb 2023</p>
          </div>
          <ul className="list-disc pl-4 text-xs space-y-0.5 text-gray-700">
            <li>Developed responsive front-end interfaces for e-commerce platform</li>
            <li>Implemented SEO strategies to increase user engagement and conversion rates</li>
            <li>Optimized website performance and user experience</li>
          </ul>
        </div>
      </section>

      {/* Key Projects */}
      <section className="mb-3">
        <h2 className="font-space-grotesk text-lg font-bold mb-1 border-b pb-1">KEY PROJECTS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="font-semibold text-sm">Mingo App | Unity Developer</p>
            <p className="text-xs text-gray-500">2018-Present</p>
            <p className="text-xs text-gray-700 mb-1">
              Open-source AR-based educational app inspired by Kahoot, gamifying learning experiences.
            </p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                Unity
              </Badge>
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                C#
              </Badge>
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                Firebase
              </Badge>
            </div>
          </div>

          <div>
            <p className="font-semibold text-sm">Echoes Of History | Unity Developer</p>
            <p className="text-xs text-gray-500">Aug 2023-Oct 2023</p>
            <p className="text-xs text-gray-700 mb-1">
              AR application showcasing the Kfarmatta Silk Mill with 3D scanned reconstruction.
            </p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                Unity
              </Badge>
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                AR Foundation
              </Badge>
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                C#
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-3">
        <h2 className="font-space-grotesk text-lg font-bold mb-1 border-b pb-1">TECHNICAL SKILLS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <h3 className="font-space-grotesk text-sm font-semibold mb-1">Programming & Development</h3>
            <div className="flex flex-wrap gap-1">
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">JavaScript</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">React</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">Node.js</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">C#</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">Unity</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">AR Foundation</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">WordPress</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">MongoDB</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-space-grotesk text-sm font-semibold mb-1">Project Management & Marketing</h3>
            <div className="flex flex-wrap gap-1">
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">Agile</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">Team Leadership</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">Stakeholder Management</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">SEO</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">Google Analytics</Badge>
              <Badge className="bg-primary/10 text-primary text-xs px-1.5 py-0">Digital Marketing</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Publications */}
      <section>
        <h2 className="font-space-grotesk text-lg font-bold mb-1 border-b pb-1">EDUCATION & PUBLICATIONS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="font-semibold text-sm">Communication & Electronics Engineering (BEng)</p>
            <p className="text-xs text-gray-600">Beirut Arab University | 2013 – 2018</p>
            <p className="text-xs text-gray-700">Strong foundation in hardware and software engineering principles.</p>
          </div>

          <div>
            <p className="font-semibold text-sm">Compact Dual-Band Lowpass Bandpass Filter</p>
            <p className="text-xs text-gray-600">IEEE Transactions on ICEEE 2020</p>
            <p className="text-xs text-gray-700">
              Co-authored research paper on design and analysis of compact dual-band filter.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
