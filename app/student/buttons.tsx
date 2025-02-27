'use client';
import React from 'react'
import { redirect } from "next/navigation";

const buttons = () => {
  return (
    <div className="relative bg-transparent left-1/2 transform -translate-x-1/2 flex flex-col h-[30vw] w-[30vw]">
      <button
        onClick={() => redirect("/student/subjects/")}
        className="relative left-1/2 transform -translate-x-1/2 text-[white] text-[2vw] opacity-[90%] hover:opacity-[100%] rounded-[2vw] bg-[#007bff] h-[8vw] mt-[1vw] w-[15vw]">
        Take a Quiz!
      </button>
      <button
        className="relative left-1/2 transform -translate-x-1/2 text-[white] text-[2vw] opacity-[90%] hover:opacity-[100%] rounded-[2vw] bg-[#007bff] h-[8vw] mt-[2vw] w-[15vw]">
        Review
      </button>
    </div>
  )
}

export default buttons
