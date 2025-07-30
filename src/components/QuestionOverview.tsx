'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Eye, Circle } from 'lucide-react'
import { useQuiz } from '@/context/QuizContext'
import { cn } from '@/lib/utils'

export function QuestionOverview() {
  const { state, dispatch } = useQuiz()
  const { questions, currentQuestionIndex, visitedQuestions, attemptedQuestions } = state

  const handleQuestionClick = (index: number) => {
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: index })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Circle className="w-5 h-5 mr-2 text-primary-600" />
        Question Overview
      </h3>
      
      <div className="grid grid-cols-5 gap-2">
        {questions.map((_, index) => {
          const isVisited = visitedQuestions.has(index)
          const isAttempted = attemptedQuestions.has(index)
          const isCurrent = currentQuestionIndex === index

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuestionClick(index)}
              className={cn(
                'relative w-12 h-12 rounded-lg border-2 font-semibold text-sm transition-all duration-200 flex items-center justify-center',
                isCurrent
                  ? 'border-primary-500 bg-primary-100 text-primary-700 ring-2 ring-primary-200'
                  : isAttempted
                  ? 'border-success-500 bg-success-100 text-success-700 hover:bg-success-200'
                  : isVisited
                  ? 'border-warning-500 bg-warning-100 text-warning-700 hover:bg-warning-200'
                  : 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'
              )}
            >
              <span className="relative z-10">{index + 1}</span>
              
              {/* Status indicators */}
              {isAttempted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-success-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-2.5 h-2.5 text-white" />
                </motion.div>
              )}
              
              {isVisited && !isAttempted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-warning-500 rounded-full flex items-center justify-center"
                >
                  <Eye className="w-2.5 h-2.5 text-white" />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>
      
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success-500 rounded-full"></div>
          <span className="text-gray-600">Attempted ({attemptedQuestions.size})</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
          <span className="text-gray-600">Visited ({visitedQuestions.size - attemptedQuestions.size})</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <span className="text-gray-600">Not visited ({questions.length - visitedQuestions.size})</span>
        </div>
      </div>
    </div>
  )
}