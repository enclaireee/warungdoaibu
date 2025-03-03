"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { useParams } from "next/navigation";
import { submitAnswer } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { SubmitButton } from "@/components/submit-button";
import { Label } from "@/components/ui/label";

export default function Page() {
    const router = useRouter();
    interface SubjectType {
        id: string,
        name: string
    }

    type answer_choicesType = {
        id: string;
        question_id: string;
        choice_text: string;
        is_correct: boolean;
    };

    type OptionOpsiType = {
        choice_text: string;
        is_correct: boolean;
    };

    type OpsiType = {
        question_id: string;
        question_text: string;
        option: number[];
        opsi: string[];
    };

    type QuizType = {
        id: string;
        title: string;
        description: string;
    };

    type QuestionsType = {
        id: string;
        question_text: string;
    };

    const supabase = createClient();
    const params = useParams();

    const [user, setUser] = useState<any | null>(null);
    const [quiz_data, setQuiz_Data] = useState<QuizType>();
    const [loading, setLoading] = useState(true);
    const [subject, setSubject] = useState<SubjectType>();
    const [banyakQuestion, setBanyakQuestion] = useState(0);
    const [opsi, setOpsi] = useState<OpsiType[]>([]);
    const [questionss, setQuestions] = useState<QuestionsType[]>([]);
    const [opsi_option, setOO] = useState<OptionOpsiType[]>([]);
    const [ans, setAns] = useState<answer_choicesType[]>([]);
    const [udhDitekan, setUdhDitekan] = useState<number[]>([]);


    useEffect(() => {
        async function fetchUser() {
            const { data: { user }, error: err } = await supabase.auth.getUser();
            if (!user) {
                console.log(err);
                router.push("/login");
            } else {
                setUser(user);
                const { data: userData } = await supabase.from("users").select("*").eq("email", user?.email).single();
                if (userData) {
                    if (userData.role == "admin") {
                        router.push("/login");
                    }
                }
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        let namaAwal: string | string[], nama: string = "";
        if (typeof params.name === "string") {
            namaAwal = params.name.split('%20');
            for (let n of namaAwal) {
                nama += " " + n;
            }
        }

        async function getSubject() {
            const { data: quizs } = await supabase.from("subjects").select("*").eq("id", params.id).single();
            if (quizs) {
                setSubject(quizs);
            }
        }

        getSubject();
    }, [user]);

    useEffect(() => {
        const getData = async () => {
            const { data: quizData } = await supabase.from("quizzes").select("*").eq("id", params.quiz_id).single();
            setQuiz_Data(quizData);
        };

        getData();
    }, [user]);


    useEffect(() => {
        const getData = async () => {
            if (!quiz_data?.id) return;

            const { data: questionsData, error } = await supabase.from("questions").select("id, question_text").eq("quiz_id", quiz_data.id);
            console.log("Raw Questions Data:", questionsData);

            const quesData: QuestionsType[] = questionsData ?? [];
            setQuestions(quesData);
        };

        getData();
    }, [quiz_data]);


    useEffect(() => {
        const e: OpsiType[] = [];
        const udh: number[] = [];
        for (let q of questionss) {
            e.push({ question_id: q.id, question_text: q.question_text, option: [0, 0, 0, 0], opsi: ["", "", "", ""] });
            udh.push(1);
        }

        setOpsi(e);
        setUdhDitekan(udh);
        setBanyakQuestion(questionss.length);
    }, [questionss]);

    useEffect(() => {
        const getData = async () => {
            const e: answer_choicesType[] = [];
            for (let q1 of questionss) {
                const { data: ansData, error } = await supabase.from("answer_choices").select("*").eq("question_id", q1.id);
                if (ansData) {
                    e.push(...ansData);
                }
            }

            setAns(e);
        };

        getData();
    }, [questionss]);

    useEffect(() => {
        const e: OpsiType[] = opsi;
        let k = 0;
        for (let x = 0; x < ans.length; x++) {
            if (x % 4 == 0 && x > 0) {
                k++;
            }

            e[k].opsi[x % 4] = ans[x].choice_text;
            e[k].option[x % 4] = Number(ans[x].is_correct);
        }

        setOpsi(e);
    }, [ans]);


    const IsiOpsi = (indeks1: number, indeks2: number) => {
        setOpsi((prev) => {
            const newOpsi = [...prev];
            newOpsi[indeks1].option = newOpsi[indeks1].option.map((_, index) =>
                index === indeks2 ? 1 : 0
            );
            return newOpsi;
        });
    };

    const questions = opsi.map((q, i) => (
        <div key={q.question_id} className="relative flex bg-transparent min-h-auto w-[60vw] mt-[10vw]">
            <div className="relative bg-transparent h-full w-1/2">
                <Label htmlFor={`Question ${i + 1}`} className="relative text-[2vw] mb-[1vw]">
                    Question {i + 1}
                </Label>
                <div
                    className="ml-[1vw] mt-[1vw] placeholder:text-sm rounded-[1vw] p-[0.2vw] placeholder:text-muted-foreground scroll-container focus:outline-none resize-none w-[50vw]">
                    {q.question_text}
                </div>

                <div className="relative bg-transparent h-auto w-[50vw] ml-[-1vw] flex flex-wrap">
                    {q.opsi.map((choice, j) => (
                        <div key={`${q.question_id}-option-${j}`} className="relative pl-[-1vw] flex flex-wrap">
                            <input
                                type="radio"
                                className="relative top-[1.05vw] ml-[3vw] h-[2vw] w-[2vw]"
                                name={`question-${q.question_id}`}
                                onChange={() => IsiOpsi(i, j)}
                            />
                            <div
                                className="relative mt-[0.8vw] ml-[1vw] placeholder:text-sm rounded-[1vw] p-[0.2vw] placeholder:text-muted-foreground scroll-container focus:outline-none resize-none w-[16.7vw]">
                                {choice}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ));

    return (
        <div className="bg-cover justify-items-center bg-[black] min-h-full w-full">
            <button
                onClick={() => router.push(`/student/subjects/${subject?.id}`)}
                className="absolute font-light text-[white] left-[5vw] top-[3vw] text-[1vw] opacity-[90%] hover:opacity-[100%] rounded-[2vw] bg-[#007bff] h-[3vw] w-[5vw]"
            >
                Back
            </button>
            <div className="relative flex flex-col bg-transparent top-[1vw] min-h-auto w-[60vw] mt-[2vw]">
                <div className="relative bg-transparent h-[6vw] w-full top-0">
                    <div className="relative justify-items-center bg-transparent h-[7vw] w-full">
                        <h1 className="relative text-[4vw] top-0 mt-[0.5vw] text-[white] font-bold">
                            {quiz_data?.title}
                        </h1>
                    </div>
                </div>
                <div className="relative mt-[-5vw]">{questions}</div>
                <form>
                    <Input type="hidden" name="opsi" defaultValue={JSON.stringify(opsi)} required />
                    <Input type="hidden" name="quizId" defaultValue={params.quiz_id} required />
                    <Input type="hidden" name="subject_id" defaultValue={subject?.id} required />

                    <div className="relative left-1/2 transform -translate-x-1/2 justify-items-center bg-transparent mt-[10vw] h-[10vw] w-[23vw]">
                        <SubmitButton
                            className="relative left-1/2 transform -translate-x-1/2 h-[8vw] w-[15vw] rounded-[2vw] text-[1.5vw] font-bold"
                            formAction={submitAnswer}
                            pendingText="Submitting answers..."
                        >
                            Submit Answers!
                        </SubmitButton>
                    </div>
                </form>
            </div>
        </div>
    );
}