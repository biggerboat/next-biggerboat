"use client"

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
}

const Toast = ({ message, type = 'success', duration = 3000, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  const bgColor = type === 'success' ? 'bg-green-500' 
                : type === 'error' ? 'bg-red-500' 
                : 'bg-blue-500'

  return (
    <div className={`fixed top-5 right-5 z-50 p-4 rounded shadow-lg ${bgColor} text-white transition-opacity duration-300`}>
      {message}
    </div>
  )
}

export default Toast 
