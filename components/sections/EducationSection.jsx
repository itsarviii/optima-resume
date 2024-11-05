'use client'

import useResumeStore from '@/lib/store/resumeStore'
import EntryCard from '@/components/ui/EntryCard'
import DateRangeInput from '@/components/ui/DateRangeInput'
import BulletEditor from '@/components/ui/BulletEditor'

export default function EducationSection() {
  const entries = useResumeStore((s) => s.resume.education.entries)
  const addEntry = useResumeStore((s) => s.addEducationEntry)
  const updateEntry = useResumeStore((s) => s.updateEducationEntry)
  const removeEntry = useResumeStore((s) => s.removeEducationEntry)

  const inputCls = 'border-b border-gray-300 focus:border-gray-900 outline-none py-1.5 text-sm bg-transparent text-gray-900 placeholder:text-gray-400'

  return (
    <div>
      <h2 className="text-2xl font-black mb-1 text-gray-900">Education</h2>
      <p className="text-gray-400 text-sm mb-8">Degrees, diplomas, and qualifications.</p>

      {entries.length === 0 && (
        <p className="text-gray-300 text-sm mb-6">No education added yet.</p>
      )}

      {entries.map((entry) => (
        <EntryCard key={entry.id} onDelete={() => removeEntry(entry.id)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input value={entry.institution} onChange={(e) => updateEntry(entry.id, { institution: e.target.value })} placeholder="University / School" className={inputCls} />
            <input value={entry.location} onChange={(e) => updateEntry(entry.id, { location: e.target.value })} placeholder="Location" className={inputCls} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input value={entry.degree} onChange={(e) => updateEntry(entry.id, { degree: e.target.value })} placeholder="Degree (e.g. B.Sc.)" className={inputCls} />
            <input value={entry.field} onChange={(e) => updateEntry(entry.id, { field: e.target.value })} placeholder="Field of Study" className={inputCls} />
          </div>
          <div className="flex items-center gap-6 mb-4">
            <DateRangeInput startDate={entry.startDate} endDate={entry.endDate} current={entry.current} onChange={(data) => updateEntry(entry.id, data)} />
            <input value={entry.grade} onChange={(e) => updateEntry(entry.id, { grade: e.target.value })} placeholder="GPA / Grade (optional)" className={`w-36 ${inputCls}`} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">Achievements & relevant coursework</p>
            <BulletEditor bullets={entry.bullets || []} onChange={(bullets) => updateEntry(entry.id, { bullets })} />
          </div>
        </EntryCard>
      ))}

      <button onClick={addEntry} className="mt-2 text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg px-5 py-3 hover:border-gray-400 hover:text-gray-700 transition-colors w-full">
        + Add Education
      </button>
    </div>
  )
}
