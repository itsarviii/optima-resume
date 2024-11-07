'use client'

import useResumeStore from '@/lib/store/resumeStore'
import EntryCard from '@/components/ui/EntryCard'

const PROFICIENCY_LEVELS = ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic']

export default function LanguagesSection() {
  const entries = useResumeStore((s) => s.resume.languages.entries)
  const addEntry = useResumeStore((s) => s.addLanguageEntry)
  const updateEntry = useResumeStore((s) => s.updateLanguageEntry)
  const removeEntry = useResumeStore((s) => s.removeLanguageEntry)

  return (
    <div>
      <h2 className="text-2xl font-black mb-1 text-gray-900">Languages</h2>
      <p className="text-gray-400 text-sm mb-8">Languages you speak professionally.</p>

      {entries.length === 0 && <p className="text-gray-300 text-sm mb-6">No languages added yet.</p>}

      {entries.map((entry) => (
        <EntryCard key={entry.id} onDelete={() => removeEntry(entry.id)}>
          <div className="flex items-center gap-4">
            <input value={entry.language} onChange={(e) => updateEntry(entry.id, { language: e.target.value })} placeholder="Language" className="flex-1 border-b border-gray-300 focus:border-gray-900 outline-none py-1.5 text-sm bg-transparent text-gray-900 placeholder:text-gray-400" />
            <select value={entry.proficiency} onChange={(e) => updateEntry(entry.id, { proficiency: e.target.value })} className="text-sm border-b border-gray-300 focus:border-gray-900 outline-none py-1.5 bg-white text-gray-700">
              {PROFICIENCY_LEVELS.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </EntryCard>
      ))}

      <button onClick={addEntry} className="mt-2 text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg px-5 py-3 hover:border-gray-400 hover:text-gray-700 transition-colors w-full">
        + Add Language
      </button>
    </div>
  )
}
