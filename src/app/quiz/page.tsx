'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useQuiz } from '@/context/QuizContext'
import { useQuizTimer } from '@/hooks/useQuizTimer'
import { Timer } from '@/components/Timer'
import { QuestionCard } from '@/components/QuestionCard'
import { QuestionOverview } from '@/components/QuestionOverview'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'

export default function QuizPage() {
  const { state, dispatch } = useQuiz()
  const router = useRouter()
  const { questions, currentQuestionIndex, answers, timeRemaining } = state

  const { timeRemaining: timerValue } = useQuizTimer({
    initialTime: timeRemaining,
    onTimeUp: () => {
      dispatch({ type: 'COMPLETE_QUIZ' })
      router.push('/results')
    },
    isActive: questions.length > 0 && !state.isCompleted
  })

  useEffect(() => {
    dispatch({ type: 'SET_TIME_REMAINING', payload: timerValue })
  }, [timerValue, dispatch])

  useEffect(() => {
    if (questions.length === 0) {
      router.push('/')
    }
  }, [questions.length, router])

  const handleSubmitQuiz = () => {
    dispatch({ type: 'COMPLETE_QUIZ' })
    router.push('/results')
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const answeredQuestions = answers.length

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-semibold text-gray-800">Knowledge Quiz</h1>
              <ProgressBar 
                progress={progress} 
                className="w-48" 
                showPercentage 
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{answeredQuestions}</span> of {questions.length} answered
              </div>
              <Timer timeRemaining={timerValue} totalTime={30 * 60} />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Overview Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              <QuestionOverview />
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quiz Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Answered</span>
                    <span className="font-medium text-success-600">{answeredQuestions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remaining</span>
                    <span className="font-medium text-gray-800">{questions.length - answeredQuestions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-primary-600">{Math.round(progress)}%</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleSubmitQuiz}
                  variant="success"
                  className="w-full mt-4"
                  disabled={answeredQuestions === 0}
                >
                  Submit Quiz
                </Button>
              </div>
            </div>
          </motion.aside>

          {/* Question Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <QuestionCard />
          </motion.div>
        </div>
      </main>
    </div>
  )
}