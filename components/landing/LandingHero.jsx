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
    <div className="h-screen overflow-hidden flex flex-col bg-white">

      {/* Nav */}
      <header className="shrink-0 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <span className="text-sm font-black tracking-tight">
            Optima<span className="text-emerald-600">.</span>
          </span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-5 text-gray-900">
          The resume that<br />
          <span className="text-emerald-600">gets you hired.</span>
        </h1>

        <p className="text-gray-400 text-sm sm:text-base mb-10 max-w-xs leading-relaxed">
          Build a beautiful resume in minutes.<br />Completely free.
        </p>

        <button
          onClick={handleStart}
          className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-base hover:bg-emerald-700 active:scale-[0.98] transition-all"
        >
          Build my resume →
        </button>
      </main>

      {/* Footer */}
      <footer className="shrink-0 pb-6 text-center">
        <p className="text-xs text-gray-300">ATS-safe · PDF · Free</p>
      </footer>

    </div>
  )
}
