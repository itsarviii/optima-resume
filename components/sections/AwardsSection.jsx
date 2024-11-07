'use client'

import useResumeStore from '@/lib/store/resumeStore'
import EntryCard from '@/components/ui/EntryCard'

export default function AwardsSection() {
  const entries = useResumeStore((s) => s.resume.awards.entries)
  const addEntry = useResumeStore((s) => s.addAwardEntry)
  const updateEntry = useResumeStore((s) => s.updateAwardEntry)
  const removeEntry = useResumeStore((s) => s.removeAwardEntry)

  const inputCls = 'border-b border-gray-300 focus:border-gray-900 outline-none py-1.5 text-sm bg-transparent text-gray-900 placeholder:text-gray-400'

  return (
    <div>
      <h2 className="text-2xl font-black mb-1 text-gray-900">Awards & Achievements</h2>
      <p className="text-gray-400 text-sm mb-8">Recognition, honours, and notable achievements.</p>

      {entries.length === 0 && <p className="text-gray-300 text-sm mb-6">No awards added yet.</p>}

      {entries.map((entry) => (
        <EntryCard key={entry.id} onDelete={() => removeEntry(entry.id)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <input value={entry.name} onChange={(e) => updateEntry(entry.id, { name: e.target.value })} placeholder="Award Name" className={inputCls} />
            <input value={entry.issuer} onChange={(e) => updateEntry(entry.id, { issuer: e.target.value })} placeholder="Issued by" className={inputCls} />
          </div>
          <div className="flex items-start gap-4">
            <input value={entry.date} onChange={(e) => updateEntry(entry.id, { date: e.target.value })} placeholder="Date" className={`w-28 ${inputCls}`} />
            <input value={entry.description} onChange={(e) => updateEntry(entry.id, { description: e.target.value })} placeholder="Brief description (optional)" className={`flex-1 ${inputCls}`} />
          </div>
        </EntryCard>
      ))}

      <button onClick={addEntry} className="mt-2 text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg px-5 py-3 hover:border-gray-400 hover:text-gray-700 transition-colors w-full">
        + Add Award
      </button>
    </div>
  )
}
