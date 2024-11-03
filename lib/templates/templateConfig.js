export const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and formal',
  },
  {
    id: 'modern',
    name: 'Minimal',
    description: 'Clean, spacious, sans-serif',
  },
]

export const ACCENT_PRESETS = [
  { label: 'Black', value: '#000000' },
  { label: 'Navy', value: '#1e3a5f' },
  { label: 'Teal', value: '#0d7377' },
  { label: 'Charcoal', value: '#36454f' },
  { label: 'Burgundy', value: '#6d2b3d' },
]

export const getTemplate = (id) => TEMPLATES.find((t) => t.id === id) || TEMPLATES[0]
