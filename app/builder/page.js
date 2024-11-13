'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useResumeStore from '@/lib/store/resumeStore'

const BuilderShell = dynamic(() => import('@/components/builder/BuilderShell'), { ssr: false })

export default function BuilderPage() {
  const router = useRouter()
  const currentStep = useResumeStore((s) => s.currentStep)

  useEffect(() => {
    if (currentStep === 'landing') {
      router.replace('/')
    }
  }, [currentStep, router])

  if (currentStep === 'landing') return null

  return <BuilderShell />
}
