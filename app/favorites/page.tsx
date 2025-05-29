"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Volume2, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface Word {
  id: string
  word: string
  language: string
  meaning: string
  story: string
  pronunciation: string
}

export default function FavoritesPage() {
  const [favoriteWords, setFavoriteWords] = useState<Word[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWords = JSON.parse(localStorage.getItem("lexislore-saved-words") || "{}")
      const favorites = JSON.parse(localStorage.getItem("lexislore-favorites") || "[]")

      const favoriteWordsList = favorites.map((id: string) => savedWords[id]).filter(Boolean)
      setFavoriteWords(favoriteWordsList)
    }
  }, [])

  const pronounceWord = (word: string, language: string) => {
    if ("speechSynthesis" in window) {
      const languageCode = language === "Arabic" ? "ar-SA" : language === "Swahili" ? "sw-KE" : "ja-JP"
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = languageCode
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const removeFavorite = (wordId: string) => {
    const favorites = JSON.parse(localStorage.getItem("lexislore-favorites") || "[]")
    const newFavorites = favorites.filter((id: string) => id !== wordId)
    localStorage.setItem("lexislore-favorites", JSON.stringify(newFavorites))

    setFavoriteWords((prev) => prev.filter((word) => word.id !== wordId))
  }

  const filteredWords =
    selectedLanguage === "All" ? favoriteWords : favoriteWords.filter((word) => word.language === selectedLanguage)

  const languages = ["All", ...Array.from(new Set(favoriteWords.map((word) => word.language)))]

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Favorite Words</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {favoriteWords.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No favorites yet</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start exploring words and save your favorites to see them here.
            </p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-teal-600 dark:hover:bg-teal-700">
                Explore Words
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <Button
                    key={language}
                    variant={selectedLanguage === language ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(language)}
                    className={
                      selectedLanguage === language
                        ? "bg-orange-500 hover:bg-orange-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                        : ""
                    }
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWords.map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{word.word}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{word.language}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFavorite(word.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-lg font-semibold text-orange-600 dark:text-teal-400 mb-3">{word.meaning}</p>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{word.story}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{word.pronunciation}</span>
                        <Button
                          onClick={() => pronounceWord(word.word, word.language)}
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                        >
                          <Volume2 className="h-4 w-4 mr-1" />
                          Pronounce
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
