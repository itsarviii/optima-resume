'use client'

import useResumeStore from '@/lib/store/resumeStore'
import EntryCard from '@/components/ui/EntryCard'
import DateRangeInput from '@/components/ui/DateRangeInput'

export default function VolunteerSection() {
  const entries = useResumeStore((s) => s.resume.volunteer.entries)
  const addEntry = useResumeStore((s) => s.addVolunteerEntry)
  const updateEntry = useResumeStore((s) => s.updateVolunteerEntry)
  const removeEntry = useResumeStore((s) => s.removeVolunteerEntry)

  const inputCls = 'border-b border-gray-300 focus:border-gray-900 outline-none py-1.5 text-sm bg-transparent text-gray-900 placeholder:text-gray-400'

  return (
    <div>
      <h2 className="text-2xl font-black mb-1 text-gray-900">Volunteer Work</h2>
      <p className="text-gray-400 text-sm mb-8">Community involvement and unpaid contributions.</p>

      {entries.length === 0 && <p className="text-gray-300 text-sm mb-6">No volunteer work added yet.</p>}

      {entries.map((entry) => (
        <EntryCard key={entry.id} onDelete={() => removeEntry(entry.id)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <input value={entry.organisation} onChange={(e) => updateEntry(entry.id, { organisation: e.target.value })} placeholder="Organisation" className={inputCls} />
            <input value={entry.role} onChange={(e) => updateEntry(entry.id, { role: e.target.value })} placeholder="Role" className={inputCls} />
          </div>
          <DateRangeInput startDate={entry.startDate} endDate={entry.endDate} current={entry.current} onChange={(data) => updateEntry(entry.id, data)} />
          <textarea
            ref={(el) => { if (el) { el.style.height = 'auto'; el.style.height = Math.max(el.scrollHeight, 64) + 'px' } }}
            onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = Math.max(e.target.scrollHeight, 64) + 'px' }}
            value={entry.description} onChange={(e) => updateEntry(entry.id, { description: e.target.value })} placeholder="What did you do and what was the impact?" className="w-full border border-gray-300 rounded p-2 text-sm bg-white text-gray-900 placeholder:text-gray-400 focus:border-gray-900 outline-none resize-none mt-3 overflow-hidden" />
        </EntryCard>
      ))}

      <button onClick={addEntry} className="mt-2 text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg px-5 py-3 hover:border-gray-400 hover:text-gray-700 transition-colors w-full">
        + Add Volunteer Work
      </button>
    </div>
  )
}
