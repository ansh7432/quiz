'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, BookOpen, Clock, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQuiz } from '@/context/QuizContext'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { dispatch } = useQuiz()

  const handleStartQuiz = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    
    try {
      // Fetch questions from Open Trivia DB
      const response = await fetch('https://opentdb.com/api.php?amount=15')
      const data = await response.json()
      
      if (data.results) {
        // Process questions and add choices
        const processedQuestions = data.results.map((q: any, index: number) => ({
          ...q,
          id: index,
          choices: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
        }))

        dispatch({ type: 'SET_EMAIL', payload: email })
        dispatch({ type: 'SET_QUESTIONS', payload: processedQuestions })
        router.push('/quiz')
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error)
      alert('Failed to load quiz questions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-6"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Knowledge Quiz Challenge
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with 15 carefully curated questions. You have 30 minutes to complete the challenge!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card hover className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">30 Minutes</h3>
                <p className="text-gray-600">Complete all questions within the time limit</p>
              </div>
            </div>
          </Card>

          <Card hover className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">15 Questions</h3>
                <p className="text-gray-600">Mixed difficulty levels and categories</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 max-w-md mx-auto">
          <form onSubmit={handleStartQuiz} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              loading={isLoading}
              className="w-full flex items-center justify-center space-x-2"
            >
              <span>Start Quiz</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your email will be used to save your progress and results.</p>
          </div>
        </Card>
      </div>
    </div>
  )
}