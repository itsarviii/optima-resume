import { create } from 'zustand'
import { generateId } from '../utils/generateId'

const defaultResume = {
  contact: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    website: '',
  },
  summary: { text: '' },
  experience: { entries: [] },
  education: { entries: [] },
  skills: { groups: [{ id: generateId(), label: '', skills: [] }] },
  projects: { entries: [] },
  certifications: { entries: [] },
  languages: { entries: [] },
  volunteer: { entries: [] },
  awards: { entries: [] },
  style: {
    template: 'classic',
    accentColour: '#000000',
  },
  sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'volunteer', 'awards'],
  sectionVisibility: {
    summary: true,
    skills: true,
    projects: false,
    certifications: false,
    languages: false,
    volunteer: false,
    awards: false,
  },
}

const useResumeStore = create((set) => ({
  resume: defaultResume,
  currentStep: 'landing',

  updateContact: (data) =>
    set((s) => ({ resume: { ...s.resume, contact: { ...s.resume.contact, ...data } } })),

  updateSummary: (text) =>
    set((s) => ({ resume: { ...s.resume, summary: { text } } })),

  // experience
  addExperienceEntry: () =>
    set((s) => ({
      resume: {
        ...s.resume,
        experience: {
          entries: [
            ...s.resume.experience.entries,
            { id: generateId(), company: '', title: '', location: '', startDate: '', endDate: '', current: false, bullets: [] },
          ],
        },
      },
    })),

  updateExperienceEntry: (id, data) =>
    set((s) => ({
      resume: {
        ...s.resume,
        experience: {
          entries: s.resume.experience.entries.map((e) => (e.id === id ? { ...e, ...data } : e)),
        },
      },
    })),

  removeExperienceEntry: (id) =>
    set((s) => ({
      resume: {
        ...s.resume,
        experience: { entries: s.resume.experience.entries.filter((e) => e.id !== id) },
      },
    })),

  // education
  addEducationEntry: () =>
    set((s) => ({
      resume: {
        ...s.resume,
        education: {
          entries: [
            ...s.resume.education.entries,
            { id: generateId(), institution: '', degree: '', field: '', location: '', startDate: '', endDate: '', current: false, grade: '', bullets: [] },
          ],
        },
      },
    })),

  updateEducationEntry: (id, data) =>
    set((s) => ({
      resume: {
        ...s.resume,
        education: {
          entries: s.resume.education.entries.map((e) => (e.id === id ? { ...e, ...data } : e)),
        },
      },
    })),

  removeEducationEntry: (id) =>
    set((s) => ({
      resume: {
        ...s.resume,
        education: { entries: s.resume.education.entries.filter((e) => e.id !== id) },
      },
    })),

  updateSkills: (groups) =>
    set((s) => ({ resume: { ...s.resume, skills: { groups } } })),

  // projects
  addProjectEntry: () =>
    set((s) => ({
      resume: {
        ...s.resume,
        projects: {
          entries: [
            ...s.resume.projects.entries,
            { id: generateId(), name: '', description: '', url: '', startDate: '', endDate: '' },
          ],
        },
      },
    })),

  updateProjectEntry: (id, data) =>
    set((s) => ({
      resume: {
        ...s.resume,
        projects: {
          entries: s.resume.projects.entries.map((e) => (e.id === id ? { ...e, ...data } : e)),
        },
      },
    })),

  removeProjectEntry: (id) =>
    set((s) => ({
      resume: {
        ...s.resume,
        projects: { entries: s.resume.projects.entries.filter((e) => e.id !== id) },
      },
    })),

  // certifications
  addCertificationEntry: () =>
    set((s) => ({
      resume: {
        ...s.resume,
        certifications: {
          entries: [
            ...s.resume.certifications.entries,
            { id: generateId(), name: '', issuer: '', date: '', expiry: '' },
          ],
        },
      },
    })),

  updateCertificationEntry: (id, data) =>
    set((s) => ({
      resume: {
        ...s.resume,
        certifications: {
          entries: s.resume.certifications.entries.map((e) => (e.id === id ? { ...e, ...data } : e)),
        },
      },
    })),

  removeCertificationEntry: (id) =>
    set((s) => ({
      resume: {
        ...s.resume,
        certifications: { entries: s.resume.certifications.entries.filter((e) => e.id !== id) },
      },
    })),

  // languages
  addLanguageEntry: () =>
    set((s) => ({
      resume: {
        ...s.resume,
        languages: {
          entries: [
            ...s.resume.languages.entries,
            { id: generateId(), language: '', proficiency: 'Professional' },
          ],
        },
      },
    })),

  updateLanguageEntry: (id, data) =>
    set((s) => ({
      resume: {
        ...s.resume,
        languages: {
          entries: s.resume.languages.entries.map((e) => (e.id === id ? { ...e, ...data } : e)),
        },
      },
    })),

  removeLanguageEntry: (id) =>
    set((s) => ({
      resume: {
        ...s.resume,
        languages: { entries: s.resume.languages.entries.filter((e) => e.id !== id) },
      },
    })),

  // volunteer
  addVolunteerEntry: () =>
    set((s) => ({
      resume: {
        ...s.resume,
        volunteer: {
          entries: [
            ...s.resume.volunteer.entries,
            { id: generateId(), organisation: '', role: '', startDate: '', endDate: '', current: false, description: '' },
          ],
        },
      },
    })),

  updateVolunteerEntry: (id, data) =>
    set((s) => ({
      resume: {
        ...s.resume,
        volunteer: {
          entries: s.resume.volunteer.entries.map((e) => (e.id === id ? { ...e, ...data } : e)),
        },
      },
    })),

  removeVolunteerEntry: (id) =>
    set((s) => ({
      resume: {
        ...s.resume,
        volunteer: { entries: s.resume.volunteer.entries.filter((e) => e.id !== id) },
      },
    })),

  // awards
  addAwardEntry: () =>
    set((s) => ({
      resume: {
        ...s.resume,
        awards: {
          entries: [
            ...s.resume.awards.entries,
            { id: generateId(), name: '', issuer: '', date: '', description: '' },
          ],
        },
      },
    })),

  updateAwardEntry: (id, data) =>
    set((s) => ({
      resume: {
        ...s.resume,
        awards: {
          entries: s.resume.awards.entries.map((e) => (e.id === id ? { ...e, ...data } : e)),
        },
      },
    })),

  removeAwardEntry: (id) =>
    set((s) => ({
      resume: {
        ...s.resume,
        awards: { entries: s.resume.awards.entries.filter((e) => e.id !== id) },
      },
    })),

  reorderSections: (fromIndex, toIndex) =>
    set((s) => {
      const order = [...s.resume.sectionOrder]
      const [moved] = order.splice(fromIndex, 1)
      order.splice(toIndex, 0, moved)
      return { resume: { ...s.resume, sectionOrder: order } }
    }),

  updateStyle: (style) =>
    set((s) => ({ resume: { ...s.resume, style: { ...s.resume.style, ...style } } })),

  toggleSection: (section) =>
    set((s) => ({
      resume: {
        ...s.resume,
        sectionVisibility: {
          ...s.resume.sectionVisibility,
          [section]: !s.resume.sectionVisibility[section],
        },
      },
    })),

  setStep: (step) => set({ currentStep: step }),

  resetResume: () =>
    set({
      resume: {
        ...defaultResume,
        skills: { groups: [{ id: generateId(), label: '', skills: [] }] },
      },
      currentStep: 'contact',
    }),
}))

export default useResumeStore
