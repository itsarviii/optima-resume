'use client'

import { useState } from 'react'
import useResumeStore from '@/lib/store/resumeStore'

export default function DownloadButtons() {
  const resume = useResumeStore((s) => s.resume)
  const [loading, setLoading] = useState(false)

  const missingFields = [
    !resume.contact.fullName && 'name',
    !resume.contact.email && 'email',
  ].filter(Boolean)

  const handlePdf = () => {
    if (loading) return
    setLoading(true)

    localStorage.setItem('__print_resume__', JSON.stringify(resume))

    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;height:1px;border:0;visibility:hidden;'
    document.body.appendChild(iframe)

    const cleanup = () => {
      window.removeEventListener('message', onMessage)
      if (document.body.contains(iframe)) document.body.removeChild(iframe)
      setLoading(false)
    }

    const onMessage = ({ data, source }) => {
      if (data !== '__print_ready__' || source !== iframe.contentWindow) return
      iframe.contentWindow.addEventListener('afterprint', cleanup, { once: true })
      setTimeout(cleanup, 60000) // fallback if afterprint never fires
      iframe.contentWindow.print()
    }

    window.addEventListener('message', onMessage)
    iframe.src = '/print'
  }

  return (
    <div>
      {missingFields.length > 0 && (
        <p className="text-xs text-amber-600 mb-3">
          Heads up: missing {missingFields.join(' and ')} — your resume may look incomplete.
        </p>
      )}
      <button
        onClick={handlePdf}
        disabled={loading}
        className="w-full py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors text-sm"
      >
        {loading ? 'Preparing...' : 'Download PDF →'}
      </button>
      <p className="text-xs text-gray-400 mt-2 text-center">Opens print dialog — save as PDF</p>
    </div>
  )
}
