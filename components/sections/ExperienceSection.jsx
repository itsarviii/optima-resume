'use client'

import useResumeStore from '@/lib/store/resumeStore'
import EntryCard from '@/components/ui/EntryCard'
import BulletEditor from '@/components/ui/BulletEditor'
import DateRangeInput from '@/components/ui/DateRangeInput'

export default function ExperienceSection() {
  const entries = useResumeStore((s) => s.resume.experience.entries)
  const addEntry = useResumeStore((s) => s.addExperienceEntry)
  const updateEntry = useResumeStore((s) => s.updateExperienceEntry)
  const removeEntry = useResumeStore((s) => s.removeExperienceEntry)

  const update = (id, field, value) => updateEntry(id, { [field]: value })

  const inputCls = 'border-b border-gray-300 focus:border-gray-900 outline-none py-1.5 text-sm bg-transparent text-gray-900 placeholder:text-gray-400'

  return (
    <div>
      <h2 className="text-2xl font-black mb-1 text-gray-900">Work Experience</h2>
      <p className="text-gray-400 text-sm mb-8">Start with your most recent role.</p>

      {entries.length === 0 && (
        <p className="text-gray-300 text-sm mb-6">No experience added yet.</p>
      )}

      {entries.map((entry) => (
        <EntryCard key={entry.id} onDelete={() => removeEntry(entry.id)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input value={entry.title} onChange={(e) => update(entry.id, 'title', e.target.value)} placeholder="Job Title" className={inputCls} />
            <input value={entry.company} onChange={(e) => update(entry.id, 'company', e.target.value)} placeholder="Company" className={inputCls} />
          </div>
          <input value={entry.location} onChange={(e) => update(entry.id, 'location', e.target.value)} placeholder="Location (optional)" className={`w-full mb-4 ${inputCls}`} />
          <DateRangeInput startDate={entry.startDate} endDate={entry.endDate} current={entry.current} onChange={(data) => updateEntry(entry.id, data)} />
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-2">Achievements & responsibilities</p>
            <BulletEditor bullets={entry.bullets} onChange={(bullets) => update(entry.id, 'bullets', bullets)} />
          </div>
        </EntryCard>
      ))}

      <button onClick={addEntry} className="mt-2 text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg px-5 py-3 hover:border-gray-400 hover:text-gray-700 transition-colors w-full">
        + Add Role
      </button>
    </div>
  )
}
