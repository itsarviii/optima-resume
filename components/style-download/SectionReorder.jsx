'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useResumeStore from '@/lib/store/resumeStore'

const SECTION_LABELS = {
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  volunteer: 'Volunteer',
  awards: 'Awards',
}

function GripIcon() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true">
      <circle cx="3" cy="2.5"  r="1.2" />
      <circle cx="3" cy="7"    r="1.2" />
      <circle cx="3" cy="11.5" r="1.2" />
      <circle cx="7" cy="2.5"  r="1.2" />
      <circle cx="7" cy="7"    r="1.2" />
      <circle cx="7" cy="11.5" r="1.2" />
    </svg>
  )
}

function SortableItem({ id, isOverlay = false }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div
        className={[
          'flex items-center gap-2.5 px-3 py-2.5 rounded-lg border select-none',
          isDragging
            ? 'opacity-40 border-gray-200 bg-white'
            : 'border-gray-200 bg-white hover:border-gray-300',
          isOverlay ? 'shadow-xl border-gray-300 rotate-1' : '',
        ].join(' ')}
      >
        <button
          {...listeners}
          {...attributes}
          className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing touch-none shrink-0 -ml-0.5 outline-none"
          tabIndex={-1}
        >
          <GripIcon />
        </button>
        <span className="text-sm text-gray-700 font-medium">{SECTION_LABELS[id]}</span>
      </div>
    </div>
  )
}

function sectionHasContent(id, resume) {
  const { summary, experience, education, skills, projects, certifications, languages, volunteer, awards, sectionVisibility } = resume
  switch (id) {
    case 'summary':        return sectionVisibility?.summary && !!summary?.text
    case 'experience':     return (experience?.entries ?? []).some(e => e.title || e.company)
    case 'education':      return (education?.entries  ?? []).some(e => e.institution)
    case 'skills':         return sectionVisibility?.skills && (skills?.groups ?? []).some(g => g.skills.length > 0)
    case 'projects':       return sectionVisibility?.projects && (projects?.entries ?? []).some(e => e.name)
    case 'certifications': return sectionVisibility?.certifications && (certifications?.entries ?? []).some(e => e.name)
    case 'languages':      return sectionVisibility?.languages && (languages?.entries ?? []).some(e => e.language)
    case 'volunteer':      return sectionVisibility?.volunteer && (volunteer?.entries ?? []).some(e => e.role || e.organisation)
    case 'awards':         return sectionVisibility?.awards && (awards?.entries ?? []).some(e => e.name)
    default:               return false
  }
}

export default function SectionReorder() {
  const resume = useResumeStore((s) => s.resume)
  const reorderSections = useResumeStore((s) => s.reorderSections)
  const [activeId, setActiveId] = useState(null)

  const { sectionOrder } = resume

  const visibleOrder = sectionOrder.filter((id) => sectionHasContent(id, resume))

  useEffect(() => {
    if (!activeId) return
    document.body.classList.add('is-dragging')
    return () => { document.body.classList.remove('is-dragging') }
  }, [activeId])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = ({ active }) => setActiveId(active.id)

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null)
    if (!over || active.id === over.id) return
    const fromIdx = sectionOrder.indexOf(active.id)
    const toIdx   = sectionOrder.indexOf(over.id)
    reorderSections(fromIdx, toIdx)
  }

  const handleDragCancel = () => setActiveId(null)

  if (visibleOrder.length < 2) return null

  return (
    <>
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Section Order</h3>
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={visibleOrder} strategy={verticalListSortingStrategy}>
        <div className="space-y-1.5">
          {visibleOrder.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 150, easing: 'ease' }}>
        {activeId ? <SortableItem id={activeId} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
    </>
  )
}
