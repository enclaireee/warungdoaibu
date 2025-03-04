"use client"
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import IconNilai from '@/components/icons/mail';
import IconSearch from '@/components/icons/magnify';
import Image from 'next/image';
import picture from '@/components/icons/picture.png';
import pattern from '@/components/icons/Pattern.png'


const page = () => {
  interface Subject {
    subjectid: string;
    subjectname: string;
    adminname: string;
  }

  interface QuizType {
    quizid: string,
    quiztitle: string,
    quizscore: number,
    rightanswers: number,
    wronganswers: number,
  }

  const [user, setUser] = useState<any | null>(null);
  const [dataSubject, setDataSubject] = useState<Subject[]>([]);
  const [quizzesBySubject, setQuizzesBySubject] = useState<Record<string, QuizType[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      const { data: { user }, error: err } = await supabase.auth.getUser();
      if (!user) {
        console.log(err);
        redirect("/login");
      } else {
        setUser(user);
        const { data: userData } = await supabase.from("users").select("*").eq("email", user?.email).single();
        if (userData) {
          if (userData.role == "admin") {
            redirect("/login");
          }
        }
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    async function getDataSubjects() {
      if (!user) return;

      const { data, error } = await supabase.rpc('get_subjects_unique', {
        studentid: user?.id,
      });

      if (data) {
        setDataSubject(data ?? []);
      }
    }

    getDataSubjects();
  }, [user]);

  useEffect(() => {
    async function getAllQuizzes() {
      if (!user || dataSubject.length === 0) return;

      const quizzes: Record<string, QuizType[]> = {};

      for (const subject of dataSubject) {
        const { data, error } = await supabase.rpc('get_quizzes_with_score', {
          subjectid: subject.subjectid,
          studentid: user?.id,
        });

        if (error) {
          console.error('Supabase RPC Error:', error);
        } else {
          quizzes[subject.subjectid] = data ?? [];
        }
      }

      setQuizzesBySubject(quizzes);
    }

    getAllQuizzes();
  }, [dataSubject]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const subjectsWithQuizzes = dataSubject
  .filter(subject => 
    subject.subjectname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quizzesBySubject[subject.subjectid]?.some(quiz => 
      quiz.quiztitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
  .map((subject, i, arr) => (
    <div key={i} className="sm:mb-5 sm:mt-3 md:mb-7 md:mt-4 mb-3 mt-2 ">
      {/* title */}
      <div className="grid col-span-3 -mb-[20px] sm:-mb-[5px] md:mb-[5px]">
        <div className="text-center">
          <h1 className="text-black text-[14px] sm:text-[20px] md:text-[25px] font-extrabold font-family">{subject.subjectname}</h1>
        </div>
        <div className="text-center">
          <h1 className="text-[10px] sm:text-[20px] md:text-[20px] text-black font-family">{subject.adminname}</h1>
        </div>
      </div>
      
      {/* Scores */}
      {quizzesBySubject[subject.subjectid]?.map((quiz, j) => ( 
        <div key={quiz.quizid} className="h-[150px] grid grid-cols-4 gap-4 sm:mb-[25px] md:mb-[60px] mb-[5px] ">
          <div className="col-span-3 flex items-center justify-center relative">
            <Image 
              src={picture} 
              alt="Background" 
              className="w-[180px] sm:w-[240px] md:w-[320px] h-40 object-contain"
            />
          </div>

          <div className="flex self-center flex-col col-span-1 text-[10px] sm:text-[15px] md:text-[25px] -ml-[10px] md:-ml-[15px] sm:-ml-[20px] text-black font-family font-semibold gap-4">
            <div><h1 className="">BENAR: {quiz.rightanswers}</h1></div>
            <div><h1>SALAH: {quiz.wronganswers}</h1></div>
            <div className="flex">
              <h1>NILAI</h1>
              <span className="ml-[10px] md:ml-[15px] sm:ml-[20px]">: {quiz.quizscore}</span>
            </div>
          </div>
          {/* ignore sikit wak, gue gatau cara kasih spasi tanpa kasih margin*/}
        </div>
      ))}

      {/* Conditional border */}
      {i < arr.length - 1 && (
        <div className="h-2 w-6/12 mx-auto bg-[#DB82DA] rounded-full sm:my-4 md:my-8 my-2"></div>
      )}
    </div>
  ));

  return (
    <>
      <div className="grid justify-items-center bg-[#CCB5FB] w-full">
        <div className="grid grid-cols-4 w-full max-w-[1024px] gap-3 pt-10 px-4">
          <div className="w-full flex justify-end self-center">
            <button
              onClick={() => redirect(`/student/`)}
              className="mr-[10px] sm:mr-[20px] justify-self-end p-2 transition-colors"
            >
              <svg 
                className="w-6 h-6 sm:w-8 sm:h-8" 
                fill="none" 
                stroke="#870B6C"
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>

          <div className="col-span-2 border-2 p-2 border-black justify-items-center bg-gradient-to-r from-[#DC82DC] via-[#A6D8AF] via-50% via-[#7BCCBA] to-[#7DD1E0] rounded-[25px] flex items-center justify-center gap-5">
            <IconNilai className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
            <h1 className="text-xl sm:text-3xl lg:text-4xl text-black font-bold">
              Nilai !!
            </h1>
          </div>

          <div className="ml-[10px]  flex justify-start gap-2 rounded-[10px] self-center p-3 bg-white opacity-50  sm:ml-[20px]">
            <IconSearch className="flex-shrink-0 h-4 sm:h-5" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm} 
              onChange={handleSearchChange} 
              className="bg-transparent outline-none text-[#8A867C] w-full text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="grid justify-items-center bg-[#CCB5FB] w-full" 
        style={{ 
          backgroundImage: `url(${pattern.src})`, 
          backgroundSize: '70%',
          backgroundRepeat: 'repeat',
          marginTop: '-1px'
        }}>
          <div className="mt-[40px] w-[300px] sm:w-[400px] md:w-[600px] h-auto sm:mb-[50px] md:mb-[40px] mb-[20px] ">
            {subjectsWithQuizzes}
          </div>
      </div>
      
    </>
    
  )
}

export default page
