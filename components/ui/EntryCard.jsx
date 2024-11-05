'use client'

export default function EntryCard({ children, onDelete }) {
  return (
    <div className="border border-gray-300 rounded-lg px-4 pt-8 pb-4 mb-3 relative group bg-white">
      {children}
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 text-xs"
        type="button"
      >
        Remove
      </button>
    </div>
  )
}
