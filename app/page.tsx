"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, Book, Pencil, User, ChevronLeft, ChevronRight } from "lucide-react"

const cards = [
  {
    id: 1,
    title: "Ready, Set, Quiz!",
    subtitle: "",
    color: "from-yellow-200 to-orange-200",
  },
  {
    id: 2,
    title: "Dive Into Review!",
    subtitle: "Review & Master",
    color: "from-cyan-200 to-green-200",
  },
  {
    id: 3,
    title: "Check your scores!",
    subtitle: "",
    color: "from-purple-200 to-pink-200",
  },
]

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(1)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1))
  }

  return (
    <main className="min-h-screen bg-pink-100 font-pixel text-gray-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-200 via-green-200 to-pink-200 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Dinosaur mascot"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
          <div className="flex items-center gap-6">
            <Bell className="w-6 h-6 text-gray-600" />
            <Book className="w-6 h-6 text-gray-600" />
            <Pencil className="w-6 h-6 text-gray-600" />
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <section className="pt-24 px-4 max-w-7xl mx-auto relative">
        <div className="overflow-hidden py-12">
          <div className="relative h-[400px] flex items-center justify-center">
            {cards.map((card, index) => {
              const position = index - activeIndex

              return (
                <div
                  key={card.id}
                  className={`absolute w-[350px] md:w-[500px] transition-all duration-500 ease-in-out 
                  ${position === 0 ? "z-20 transform-none opacity-100" : ""}
                  ${position < 0 ? "-translate-x-[55%] opacity-40 blur-sm z-10" : ""}
                  ${position > 0 ? "translate-x-[55%] opacity-40 blur-sm z-10" : ""}`}
                >
                  <div
                    className={`p-8 bg-gradient-to-br ${card.color} rounded-[2rem] shadow-lg h-[300px] flex flex-col justify-between`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-3xl font-bold mb-3">{card.title}</h2>
                        {card.subtitle && <p className="text-lg text-gray-700">{card.subtitle}</p>}
                      </div>
                      {index === 1 && (
                        <Image
                          src="/placeholder.svg?height=120&width=120"
                          alt="Study dinosaur"
                          width={120}
                          height={120}
                          className="w-32 h-32"
                        />
                      )}
                    </div>
                    {card.id === 2 && (
                      <button className="px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white transition-colors text-lg self-start mt-4">
                        Review & Master
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 z-30 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 z-30 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Decorative pencil"
            width={40}
            height={40}
            className="animate-float absolute -top-20 -left-40"
          />
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Decorative book"
            width={40}
            height={40}
            className="animate-float-delay-1 absolute top-20 -right-30"
          />
          <Image
            src="/placeholder.svg?height=20&width=20"
            alt="Decorative star"
            width={20}
            height={20}
            className="animate-float-delay-2 absolute -bottom-10 left-20"
          />
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-4 max-w-7xl mx-auto pb-20">
        <div className="space-y-12">
          {/* Dive Into Review Section */}
          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold">Dive Into Review!</h2>
            <p className="text-gray-600">
              The "Dive Into Review" function allows users to quickly check the correct answers after completing a quiz.
              Unlike detailed feedback or explanations, this feature simply reveals the right answers without any
              additional context.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• No Explanations - Only the correct choices are displayed</li>
              <li>• Quick & Simple - Ideal for users who just want to verify answers without deep analysis</li>
              <li>
                • Best used after a full quiz review, but for deeper learning users might need a more detailed
                explanation or formal review mode
              </li>
            </ul>
            <button className="px-4 py-2 bg-green-300 text-gray-800 rounded-full hover:bg-green-400 transition-colors">
              Review & Master
            </button>
          </div>

          {/* Ready Set Quiz Section */}
          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold">Ready, Set, Quiz!</h2>
            <p className="text-gray-600">
              The "Ready, Set, Quiz!" function takes users straight into a collection of fully published quizzes, all of
              which are multiple-choice. It's designed for quick, straightforward gameplay where users can test their
              knowledge and get instant results.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Fully Published Quizzes - Only completed and ready-to-play quizzes are available</li>
              <li>• Multiple-Choice Only - No written answers, just quick selections</li>
              <li>• Instant Feedback - Users get results immediately after completing</li>
            </ul>
            <button className="px-4 py-2 bg-blue-300 text-gray-800 rounded-full hover:bg-blue-400 transition-colors">
              Take a Quiz!
            </button>
          </div>

          {/* Check your scores Section */}
          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold">Check your scores!</h2>
            <p className="text-gray-600">
              The "Check Your Scores!" function allows users to quickly view their quiz results. It provides a simple
              way to see their final score without any breakdowns or detailed reviews.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Instant Score Display - See your total score immediately</li>
              <li>• No Answer Review - Only shows the final result, not which answers were right or wrong</li>
              <li>• Quick & Simple - Ideal for users who just want to check their performance at a glance</li>
            </ul>
            <button className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-full hover:bg-yellow-400 transition-colors">
              Find out
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

