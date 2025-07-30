'use client'

import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw, Download } from 'lucide-react'
import { useQuiz } from '@/context/QuizContext'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { decodeHtmlEntities, formatTime } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { QuizStats } from '@/types/quiz'

export default function ResultsPage() {
  const { state, dispatch } = useQuiz()
  const router = useRouter()
  const { questions, answers, email, startTime } = state

  useEffect(() => {
    if (questions.length === 0) {
      router.push('/')
    }
  }, [questions.length, router])

  const stats: QuizStats = useMemo(() => {
    const totalQuestions = questions.length
    const correctAnswers = answers.filter(a => a.isCorrect).length
    const incorrectAnswers = answers.filter(a => !a.isCorrect).length
    const unansweredQuestions = totalQuestions - answers.length
    const totalTimeSpent = Math.floor((Date.now() - startTime) / 1000)
    const averageTimePerQuestion = answers.length > 0 ? Math.floor(totalTimeSpent / answers.length) : 0
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    return {
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unansweredQuestions,
      totalTimeSpent,
      averageTimePerQuestion,
      score
    }
  }, [questions, answers, startTime])

  const handleRetakeQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' })
    router.push('/')
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'danger'
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! 🏆'
    if (score >= 80) return 'Excellent work! 🌟'
    if (score >= 70) return 'Good job! 👍'
    if (score >= 60) return 'Not bad! 📚'
    return 'Keep practicing! 💪'
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Results</h1>
          <p className="text-gray-600">Here's how you performed, {email}</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 text-center">
            <div className={cn(
              'text-3xl font-bold mb-2',
              stats.score >= 80 ? 'text-success-600' :
              stats.score >= 60 ? 'text-warning-600' : 'text-danger-600'
            )}>
              {stats.score}%
            </div>
            <p className="text-gray-600">Overall Score</p>
            <p className="text-sm font-medium mt-1">{getScoreMessage(stats.score)}</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-success-600 mb-2">{stats.correctAnswers}</div>
            <p className="text-gray-600">Correct Answers</p>
            <ProgressBar 
              progress={(stats.correctAnswers / stats.totalQuestions) * 100} 
              color="success" 
              className="mt-2"
            />
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-danger-600 mb-2">{stats.incorrectAnswers}</div>
            <p className="text-gray-600">Incorrect Answers</p>
            <ProgressBar 
              progress={(stats.incorrectAnswers / stats.totalQuestions) * 100} 
              color="danger" 
              className="mt-2"
            />
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">{formatTime(stats.totalTimeSpent)}</div>
            <p className="text-gray-600">Total Time</p>
            <p className="text-sm text-gray-500 mt-1">
              Avg: {formatTime(stats.averageTimePerQuestion)}/question
            </p>
          </Card>
        </motion.div>

        {/* Detailed Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800">Detailed Results</h2>
          
          {questions.map((question, index) => {
            const userAnswer = answers.find(a => a.questionId === index)
            const isCorrect = userAnswer?.isCorrect
            const wasAnswered = !!userAnswer

            return (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                    !wasAnswered ? 'bg-gray-100' :
                    isCorrect ? 'bg-success-100' : 'bg-danger-100'
                  )}>
                    {!wasAnswered ? (
                      <span className="text-gray-500 font-medium">{index + 1}</span>
                    ) : isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-success-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-danger-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">Question {index + 1}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          question.difficulty === 'easy' ? 'bg-success-100 text-success-800' :
                          question.difficulty === 'medium' ? 'bg-warning-100 text-warning-800' :
                          'bg-danger-100 text-danger-800'
                        )}>
                          {question.difficulty}
                        </span>
                        {userAnswer && (
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">{formatTime(userAnswer.timeSpent)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p 
                      className="text-gray-700 mb-4"
                      dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(question.question) }}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Your Answer:</h4>
                        <div className={cn(
                          'p-3 rounded-lg border',
                          !wasAnswered ? 'bg-gray-50 border-gray-200' :
                          isCorrect ? 'bg-success-50 border-success-200' : 'bg-danger-50 border-danger-200'
                        )}>
                          {wasAnswered ? (
                            <span 
                              className={cn(
                                'font-medium',
                                isCorrect ? 'text-success-800' : 'text-danger-800'
                              )}
                              dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(userAnswer.selectedAnswer) }}
                            />
                          ) : (
                            <span className="text-gray-500 italic">Not answered</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Correct Answer:</h4>
                        <div className="p-3 rounded-lg bg-success-50 border border-success-200">
                          <span 
                            className="font-medium text-success-800"
                            dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(question.correct_answer) }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-4"
        >
          <Button
            onClick={handleRetakeQuiz}
            variant="primary"
            size="lg"
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retake Quiz</span>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}