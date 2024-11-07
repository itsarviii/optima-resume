'use client'

import useResumeStore from '@/lib/store/resumeStore'
import EntryCard from '@/components/ui/EntryCard'

export default function ProjectsSection() {
  const entries = useResumeStore((s) => s.resume.projects.entries)
  const addEntry = useResumeStore((s) => s.addProjectEntry)
  const updateEntry = useResumeStore((s) => s.updateProjectEntry)
  const removeEntry = useResumeStore((s) => s.removeProjectEntry)

  const inputCls = 'border-b border-gray-300 focus:border-gray-900 outline-none py-1.5 text-sm bg-transparent text-gray-900 placeholder:text-gray-400'

  return (
    <div>
      <h2 className="text-2xl font-black mb-1 text-gray-900">Projects</h2>
      <p className="text-gray-400 text-sm mb-8">Side projects, open source, freelance work.</p>

      {entries.length === 0 && <p className="text-gray-300 text-sm mb-6">No projects added yet.</p>}

      {entries.map((entry) => (
        <EntryCard key={entry.id} onDelete={() => removeEntry(entry.id)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <input value={entry.name} onChange={(e) => updateEntry(entry.id, { name: e.target.value })} placeholder="Project Name" className={`font-semibold ${inputCls}`} />
            <input value={entry.url} onChange={(e) => updateEntry(entry.id, { url: e.target.value })} placeholder="URL (optional)" className={inputCls} />
          </div>
          <textarea
            ref={(el) => { if (el) { el.style.height = 'auto'; el.style.height = Math.max(el.scrollHeight, 64) + 'px' } }}
            onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = Math.max(e.target.scrollHeight, 64) + 'px' }}
            value={entry.description} onChange={(e) => updateEntry(entry.id, { description: e.target.value })} placeholder="Describe the project and its outcome..." className="w-full border border-gray-300 rounded p-2 text-sm bg-white text-gray-900 placeholder:text-gray-400 focus:border-gray-900 outline-none resize-none mt-1 overflow-hidden" />
          <div className="flex gap-4 mt-3">
            <input value={entry.startDate} onChange={(e) => updateEntry(entry.id, { startDate: e.target.value })} placeholder="Start" className={`w-24 ${inputCls}`} />
            <input value={entry.endDate} onChange={(e) => updateEntry(entry.id, { endDate: e.target.value })} placeholder="End" className={`w-24 ${inputCls}`} />
          </div>
        </EntryCard>
      ))}

      <button onClick={addEntry} className="mt-2 text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg px-5 py-3 hover:border-gray-400 hover:text-gray-700 transition-colors w-full">
        + Add Project
      </button>
    </div>
  )
}
