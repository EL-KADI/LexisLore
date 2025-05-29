"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface QuizQuestion {
  word: string
  correctAnswer: string
  options: string[]
  language: string
}

const quizQuestions: QuizQuestion[] = [
  {
    word: "najwa",
    correctAnswer: "Secret conversation",
    options: ["Secret conversation", "Beautiful song", "Morning prayer", "Desert wind"],
    language: "Arabic",
  },
  {
    word: "hakuna matata",
    correctAnswer: "No worries",
    options: ["No worries", "Good morning", "Thank you", "Goodbye"],
    language: "Swahili",
  },
  {
    word: "ikigai",
    correctAnswer: "Reason for being",
    options: ["Reason for being", "Cherry blossom", "Tea ceremony", "Mountain path"],
    language: "Japanese",
  },
  {
    word: "ubuntu",
    correctAnswer: "I am because we are",
    options: ["I am because we are", "Unity in diversity", "Strength in numbers", "Peace and love"],
    language: "Swahili",
  },
  {
    word: "wabi-sabi",
    correctAnswer: "Beauty in imperfection",
    options: ["Beauty in imperfection", "Perfect harmony", "Eternal youth", "Silent meditation"],
    language: "Japanese",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([])

  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
  }, [])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === shuffledQuestions[currentQuestion]?.correctAnswer) {
      setScore(score + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizCompleted(true)
        saveQuizResult()
      }
    }, 1500)
  }

  const saveQuizResult = () => {
    const today = new Date().toDateString()
    const results = JSON.parse(localStorage.getItem("lexislore-quiz-results") || "{}")
    results[today] = {
      score: score + (selectedAnswer === shuffledQuestions[currentQuestion]?.correctAnswer ? 1 : 0),
      total: shuffledQuestions.length,
      date: today,
    }
    localStorage.setItem("lexislore-quiz-results", JSON.stringify(results))
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setQuizCompleted(false)
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
  }

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>
  }

  const currentQ = shuffledQuestions[currentQuestion]
  const finalScore = score + (selectedAnswer === currentQ?.correctAnswer ? 1 : 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-teal-900 dark:to-slate-900">
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-orange-200 dark:border-teal-700">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Word Quiz</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {!quizCompleted ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white dark:bg-slate-800 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Question {currentQuestion + 1} of {shuffledQuestions.length}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Score: {score}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
                    <div
                      className="bg-orange-500 dark:bg-teal-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  What does "{currentQ.word}" mean?
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{currentQ.language} word</p>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showResult}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === option
                          ? showResult
                            ? option === currentQ.correctAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                              : "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                            : "border-orange-500 dark:border-teal-500 bg-orange-50 dark:bg-teal-900/20"
                          : showResult && option === currentQ.correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            : "border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-teal-400 bg-white dark:bg-slate-700"
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                {selectedAnswer && !showResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                    <Button
                      onClick={handleNextQuestion}
                      className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                    >
                      {currentQuestion < shuffledQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white dark:bg-slate-800 shadow-lg">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz Complete!</h2>
                <div className="text-6xl mb-4">
                  {finalScore === shuffledQuestions.length
                    ? "🎉"
                    : finalScore >= shuffledQuestions.length / 2
                      ? "👏"
                      : "📚"}
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  You scored {finalScore} out of {shuffledQuestions.length}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={resetQuiz}
                    className="bg-orange-500 hover:bg-orange-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Link href="/">
                    <Button variant="outline">Learn More Words</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  )
}
