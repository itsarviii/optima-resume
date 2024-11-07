'use client'

import useResumeStore from '@/lib/store/resumeStore'
import { generateId } from '@/lib/utils/generateId'
import SectionToggle from '@/components/builder/SectionToggle'

export default function SkillsSection() {
  const groups = useResumeStore((s) => s.resume.skills.groups)
  const updateSkills = useResumeStore((s) => s.updateSkills)

  const updateGroup = (id, field, value) =>
    updateSkills(groups.map((g) => (g.id === id ? { ...g, [field]: value } : g)))

  const addGroup = () =>
    updateSkills([...groups, { id: generateId(), label: '', skills: [] }])

  const removeGroup = (id) =>
    updateSkills(groups.filter((g) => g.id !== id))

  const handleSkillsInput = (id, raw) => {
    const skills = raw.split(',').map((s) => s.trim()).filter(Boolean)
    updateGroup(id, 'skills', skills)
  }

  const inputCls = 'border-b border-gray-300 focus:border-gray-900 outline-none py-1.5 text-sm bg-transparent text-gray-900 placeholder:text-gray-400'

  return (
    <div>
      <h2 className="text-2xl font-black mb-1 text-gray-900">Skills</h2>
      <p className="text-gray-400 text-sm mb-8">Group your skills or list them all together. Separate with commas.</p>

      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.id} className="border border-gray-300 rounded-lg p-4 relative group/card">
            <input value={group.label} onChange={(e) => updateGroup(group.id, 'label', e.target.value)} placeholder="Category (optional, e.g. Soft Skills, Tools)" className={`w-full mb-3 font-semibold ${inputCls}`} />
            <input value={group.skills.join(', ')} onChange={(e) => handleSkillsInput(group.id, e.target.value)} placeholder="Communication, Team Leadership, Customer Service..." className={`w-full ${inputCls}`} />
            {groups.length > 1 && (
              <button onClick={() => removeGroup(group.id)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 text-xs opacity-0 group-hover/card:opacity-100 transition">
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <button onClick={addGroup} className="mt-4 text-sm text-gray-400 hover:text-gray-700 transition-colors">
        + Add another group
      </button>

      <SectionToggle />
    </div>
  )
}
