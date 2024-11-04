'use client'

import { useRouter } from 'next/navigation'
import useResumeStore from '@/lib/store/resumeStore'

export default function LandingHero() {
  const router = useRouter()
  const resetResume = useResumeStore((s) => s.resetResume)

  const handleStart = () => {
    resetResume()
    router.push('/builder')
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-6xl font-black tracking-tight leading-[1.05] mb-5 text-gray-900 max-w-lg">
          <span className="text-emerald-600">Optima.</span><br />The resume that<br />gets you hired.
        </h1>
        <p className="text-gray-400 text-base mb-10 max-w-xs leading-relaxed">
          No account. No tracking.<br />Runs entirely in your browser.
        </p>
        <button
          onClick={handleStart}
          className="w-full max-w-xs py-4 bg-emerald-600 text-white rounded-xl font-bold text-base hover:bg-emerald-700 transition-colors"
        >
          Build my resume →
        </button>
      </div>
      <div className="px-10 pb-7 shrink-0 text-center">
        <p className="text-xs text-gray-300">ATS-safe · PDF · Free</p>
      </div>
    </div>
  )
}
