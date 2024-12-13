'use client'

import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import useResumeStore from '@/lib/store/resumeStore'
import { ACCENT_PRESETS } from '@/lib/templates/templateConfig'

export default function ColourPicker() {
  const [showCustom, setShowCustom] = useState(false)
  const accentColour = useResumeStore((s) => s.resume.style.accentColour)
  const updateStyle = useResumeStore((s) => s.updateStyle)

  const isPreset = ACCENT_PRESETS.some((p) => p.value === accentColour)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {ACCENT_PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => { updateStyle({ accentColour: preset.value }); setShowCustom(false) }}
            title={preset.label}
            className={`w-8 h-8 rounded-full border-2 transition-all
              ${accentColour === preset.value ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-105'}`}
            style={{ backgroundColor: preset.value }}
          />
        ))}
        <button
          onClick={() => setShowCustom(!showCustom)}
          className={`w-8 h-8 rounded-full border-2 transition-all
            ${!isPreset && accentColour !== '#000000' ? 'border-gray-900 scale-110' : 'border-gray-300 hover:scale-105'}
            bg-linear-to-br from-pink-300 via-yellow-200 to-blue-300`}
          title="Custom"
        />
      </div>

      {showCustom && (
        <div className="pt-1">
          <HexColorPicker
            color={accentColour}
            onChange={(color) => updateStyle({ accentColour: color })}
            style={{ width: '100%', height: '140px' }}
          />
          <p className="text-xs text-gray-400 mt-2 font-mono">{accentColour}</p>
        </div>
      )}
    </div>
  )
}
