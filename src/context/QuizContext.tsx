'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { QuizState, QuizQuestion, UserAnswer } from '@/types/quiz'

type QuizAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_QUESTIONS'; payload: QuizQuestion[] }
  | { type: 'SET_CURRENT_QUESTION'; payload: number }
  | { type: 'ADD_ANSWER'; payload: UserAnswer }
  | { type: 'UPDATE_ANSWER'; payload: { questionId: number; selectedAnswer: string } }
  | { type: 'VISIT_QUESTION'; payload: number }
  | { type: 'SET_TIME_REMAINING'; payload: number }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' }

const initialState: QuizState = {
  email: '',
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  visitedQuestions: new Set(),
  attemptedQuestions: new Set(),
  timeRemaining: 30 * 60, // 30 minutes in seconds
  isCompleted: false,
  startTime: 0,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    
    case 'SET_QUESTIONS':
      return { 
        ...state, 
        questions: action.payload,
        startTime: Date.now()
      }
    
    case 'SET_CURRENT_QUESTION':
      const newVisited = new Set(state.visitedQuestions)
      newVisited.add(action.payload)
      return { 
        ...state, 
        currentQuestionIndex: action.payload,
        visitedQuestions: newVisited
      }
    
    case 'ADD_ANSWER':
      const newAttempted = new Set(state.attemptedQuestions)
      newAttempted.add(action.payload.questionId)
      return {
        ...state,
        answers: [...state.answers, action.payload],
        attemptedQuestions: newAttempted
      }
    
    case 'UPDATE_ANSWER':
      const updatedAnswers = state.answers.map(answer =>
        answer.questionId === action.payload.questionId
          ? { 
              ...answer, 
              selectedAnswer: action.payload.selectedAnswer,
              isCorrect: action.payload.selectedAnswer === state.questions[action.payload.questionId]?.correct_answer
            }
          : answer
      )
      return { ...state, answers: updatedAnswers }
    
    case 'VISIT_QUESTION':
      const visitedSet = new Set(state.visitedQuestions)
      visitedSet.add(action.payload)
      return { ...state, visitedQuestions: visitedSet }
    
    case 'SET_TIME_REMAINING':
      return { ...state, timeRemaining: action.payload }
    
    case 'COMPLETE_QUIZ':
      return { ...state, isCompleted: true }
    
    case 'RESET_QUIZ':
      return { ...initialState }
    
    default:
      return state
  }
}

const QuizContext = createContext<{
  state: QuizState
  dispatch: React.Dispatch<QuizAction>
} | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}