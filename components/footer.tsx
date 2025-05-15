import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white">
              © {new Date().getFullYear()} Daniel Awde. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/danielawde9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-lime-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/danielawde9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-lime-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:hello@danielawde9.com"
              className="text-gray-400 hover:text-lime-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
