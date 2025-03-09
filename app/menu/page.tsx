"use client"; 
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaAngleDoubleDown } from "react-icons/fa";

// Menu items data
const menuItems = [
  {
    src: "/menu/CEK SKOR.svg",
    alt: "Cek Skor",
    buttonText: "Find Out",
    buttonColor: "bg-[#F4EBA7]",
    outlineColor: "border-[#B47C57]",
  },
  {
    src: "/menu/REDY SET QUIZ.svg",
    alt: "Ready Set Quiz",
    buttonText: "Take a Quiz",
    buttonColor: "bg-[#C0E9EF]",
    outlineColor: "border-[#90AFF7]",
  },
  {
    src: "/menu/REV.svg",
    alt: "Rev",
    buttonText: "Review & Master",
    buttonColor: "bg-[#DCFFA4]",
    outlineColor: "border-[#A7F386]",
  },
];

// Feature details data
const featureDetails = [
  {
    title: "Dive Into Review!",
    subtitle: [
      "The 'Dive Into Review' function allows users to quickly check the correct answers after completing a quiz. Unlike detailed feedback or explanations, this feature simply reveals the right answers without any additional context.",
      "Key Features:",
    ],
    keyFeatures: [
      "Instant Answer Reveal — See which answers were correct",
      "No Explanations — Only the correct choices are displayed",
      "Quick & Simple — Ideal for users who just want to verify answers without deep analysis",
    ],
    conclusion:
      "This function is great for fast review, but for deeper learning, users might need a more detailed explanation-based review mode.",
    buttonText: "Review & Master",
    buttonColor: "bg-[#DCFFA4]",
    outlineColor: "border-[#A7F386]",
    featureId: "dive-into-review",
    navText: "Dive Into Review!",
  },
  {
    title: "Ready, Set, Quiz!",
    subtitle: [
      "The 'Ready, Set, Quiz!' function takes users straight into a collection of fully published quizzes, all of which are multiple-choice. It's designed for quick, straightforward gameplay where users can test their knowledge and get instant results.",
      "Key Features:",
    ],
    keyFeatures: [
      "Fully Published Quizzes — Only completed and ready-to-play quizzes are available",
      "Multiple-Choice Only — No written responses, just quick selections",
      "Instant Feedback — See immediately if your answers are correct or incorrect",
      "Fast & Fun — Jump right in without any setup or waiting",
    ],
    conclusion: "Perfect for users who want a smooth, no-hassle quiz experience",
    buttonText: "Take a Quiz",
    buttonColor: "bg-[#C0E9EF]",
    outlineColor: "border-[#90AFF7]",
    featureId: "ready-set-quiz",
    navText: "Ready, Set, Quiz!",
  },
  {
    title: "Check your scores!",
    subtitle: [
      "The 'Check Your Scores!' function allows users to quickly view their quiz results. It provides a simple way to see their final score without any breakdowns or answer reviews.",
      "Key Features:",
    ],
    keyFeatures: [
      "Real-Time Score Display — See your total score immediately",
      "No Answer Review — Only shows the final result, not which answers were right or wrong",
      "Quick & Simple — Ideal for users who just want to check their performance at a glance",
    ],
    conclusion:
      "This function is perfect for those who want a fast way to track their progress without diving into details.",
    buttonText: "Find Out",
    buttonColor: "bg-[#F4EBA7]",
    outlineColor: "border-[#B47C57]",
    featureId: "check-scores",
    navText: "Check Your Scores!",
  },
];

// Main component
const Menu: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  // Handle slide left or right
  const handleSlide = (direction: "left" | "right") => {
    setActiveIndex((prev) =>
      direction === "left"
        ? prev > 0
          ? prev - 1
          : menuItems.length - 1
        : prev < menuItems.length - 1
        ? prev + 1
        : 0
    );
  };

  // Scroll to the next section
  const handleScrollDown = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Section 1: Coverflow Menu (Swiper) */}
      <section className="relative w-full h-screen flex items-center justify-center bg-[#ffeceff5]">
        <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {menuItems.map((item, index) => {
              const totalItems = menuItems.length;
              const relativePosition = (index - activeIndex + totalItems) % totalItems;

              let xPosition = 0,
                scale = 1,
                zIndex = 1,
                rotateY = 0;

              if (relativePosition === 0) {
                xPosition = 0;
                scale = 1.2;
                zIndex = 10;
                rotateY = 0;
              } else if (relativePosition === 1) {
                xPosition = 250;
                scale = 0.8;
                zIndex = 5;
                rotateY = -30;
              } else if (relativePosition === totalItems - 1) {
                xPosition = -250;
                scale = 0.8;
                zIndex = 5;
                rotateY = 30;
              }

              return (
                <motion.div
                  key={item.src}
                  initial={{ x: xPosition, scale, rotateY, zIndex }}
                  animate={{ x: xPosition, scale, rotateY, zIndex }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`absolute flex items-center justify-center w-[80%] max-w-[530px] origin-center rounded-full bg-transparent
                    ${scale < 1 ? "backdrop-blur-md opacity-50" : "opacity-100"}`}
                >
                  <div className="relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={600}
                      className={`object-contain shadow-xl pointer-events-none rounded-3xl transition-all duration-300 
                        ${scale < 1 ? "backdrop-blur-lg" : "blur-none"}`}
                    />
                    <button
                      className={`absolute bottom-5 left-5 px-4 py-2 text-sm ${item.buttonColor} text-black font-medium rounded-xl border-4 
                        ${item.outlineColor} w-full max-w-[150px] transition-all duration-300
                        ${scale < 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Button clicked for: ${item.alt}`);
                      }}
                      disabled={scale < 1}
                    >
                      {item.buttonText}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-72 z-20">
            <button
              onClick={() => handleSlide("left")}
              className="bg-[#D9D9D9] text-white rounded-full p-3 shadow-lg hover:bg-[#929292] transition-all"
            >
              <FaArrowLeft size={24} />
            </button>
            <button
              onClick={() => handleSlide("right")}
              className="bg-[#D9D9D9] text-white rounded-full p-3 shadow-lg hover:bg-[#929292] transition-all"
            >
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Scroll Down Icon */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-700 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          onClick={handleScrollDown}
        >
          <FaAngleDoubleDown size={50} className="text-white" />
        </motion.div>
      </section>

      <section ref={nextSectionRef} className="w-full min-h-screen relative bg-white text-black">
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex flex-col md:flex-row">
            {/* Left Sidebar */}
            <div className="w-full md:w-1/6 bg-[#C0F4E8] p-6 rounded-lg shadow-md my-8 md:my-10 md:mx-10">
              {featureDetails.map((feature) => (
                <div key={feature.featureId} className="mb-8">
                  <h3 className="font-bold text-md mb-2">{feature.navText}</h3>
                  <div className="text-sm mb-10">What is it</div>
                  <div className="text-sm mb-20">Key Features</div>
                </div>
              ))}
            </div>

            {/* Divider Line */}
            <div className="hidden md:block w-px bg-gray-400 mx-4"></div>

            {/* Right Main Content */}
            <div className="w-full md:w-3/4 mx-10 my-10 relative z-10">
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 w-full h-1/2">
                  <Image src="/menu/pattern.svg" alt="Pattern" layout="fill" objectFit="contain" />
                </div>
                <div className="absolute bottom-0 w-full h-1/2">
                  <Image src="/menu/pattern-1.svg" alt="Pattern" layout="fill" objectFit="contain" />
                </div>
              </div>
              {featureDetails.map((feature, index) => (
                <div key={feature.featureId} className="mb-12 pb-8 border-b border-gray-200 last:border-b-0">
                  <h2 className="text-2xl font-bold mb-4 font-mono">{feature.title}</h2>
                  <div className="text-sm mb-4">
                    <p>{feature.subtitle[0]}</p>
                    <p className="mt-2">{feature.subtitle[1]}</p>
                  </div>

                  <ul className="list-disc pl-5 mb-6 text-sm space-y-1">
                    {feature.keyFeatures.map((keyFeature, i) => (
                      <li key={i}>{keyFeature}</li>
                    ))}
                  </ul>
                  <p className="text-sm mb-4">{feature.conclusion}</p>
                  <div>
                    <button
                      className={`px-4 py-2 text-sm text-black font-medium rounded-xl border-4 
          ${feature.buttonColor} ${feature.outlineColor} w-full max-w-[150px] transition-all duration-300`}
                    >
                      {feature.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
