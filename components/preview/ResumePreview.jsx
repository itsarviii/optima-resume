'use client'

import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import useResumeStore from '@/lib/store/resumeStore'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
const TEMPLATES = {
  classic: ClassicTemplate,
  modern:  ModernTemplate,
}

const PAPER_W = 794
const PAPER_H = 1123
const NO_BREAKS = {}

const TOP_MARGIN    = 60
const BOTTOM_MARGIN = 60
const CONTENT_H = PAPER_H - TOP_MARGIN - BOTTOM_MARGIN

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

export default function ResumePreview() {
  const resume = useResumeStore((s) => s.resume)
  const Template = TEMPLATES[resume.style?.template] ?? ClassicTemplate

  const wrapperRef = useRef(null)
  const measureRef = useRef(null)
  const [scale, setScale] = useState(0)
  const [naturalHeight, setNaturalHeight] = useState(PAPER_H)
  const [pageBreaks, setPageBreaks] = useState(NO_BREAKS)

  useLayoutEffect(() => {
    const w = wrapperRef.current?.getBoundingClientRect().width ?? 0
    if (w > 0) setScale(w / PAPER_W)
  }, [])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      if (w > 0) setScale(w / PAPER_W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = measureRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setNaturalHeight(entry.contentRect.height)
      setPageBreaks(computePageBreaks(el))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const spacerSum  = Object.values(pageBreaks).reduce((s, v) => s + v, 0)
  const totalHeight = naturalHeight + spacerSum
  const pageCount  = scale > 0 ? Math.max(1, Math.ceil(totalHeight / PAPER_H)) : 0

  return (
    <div ref={wrapperRef} style={{ width: '100%' }}>

      <div
        ref={measureRef}
        style={{
          position: 'fixed',
          left: -(PAPER_W + 10),
          top: 0,
          width: PAPER_W,
          visibility: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <Template resume={resume} pageBreaks={NO_BREAKS} />
      </div>

      {pageCount > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Array.from({ length: pageCount }, (_, i) => (
            <div
              key={i}
              style={{
                width: PAPER_W * scale,
                height: PAPER_H * scale,
                overflow: 'hidden',
                borderRadius: 3,
                boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
                background: 'white',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: PAPER_W,
                  transformOrigin: 'top left',
                  transform: `scale(${scale}) translateY(-${i * PAPER_H}px)`,
                }}
              >
                <Template resume={resume} pageBreaks={pageBreaks} />
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
