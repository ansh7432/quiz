'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react'
import { useQuiz } from '@/context/QuizContext'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { decodeHtmlEntities } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function QuestionCard() {
  const { state, dispatch } = useQuiz()
  const { questions, currentQuestionIndex, answers } = state
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())

  const currentQuestion = questions[currentQuestionIndex]
  const existingAnswer = answers.find(a => a.questionId === currentQuestionIndex)

  useEffect(() => {
    setQuestionStartTime(Date.now())
    setSelectedAnswer(existingAnswer?.selectedAnswer || '')
  }, [currentQuestionIndex, existingAnswer])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
    const isCorrect = answer === currentQuestion.correct_answer

    if (existingAnswer) {
      dispatch({
        type: 'UPDATE_ANSWER',
        payload: { questionId: currentQuestionIndex, selectedAnswer: answer }
      })
    } else {
      dispatch({
        type: 'ADD_ANSWER',
        payload: {
          questionId: currentQuestionIndex,
          selectedAnswer: answer,
          isCorrect,
          timeSpent
        }
      })
    }
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? Math.max(0, currentQuestionIndex - 1)
      : Math.min(questions.length - 1, currentQuestionIndex + 1)
    
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: newIndex })
  }

  if (!currentQuestion) return null

  return (
    <Card className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="flex items-center space-x-2">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              currentQuestion.difficulty === 'easy' ? 'bg-success-100 text-success-800' :
              currentQuestion.difficulty === 'medium' ? 'bg-warning-100 text-warning-800' :
              'bg-danger-100 text-danger-800'
            )}>
              {currentQuestion.difficulty}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
              {decodeHtmlEntities(currentQuestion.category)}
            </span>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-semibold text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(currentQuestion.question) }}
          />
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-3 mb-8"
        >
          {currentQuestion.choices.map((choice, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleAnswerSelect(choice)}
              className={cn(
                'w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex items-center space-x-3',
                selectedAnswer === choice
                  ? 'border-primary-500 bg-primary-50 text-primary-800'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100 text-gray-700'
              )}
            >
              <div className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                selectedAnswer === choice
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              )}>
                {selectedAnswer === choice && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </div>
              <span 
                className="flex-1 font-medium"
                dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(choice) }}
              />
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => handleNavigation('prev')}
          disabled={currentQuestionIndex === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <div className="flex items-center space-x-3">
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2 text-success-600"
            >
              <Flag className="w-4 h-4" />
              <span className="text-sm font-medium">Answer saved</span>
            </motion.div>
          )}
        </div>

        <Button
          onClick={() => handleNavigation('next')}
          disabled={currentQuestionIndex === questions.length - 1}
          className="flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}