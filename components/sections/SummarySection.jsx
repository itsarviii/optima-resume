'use client'

import useResumeStore from '@/lib/store/resumeStore'

export default function SummarySection() {
  const text = useResumeStore((s) => s.resume.summary.text)
  const updateSummary = useResumeStore((s) => s.updateSummary)

  return (
    <div>
      <h2 className="text-2xl font-black mb-1 text-gray-900">Professional Summary</h2>
      <p className="text-gray-400 text-sm mb-8">2–4 sentences. Who you are, what you do, what you bring.</p>
      <textarea
        value={text}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Dedicated professional with X years of experience in [field], known for [key strengths]. Passionate about [what drives you]."
        rows={5}
        className="w-full border border-gray-300 rounded-lg focus:border-gray-900 outline-none p-4 text-base bg-white text-gray-900 placeholder:text-gray-400 resize-none transition-colors"
      />
      <p className="text-xs text-gray-300 mt-2 text-right">{text.length} chars</p>
    </div>
  )
}
