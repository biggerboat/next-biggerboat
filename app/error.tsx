'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <Image 
        src="/logo.png" 
        alt="Biggerboat" 
        width={279} 
        height={107} 
        className="mb-8" 
        priority
      />
      <h1 className="text-4xl font-bold mb-4">Er is iets misgegaan</h1>
      <p className="text-xl mb-8">Sorry, er is een fout opgetreden. Probeer het opnieuw.</p>
      <div className="flex space-x-4">
        <button
          onClick={reset}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Probeer opnieuw
        </button>
        <Link 
          href="/" 
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Terug naar de homepage
        </Link>
      </div>
    </div>
  )
} 
