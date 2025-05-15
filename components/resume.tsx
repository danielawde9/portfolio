import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Globe } from "lucide-react"
import Link from "next/link"

export default function Resume() {
  return (
    <main className="min-h-screen bg-white py-10 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-2">DANIEL AWDE</h1>
        <h2 className="font-space-grotesk text-xl md:text-2xl text-gray-600 mb-4">
          Technical Project Manager & Software Engineer
        </h2>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="space-y-1 text-sm">
            <p>Baakline, Al Shouf, Lebanon</p>
            <p>+961 70 979 482</p>
            <p>hello@danielawde9.com</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="https://github.com/danielawde9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/danielawde9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://danielawde9.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary"
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Website</span>
            </Link>
            <Link href="mailto:hello@danielawde9.com" className="text-gray-700 hover:text-primary">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-8">
        <h2 className="font-space-grotesk text-2xl font-bold mb-3 border-b pb-1">PROFESSIONAL SUMMARY</h2>
        <p className="text-gray-700">
          Versatile Technical Project Manager and Software Engineer with proven expertise in web and mobile application
          development, including augmented reality technologies. Adept at bridging technical solutions with strategic
          business objectives to enhance user experiences and drive organizational success. Demonstrated ability to lead
          cross-functional teams, manage stakeholder relationships, and deliver complex projects on time and within
          budget. Committed to leveraging technical expertise and leadership skills to foster innovation and achieve
          impactful results.
        </p>
      </section>

      {/* Core Competencies */}
      <section className="mb-8">
        <h2 className="font-space-grotesk text-2xl font-bold mb-3 border-b pb-1">CORE COMPETENCIES</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Technical Leadership</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Project Management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Team Coordination</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Stakeholder Management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Software Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>AR/VR Technologies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Digital Marketing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>SEO Optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Client Relationship</span>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-8">
        <h2 className="font-space-grotesk text-2xl font-bold mb-3 border-b pb-1">PROFESSIONAL EXPERIENCE</h2>

        {/* Job 1 */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="font-space-grotesk text-xl font-semibold">Technical Project Manager</h3>
              <h4 className="text-gray-600">Lelabo Digital</h4>
            </div>
            <span className="text-gray-500 text-sm mt-1 md:mt-0">Jan 2024 – Present</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              Lead SEO projects for international clients targeting the MENA region, focusing on on-page and off-page
              optimization strategies.
            </li>
            <li>
              Manage the development of complex game web applications, implementing SEO strategies to enhance visibility
              and user engagement.
            </li>
            <li>
              Direct a cross-functional team of developers, designers, and QA specialists, fostering collaboration and
              driving innovation.
            </li>
            <li>
              Serve as the primary point of contact for clients and stakeholders, effectively managing expectations and
              addressing concerns.
            </li>
            <li>Implement project management methodologies to ensure timely delivery and high-quality outcomes.</li>
          </ul>
        </div>

        {/* Job 2 */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="font-space-grotesk text-xl font-semibold">Full Stack Development Trainer</h3>
              <h4 className="text-gray-600">Park Innovation & AUF</h4>
            </div>
            <span className="text-gray-500 text-sm mt-1 md:mt-0">Nov 2022 – Jan 2024</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              Designed and delivered a comprehensive 900-hour training program in full stack development for 20 non-CS
              background students.
            </li>
            <li>
              Conducted a 350-hour training program for CS graduate students, covering various programming languages and
              technologies.
            </li>
            <li>
              Developed curriculum focusing on MERN stack (MongoDB, Express.js, React, Node.js) and modern web
              development practices.
            </li>
            <li>
              Mentored students through complex technical challenges, resulting in high completion rates and job
              placements.
            </li>
          </ul>
        </div>

        {/* Job 3 */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="font-space-grotesk text-xl font-semibold">Technical Consultant & Front-End Developer</h3>
              <h4 className="text-gray-600">Mercy Corps & Saffron Souk</h4>
            </div>
            <span className="text-gray-500 text-sm mt-1 md:mt-0">May 2021 – Oct 2023</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              Provided technical leadership and consultancy services, guiding the launch of new websites and expanding
              online visibility.
            </li>
            <li>
              Developed responsive front-end interfaces for e-commerce platforms, enhancing user experience and
              conversion rates.
            </li>
            <li>
              Implemented digital marketing strategies, including SEO optimization, resulting in increased organic
              traffic.
            </li>
            <li>Led training sessions in digital marketing and web development, mentoring over 60 students.</li>
          </ul>
        </div>

        {/* Job 4 */}
        <div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="font-space-grotesk text-xl font-semibold">Top Rated Freelance Front End Developer</h3>
              <h4 className="text-gray-600">Upwork</h4>
            </div>
            <span className="text-gray-500 text-sm mt-1 md:mt-0">May 2020 – Nov 2023</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              Managed multiple client projects simultaneously, maintaining high standards of quality and client
              satisfaction.
            </li>
            <li>Developed websites utilizing web development best practices and SEO optimization techniques.</li>
            <li>
              Achieved top-rated status for consistently delivering high-quality work and maintaining excellent client
              relationships.
            </li>
            <li>Worked with various technologies including JavaScript, React, Unity, C#, and Firebase.</li>
          </ul>
        </div>
      </section>

      {/* Key Projects */}
      <section className="mb-8">
        <h2 className="font-space-grotesk text-2xl font-bold mb-3 border-b pb-1">KEY PROJECTS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Project 1 */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-space-grotesk text-lg font-semibold mb-1">Mingo App</h3>
              <p className="text-sm text-gray-500 mb-2">Unity Developer | 2018-Present</p>
              <p className="text-gray-700 text-sm mb-2">
                Open-source AR-based educational app inspired by Kahoot, gamifying learning experiences for students and
                teachers.
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="outline" className="text-xs">
                  Unity
                </Badge>
                <Badge variant="outline" className="text-xs">
                  C#
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Firebase
                </Badge>
                <Badge variant="outline" className="text-xs">
                  AR Foundation
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Project 2 */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-space-grotesk text-lg font-semibold mb-1">Echoes Of History</h3>
              <p className="text-sm text-gray-500 mb-2">Unity Developer | Aug 2023-Oct 2023</p>
              <p className="text-gray-700 text-sm mb-2">
                AR application showcasing the Kfarmatta Silk Mill in Lebanon, featuring 3D scanned reconstruction of
                historical and current states.
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="outline" className="text-xs">
                  Unity
                </Badge>
                <Badge variant="outline" className="text-xs">
                  C#
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Firebase
                </Badge>
                <Badge variant="outline" className="text-xs">
                  AR Foundation
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-8">
        <h2 className="font-space-grotesk text-2xl font-bold mb-3 border-b pb-1">TECHNICAL SKILLS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-space-grotesk text-lg font-semibold mb-2">Programming & Development</h3>
            <div className="flex flex-wrap gap-1">
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">JavaScript</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">Kotlin</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">C#</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">ReactJS</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">NodeJS</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">Unity</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">AR Foundation</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">WordPress</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">Shopify</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-space-grotesk text-lg font-semibold mb-2">Project Management & Marketing</h3>
            <div className="flex flex-wrap gap-1">
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">Agile</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">Team Leadership</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">
                Stakeholder Engagement
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">SEO</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">SEM</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">PPC</Badge>
              <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">Google Analytics</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Publications */}
      <section>
        <h2 className="font-space-grotesk text-2xl font-bold mb-3 border-b pb-1">EDUCATION & PUBLICATIONS</h2>

        <div className="mb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <h3 className="font-space-grotesk text-lg font-semibold">
                Communication & Electronics Engineering (BEng)
              </h3>
              <p className="text-gray-600">Beirut Arab University</p>
            </div>
            <span className="text-gray-500 text-sm mt-1 md:mt-0">2013 – 2018</span>
          </div>
          <p className="text-gray-700 mt-1">
            Achieved a strong foundation in both hardware and software engineering principles.
          </p>
        </div>

        <div>
          <h3 className="font-space-grotesk text-lg font-semibold">Compact Dual-Band Lowpass Bandpass Filter</h3>
          <p className="text-gray-600">IEEE Transactions on ICEEE 2020</p>
          <p className="text-gray-700 mt-1">
            Co-authored a research paper published in IEEE, focusing on the design and analysis of a compact dual-band
            lowpass bandpass filter.
          </p>
        </div>
      </section>
    </main>
  )
}
