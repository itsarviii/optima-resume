'use client'

import useResumeStore from '@/lib/store/resumeStore'
import { TEMPLATES } from '@/lib/templates/templateConfig'

export default function TemplatePicker() {
  const currentTemplate = useResumeStore((s) => s.resume.style.template)
  const updateStyle = useResumeStore((s) => s.updateStyle)

  return (
    <div className="space-y-2">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          onClick={() => updateStyle({ template: t.id })}
          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors
            ${currentTemplate === t.id
              ? 'border-gray-900 bg-gray-50'
              : 'border-gray-200 hover:border-gray-400 bg-white'
            }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">{t.name}</p>
              <p className="text-xs text-gray-400">{t.description}</p>
            </div>
            {currentTemplate === t.id && (
              <span className="text-xs text-gray-500 font-bold">✓</span>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
