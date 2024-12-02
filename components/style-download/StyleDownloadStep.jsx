'use client'

import { useState } from 'react'
import useResumeStore from '@/lib/store/resumeStore'
import ResumePreview from '@/components/preview/ResumePreview'
import TemplatePicker from './TemplatePicker'
import ColourPicker from './ColourPicker'
import DownloadButtons from './DownloadButtons'
import SectionReorder from './SectionReorder'

export default function StyleDownloadStep({ onBack }) {
  const [mobileTab, setMobileTab] = useState('preview')
  const resume = useResumeStore((s) => s.resume)
  const setStep = useResumeStore((s) => s.setStep)

  const handleLogoClick = () => {
    const hasData = resume.contact.fullName || resume.contact.email || resume.experience.entries.length > 0
    if (hasData && !window.confirm('Go back to home? Your progress will be lost.')) return
    setStep('landing')
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3.5 border-b border-gray-100 shrink-0">
        <button
          onClick={handleLogoClick}
          className="text-sm font-black tracking-tight hover:opacity-70 transition-opacity"
        >
          Optima<span className="text-emerald-600">.</span>
        </button>
        <span className="text-xs text-gray-400">Style & Download</span>
        <button
          onClick={onBack}
          className="text-xs border border-gray-200 rounded-md px-3 py-1.5 text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Mobile tab bar */}
      <div className="md:hidden flex border-b border-gray-100 shrink-0">
        {['preview', 'customise'].map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={[
              'flex-1 py-2.5 text-xs font-semibold tracking-wide capitalize transition-colors',
              mobileTab === tab
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-400',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className={[
          'w-full md:w-72 shrink-0 md:border-r border-gray-200 flex flex-col bg-white',
          mobileTab === 'customise' ? 'flex' : 'hidden',
          'md:flex',
        ].join(' ')}>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Template</h3>
              <TemplatePicker />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Accent Colour</h3>
              <ColourPicker />
            </div>
            <SectionReorder />
          </div>

          {/* Download pinned to bottom */}
          <div className="shrink-0 border-t border-gray-100 p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Download</h3>
            <DownloadButtons />
          </div>
        </div>

        {/* Preview */}
        <div className={[
          'flex-1 overflow-y-auto bg-[#ADADAD] px-4 md:px-10 py-8 md:py-12',
          '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          mobileTab === 'preview' ? 'flex' : 'hidden',
          'md:flex',
        ].join(' ')}>
          <div className="w-full max-w-140 mx-auto">
            <ResumePreview />
          </div>
        </div>

      </div>
    </div>
  )
}
