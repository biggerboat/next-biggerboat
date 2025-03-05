import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
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
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! Looks like you&apos;ve sailed into uncharted waters.</p>
      <Link 
        href="/" 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Return to safe harbor
      </Link>
    </div>
  )
}
