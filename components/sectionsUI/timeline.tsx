"use client";

import type React from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  periodColor?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  return (
    <div className="">
      {/* Mobile/Tablet Layout */}
      <div className="block lg:hidden px-0 py-8">
        <div className="space-y-6">
          {data.map((item, index) => {
            const ballColor = item.periodColor || "#84cc16";

            return (
              <div key={index} className="w-full">
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full transition-all duration-300">
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-4"
                    style={{ color: ballColor }}
                  >
                    {item.title}
                  </h3>
                  <div className="">
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block w-full px-8 py-12">
        <div className="space-y-8">
          {data.map((item, index) => {
            const ballColor = item.periodColor || "#84cc16";

            return (
              <div key={index} className="w-full">
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full transition-all duration-300">
                  <h3
                    className="text-2xl xl:text-3xl font-bold mb-4 xl:mb-6"
                    style={{ color: ballColor }}
                  >
                    {item.title}
                  </h3>
                  <div className="text-gray-600 dark:text-gray-300 text-base xl:text-lg leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
