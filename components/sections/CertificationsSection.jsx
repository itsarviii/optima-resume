'use client'

import useResumeStore from '@/lib/store/resumeStore'
import EntryCard from '@/components/ui/EntryCard'

export default function CertificationsSection() {
  const entries = useResumeStore((s) => s.resume.certifications.entries)
  const addEntry = useResumeStore((s) => s.addCertificationEntry)
  const updateEntry = useResumeStore((s) => s.updateCertificationEntry)
  const removeEntry = useResumeStore((s) => s.removeCertificationEntry)

  const inputCls = 'border-b border-gray-300 focus:border-gray-900 outline-none py-1.5 text-sm bg-transparent text-gray-900 placeholder:text-gray-400'

  return (
    <div>
      <h2 className="text-2xl font-black mb-1 text-gray-900">Certifications</h2>
      <p className="text-gray-400 text-sm mb-8">Professional certifications and licences.</p>

      {entries.length === 0 && <p className="text-gray-300 text-sm mb-6">No certifications added yet.</p>}

      {entries.map((entry) => (
        <EntryCard key={entry.id} onDelete={() => removeEntry(entry.id)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <input value={entry.name} onChange={(e) => updateEntry(entry.id, { name: e.target.value })} placeholder="Certification Name" className={inputCls} />
            <input value={entry.issuer} onChange={(e) => updateEntry(entry.id, { issuer: e.target.value })} placeholder="Issuing Body" className={inputCls} />
          </div>
          <div className="flex gap-4">
            <input value={entry.date} onChange={(e) => updateEntry(entry.id, { date: e.target.value })} placeholder="Date Issued" className={`w-32 ${inputCls}`} />
            <input value={entry.expiry} onChange={(e) => updateEntry(entry.id, { expiry: e.target.value })} placeholder="Expiry (optional)" className={`w-32 ${inputCls}`} />
          </div>
        </EntryCard>
      ))}

      <button onClick={addEntry} className="mt-2 text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg px-5 py-3 hover:border-gray-400 hover:text-gray-700 transition-colors w-full">
        + Add Certification
      </button>
    </div>
  )
}
