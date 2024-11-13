'use client'

import { useState } from 'react'
import useResumeStore from '@/lib/store/resumeStore'
import SectionNav from './SectionNav'

import ContactSection from '@/components/sections/ContactSection'
import SummarySection from '@/components/sections/SummarySection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import LanguagesSection from '@/components/sections/LanguagesSection'
import VolunteerSection from '@/components/sections/VolunteerSection'
import AwardsSection from '@/components/sections/AwardsSection'
import StyleDownloadStep from '@/components/style-download/StyleDownloadStep'
import ResumePreview from '@/components/preview/ResumePreview'

const SECTION_COMPONENTS = {
  contact: ContactSection,
  summary: SummarySection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  certifications: CertificationsSection,
  languages: LanguagesSection,
  volunteer: VolunteerSection,
  awards: AwardsSection,
}

const ALL_STEPS = [
  { id: 'contact', label: 'Contact' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'languages', label: 'Languages' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'awards', label: 'Awards' },
  { id: 'style-download', label: 'Finish' },
]

export default function BuilderShell() {
  const [showPreview, setShowPreview] = useState(false)
  const currentStep = useResumeStore((s) => s.currentStep)

  const sectionVisibility = useResumeStore((s) => s.resume.sectionVisibility)
  const setStep = useResumeStore((s) => s.setStep)
  const resume = useResumeStore((s) => s.resume)

  const handleLogoClick = () => {
    const hasData = resume.contact.fullName || resume.contact.email || resume.experience.entries.length > 0
    if (hasData && !window.confirm('Go back to home? Your progress will be lost.')) return
    setStep('landing')
  }

  const visibleSteps = ALL_STEPS.filter((step) => {
    if (['contact', 'experience', 'education', 'style-download'].includes(step.id)) return true
    if (step.id === 'summary') return sectionVisibility.summary
    if (step.id === 'skills') return sectionVisibility.skills
    return sectionVisibility[step.id] ?? false
  })

  const currentIndex = visibleSteps.findIndex((s) => s.id === currentStep)
  const progress = ((currentIndex + 1) / visibleSteps.length) * 100
  const isFirst = currentIndex === 0
  const isLast = visibleSteps[currentIndex + 1]?.id === 'style-download'

  const goNext = () => {
    const next = visibleSteps[currentIndex + 1]
    if (next) setStep(next.id)
  }

  const goBack = () => {
    const prev = visibleSteps[currentIndex - 1]
    if (prev) setStep(prev.id)
  }

  if (currentStep === 'style-download') {
    return <StyleDownloadStep onBack={goBack} />
  }

  const ActiveSection = SECTION_COMPONENTS[currentStep]

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">

      {/* Progress stripe */}
      <div className="h-0.5 bg-gray-100 w-full shrink-0">
        <div
          className="h-full bg-emerald-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top nav */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-100 bg-white shrink-0">
        <button
          onClick={handleLogoClick}
          className="text-sm font-black tracking-tight hover:opacity-70 transition-opacity"
        >
          Optima<span className="text-emerald-600">.</span>
        </button>

        <span className="text-xs text-gray-400">
          {visibleSteps[currentIndex]?.label} &nbsp;·&nbsp; {currentIndex + 1}/{visibleSteps.length}
        </span>

        <button
          onClick={() => setShowPreview(!showPreview)}
          className="hidden md:block text-xs border border-gray-200 rounded-md px-3 py-1.5 text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-colors"
        >
          {showPreview ? 'Hide preview' : 'Preview →'}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className={`flex flex-col flex-1 min-w-0 ${showPreview ? 'md:w-1/2' : 'w-full'}`}>
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-5 py-10">
              {ActiveSection && <ActiveSection />}
            </div>
          </div>
          <SectionNav onNext={goNext} onBack={goBack} isFirst={isFirst} isLast={isLast} />
        </div>

        {showPreview && (
          <div className="hidden md:flex md:w-1/2 border-l border-gray-100 overflow-hidden bg-[#ADADAD] relative">
            <div className="flex-1 overflow-y-auto pt-8 px-5 pb-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <ResumePreview />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#ADADAD] to-transparent pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  )
}
