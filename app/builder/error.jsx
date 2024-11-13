'use client'

import { useRouter } from 'next/navigation'

export default function BuilderError({ error, reset }) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h2>
        <p className="text-sm text-gray-400 mb-6">
          Your progress may have been lost. You can try again or start over.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm rounded-lg hover:border-gray-400 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  )
}
