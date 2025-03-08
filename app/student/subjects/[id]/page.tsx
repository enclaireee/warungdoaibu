"use client"

import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"

interface Question {
  id: string
  quiz_id: string
  question_text: string
  options: {
    id: string
    text: string
    is_correct: boolean
  }[]
}

const QuizPage = () => {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<any | null>(null)
  const [quizTitle, setQuizTitle] = useState<string>("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
        error: err,
      } = await supabase.auth.getUser()

      if (!user) {
        console.log(err)
        router.push("/login")
      } else {
        setUser(user)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    async function fetchQuizData() {
      if (!user) return

      // Fetch quiz details
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("*")
        .eq("id", params.quizId)
        .single()

      if (quizError) {
        console.error("Error fetching quiz:", quizError)
        return
      }
      setQuizTitle(quizData.title)

      const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select(`
          id,
          quiz_id,
          question_text,
          options (
            id,
            text,
            is_correct
          )
        `)
        .eq("quiz_id", params.quizId)

      if (questionsError) {
        console.error("Error fetching questions:", questionsError)
        return
      }
      setQuestions(questionsData || [])
    }

    fetchQuizData()
  }, [user, params.quizId])

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const submitAnswers = async () => {
    console.log("Submitting answers:", selectedAnswers)
    router.push(`/student/subjects/${params.id}`)
  }

  return (
    <div className="relative min-h-screen w-full overflow-auto bg-[#7ba3f3]">
      <div
        className="absolute inset-0 w-full h-full bg-repeat opacity-30 z-0"
        style={{
          backgroundImage: "url('/Patterns.png')",
          backgroundSize: "500px",
        }}
      />

      <div className="relative z-10 pt-4 px-4 pb-16">
        <button
          onClick={() => router.push(`/student/subjects/${params.id}`)}
          className="absolute font-light text-white left-4 top-4 text-base opacity-90 hover:opacity-100 rounded-full bg-[#007bff] h-10 w-16 md:h-12 md:w-20"
        >
          Back
        </button>

        <div className="flex justify-center items-center mt-8 mb-6">
          <div className="bg-[#a8f5a2] rounded-full py-2 px-8 shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold text-black flex items-center">
              <span className="mr-2">📚</span> Quiz {quizTitle}
            </h1>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-8 mt-8">
          {questions.map((question, index) => (
            <div key={question.id} className="relative">
              <div
                className="rounded-3xl overflow-hidden shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #f5a2f5 0%, #a2a8f5 100%)",
                }}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-black">Soal {index + 1}</h2>
                  <p className="text-lg mb-4 text-black">{question.question_text}</p>

                  <div className="grid grid-cols-2 gap-4">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={option.id}
                        onClick={() => handleAnswerSelect(question.id, option.id)}
                        className={`cursor-pointer p-2 rounded-lg transition-colors ${
                          selectedAnswers[question.id] === option.id
                            ? "bg-[#007bff] text-white"
                            : "hover:bg-[#e0e0e0]"
                        }`}
                      >
                        <p className="text-lg font-medium">
                          {String.fromCharCode(65 + optIndex)}. {option.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {questions.length > 0 ? (
          <div className="max-w-md mx-auto mt-8 flex justify-center">
            <button
              onClick={submitAnswers}
              className="bg-[#f5d28e] hover:bg-[#f5c56e] text-black font-bold py-2 px-6 rounded-full shadow-md"
            >
              Submit Answers
            </button>
          </div>
        ) : 
        <div className="flex items-center justify-center rounded-lg w-full h-full"> "No Questions Available" </div>}
      </div>
    </div>
  )
}

export default QuizPage
