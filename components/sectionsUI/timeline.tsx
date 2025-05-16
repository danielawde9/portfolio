"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  periodColor?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [stickyTitles, setStickyTitles] = useState<boolean[]>([]);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    // Initialize sticky state array
    setStickyTitles(new Array(data.length).fill(false));

    // Create intersection observers for each title
    const observers = data.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setStickyTitles((prev) => {
            const newState = [...prev];
            newState[index] = !entry.isIntersecting;
            return newState;
          });
        },
        {
          threshold: 1,
          rootMargin: "-40px 0px 0px 0px", // Matches the top-40 class
        }
      );
      return observer;
    });

    // Observe title elements
    const titleElements = document.querySelectorAll(".timeline-title");
    titleElements.forEach((element, index) => {
      observers[index].observe(element);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent dark:bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          // Use periodColor if provided, otherwise fallback to a default color
          const ballColor = item.periodColor || "#84cc16"; // lime-500 as default
          return (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              {/* Ball and title in the same sticky flex row, both scroll and stick together */}
              <div className="sticky top-40 flex flex-col md:flex-row z-40 items-center max-w-xs lg:max-w-sm md:w-full gap-4 self-start">
                <div
                  className="p-2 rounded-full flex items-center justify-center animate-pulse"
                  style={{ backgroundColor: ballColor }}
                >
                  <div
                    className="h-4 w-4 rounded-full bg-white border-2 p-2"
                    style={{ borderColor: ballColor }}
                  />
                </div>
                <h3
                  className={`timeline-title hidden md:block text-xl md:pl-6 md:text-5xl font-bold transition-colors duration-300 ${
                    stickyTitles[index]
                      ? "text-white"
                      : "text-neutral-500 dark:text-neutral-500"
                  }`}
                  style={{
                    color: item.periodColor || undefined,
                    fontWeight:
                      item.periodColor && item.periodColor !== "#A0AEC0"
                        ? 700
                        : 500,
                  }}
                >
                  {item.title}
                </h3>
              </div>
              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3
                  className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500"
                  style={{
                    color: item.periodColor || undefined,
                    fontWeight:
                      item.periodColor && item.periodColor !== "#A0AEC0"
                        ? 700
                        : 500,
                  }}
                >
                  {item.title}
                </h3>
                {item.content}{" "}
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-4 left-8 top-0 overflow-hidden w-[4px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[4px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
