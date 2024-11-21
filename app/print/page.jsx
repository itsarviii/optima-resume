'use client'

import { useEffect, useState, useRef } from 'react'
import ClassicTemplate from '@/components/preview/templates/ClassicTemplate'
import ModernTemplate from '@/components/preview/templates/ModernTemplate'
const TEMPLATES = {
  classic: ClassicTemplate,
  modern:  ModernTemplate,
}

const PAPER_H    = 1123
const TOP_MARGIN    = 60
const BOTTOM_MARGIN = 60
const CONTENT_H  = PAPER_H - TOP_MARGIN - BOTTOM_MARGIN

function computePageBreaks(el) {
  const containerRect = el.getBoundingClientRect()
  const breaks = {}
  let accumulated = 0
  const handledSections = new Set()

  const nodes = el.querySelectorAll('[data-section], [data-entry]')

  for (const node of nodes) {
    const isSection = node.hasAttribute('data-section')
    const isEntry   = node.hasAttribute('data-entry')

    if (isEntry) {
      const parentSection = node.closest('[data-section]')
      if (parentSection && handledSections.has(parentSection.dataset.section)) continue
    }

    const rect = node.getBoundingClientRect()
    const naturalTop = rect.top - containerRect.top
    const h = rect.height

    if (h > CONTENT_H) continue
    if (isSection && h > CONTENT_H / 3) continue

    const adjustedTop = naturalTop + accumulated
    const page        = Math.floor(adjustedTop / PAPER_H)
    const safeBottom  = (page + 1) * PAPER_H - BOTTOM_MARGIN
    const nextStart   = (page + 1) * PAPER_H + TOP_MARGIN

    if (adjustedTop + h > safeBottom) {
      const spacer = Math.ceil(nextStart - adjustedTop)
      if (isSection) {
        breaks[`sec-${node.dataset.section}`] = spacer
        handledSections.add(node.dataset.section)
      } else {
        breaks[node.dataset.entry] = spacer
      }
      accumulated += spacer
    }
  }

  return breaks
}

export default function PrintPage() {
  const [resume, setResume] = useState(null)

  const [pageBreaks, setPageBreaks] = useState(null) // null = not yet computed
  const containerRef = useRef(null)

  useEffect(() => {
    try {
      const data = localStorage.getItem('__print_resume__')
      if (data) setResume(JSON.parse(data))
    } catch {}
  }, [])

  // After the initial render (no spacers), measure and compute breaks
  useEffect(() => {
    if (!resume) return
    requestAnimationFrame(() => {
      const el = containerRef.current
      setPageBreaks(el ? computePageBreaks(el) : {})
    })
  }, [resume])

  // After spacers are set and React has re-rendered, trigger print.
  // In an iframe: signal the parent (parent calls iframe.contentWindow.print()).
  // Standalone: print directly (useful for debugging).
  useEffect(() => {
    if (pageBreaks === null) return
    const t = setTimeout(() => {
      if (window.self !== window.top) {
        window.parent.postMessage('__print_ready__', '*')
      } else {
        window.print()
      }
    }, 200)
    return () => clearTimeout(t)
  }, [pageBreaks])

  if (!resume) return null

  const Template = TEMPLATES[resume.style?.template] ?? ClassicTemplate

  return (
    <>
      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { margin: 0; }
        }
        body { margin: 0; background: white; }
      `}</style>
      <div ref={containerRef} style={{ width: '794px' }}>
        <Template resume={resume} pageBreaks={pageBreaks ?? {}} />
      </div>
    </>
  )
}
