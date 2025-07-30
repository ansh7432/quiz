import { useEffect, useRef, useState } from 'react'

interface UseQuizTimerProps {
  initialTime: number
  onTimeUp: () => void
  isActive: boolean
}

export function useQuizTimer({ initialTime, onTimeUp, isActive }: UseQuizTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            onTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeRemaining, onTimeUp])

  const resetTimer = (newTime: number) => {
    setTimeRemaining(newTime)
  }

  return { timeRemaining, resetTimer }
}