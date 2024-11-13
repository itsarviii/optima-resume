'use client'

export default function SectionNav({ onNext, onBack, isFirst, isLast }) {
  return (
    <div className="w-full px-6 py-5 border-t border-gray-200 bg-white">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={isFirst}
          className="px-5 py-2.5 text-sm text-gray-400 hover:text-gray-900 disabled:opacity-0 transition-colors"
          type="button"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
          type="button"
        >
          {isLast ? 'Style & Download →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
