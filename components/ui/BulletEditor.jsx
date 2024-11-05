'use client'

import { useRef } from 'react'

export default function BulletEditor({ bullets, onChange }) {
  const refs = useRef({})

  const update = (index, value) => {
    const updated = [...bullets]
    updated[index] = value
    onChange(updated)
  }

  const add = () => {
    onChange([...bullets, ''])
    setTimeout(() => {
      const newIndex = bullets.length
      refs.current[newIndex]?.focus()
    }, 50)
  }

  const remove = (index) => {
    onChange(bullets.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      add()
    }
    if (e.key === 'Backspace' && bullets[index] === '' && bullets.length > 0) {
      e.preventDefault()
      remove(index)
      setTimeout(() => refs.current[index - 1]?.focus(), 50)
    }
  }

  return (
    <div className="space-y-1.5">
      {bullets.map((bullet, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-gray-300 mt-2.5 text-xs">•</span>
          <input
            ref={(el) => (refs.current[i] = el)}
            value={bullet}
            onChange={(e) => update(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            placeholder="Describe what you did and the impact..."
            className="flex-1 text-sm border-b border-gray-300 focus:border-gray-900 outline-none py-1.5 bg-transparent text-gray-800 placeholder:text-gray-400"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-xs text-gray-400 hover:text-gray-700 mt-1 transition-colors"
      >
        + Add bullet
      </button>
    </div>
  )
}
