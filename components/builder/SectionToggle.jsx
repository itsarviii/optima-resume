'use client'

import useResumeStore from '@/lib/store/resumeStore'

const OPTIONAL_SECTIONS = [
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'languages', label: 'Languages' },
  { id: 'volunteer', label: 'Volunteer Work' },
  { id: 'awards', label: 'Awards & Achievements' },
]

export default function SectionToggle() {
  const sectionVisibility = useResumeStore((s) => s.resume.sectionVisibility)
  const toggleSection = useResumeStore((s) => s.toggleSection)

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Add optional sections</p>
      <div className="flex flex-wrap gap-2">
        {OPTIONAL_SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => toggleSection(s.id)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors
              ${sectionVisibility[s.id]
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
              }`}
          >
            {sectionVisibility[s.id] ? `✓ ${s.label}` : `+ ${s.label}`}
          </button>
        ))}
      </div>
    </div>
  )
}
