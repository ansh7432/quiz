'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle } from 'lucide-react'
import { formatTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface TimerProps {
  timeRemaining: number
  totalTime: number
}

export function Timer({ timeRemaining, totalTime }: TimerProps) {
  const percentage = (timeRemaining / totalTime) * 100
  const isLowTime = timeRemaining < 300 // Less than 5 minutes
  const isCriticalTime = timeRemaining < 60 // Less than 1 minute

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'flex items-center space-x-3 px-4 py-2 rounded-lg border-2 transition-all duration-300',
        isCriticalTime 
          ? 'bg-danger-50 border-danger-200 text-danger-800' 
          : isLowTime 
          ? 'bg-warning-50 border-warning-200 text-warning-800'
          : 'bg-primary-50 border-primary-200 text-primary-800'
      )}
    >
      <motion.div
        animate={isCriticalTime ? { rotate: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 0.5, repeat: isCriticalTime ? Infinity : 0, repeatDelay: 1 }}
      >
        {isCriticalTime ? (
          <AlertTriangle className="w-5 h-5" />
        ) : (
          <Clock className="w-5 h-5" />
        )}
      </motion.div>
      
      <div className="flex flex-col">
        <span className="text-xs font-medium opacity-75">Time Remaining</span>
        <motion.span 
          className={cn(
            'text-lg font-bold tabular-nums',
            isCriticalTime && 'animate-pulse'
          )}
          key={timeRemaining}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {formatTime(timeRemaining)}
        </motion.span>
      </div>
      
      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={cn(
            'h-full rounded-full transition-colors duration-300',
            isCriticalTime 
              ? 'bg-danger-500' 
              : isLowTime 
              ? 'bg-warning-500'
              : 'bg-primary-500'
          )}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  )
}