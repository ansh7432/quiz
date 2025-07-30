export interface Question {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export interface QuizQuestion extends Question {
  id: number
  choices: string[]
}

export interface UserAnswer {
  questionId: number
  selectedAnswer: string
  isCorrect: boolean
  timeSpent: number
}

export interface QuizState {
  email: string
  questions: QuizQuestion[]
  currentQuestionIndex: number
  answers: UserAnswer[]
  visitedQuestions: Set<number>
  attemptedQuestions: Set<number>
  timeRemaining: number
  isCompleted: boolean
  startTime: number
}

export interface QuizStats {
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  unansweredQuestions: number
  totalTimeSpent: number
  averageTimePerQuestion: number
  score: number
}