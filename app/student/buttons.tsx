'use client';
import React from 'react'
import { redirect } from "next/navigation";

const buttons = () => {
  return (
    <div className="relative bg-transparent mt-[4vw] left-1/2 transform -translate-x-1/2 inline-flex flex-wrap h-auto w-auto">
      <button
        onClick={() => redirect("/student/subjects/")}
        className="relative text-[white] text-[2vw] opacity-[90%] hover:opacity-[100%] rounded-[2vw] bg-[#007bff] h-[8vw] w-[15vw]">
        Take a Quiz!
      </button>
      <button
        onClick={() => redirect("/student/review/")}
        className="relative text-[white] text-[2vw] opacity-[90%] hover:opacity-[100%] rounded-[2vw] bg-[#007bff] h-[8vw] ml-[2vw] w-[15vw]">
        Review
      </button>
      <button
        onClick={() => redirect("/student/score/")}
        className="relative text-[white] text-[2vw] opacity-[90%] hover:opacity-[100%] rounded-[2vw] bg-[#007bff] h-[8vw] ml-[2vw] w-[15vw]">
        Check Score
      </button>
    </div>
  )
}

export default buttons
