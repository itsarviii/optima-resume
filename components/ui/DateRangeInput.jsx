'use client'

export default function DateRangeInput({ startDate, endDate, current, onChange }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <input
        value={startDate}
        onChange={(e) => onChange({ startDate: e.target.value })}
        placeholder="Jan 2020"
        className="w-28 text-sm border-b border-gray-300 focus:border-gray-900 outline-none py-1 bg-transparent text-gray-800 placeholder:text-gray-400"
      />
      <span className="text-gray-300 text-sm">—</span>
      <input
        value={current ? 'Present' : endDate}
        onChange={(e) => onChange({ endDate: e.target.value })}
        placeholder="Dec 2023"
        disabled={current}
        className="w-28 text-sm border-b border-gray-300 focus:border-gray-900 outline-none py-1 bg-transparent text-gray-800 placeholder:text-gray-400 disabled:text-gray-400"
      />
      <label className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer">
        <input
          type="checkbox"
          checked={current}
          onChange={(e) => onChange({ current: e.target.checked, endDate: e.target.checked ? '' : endDate })}
          className="rounded"
        />
        Present
      </label>
    </div>
  )
}
