'use client'

import useResumeStore from '@/lib/store/resumeStore'

export default function ContactSection() {
  const contact = useResumeStore((s) => s.resume.contact)
  const updateContact = useResumeStore((s) => s.updateContact)

  const field = (key, label, placeholder, type = 'text') => (
    <div>
      <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        value={contact[key]}
        onChange={(e) => updateContact({ [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full border-b border-gray-300 focus:border-gray-900 outline-none py-2 text-base bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors"
      />
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-black mb-1 text-gray-900">Contact Info</h2>
      <p className="text-gray-400 text-sm mb-8">How employers will reach you.</p>
      <div className="space-y-6">
        {field('fullName', 'Full Name', 'Jane Smith')}
        {field('location', 'Location', 'New York, NY')}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {field('email', 'Email', 'jane@example.com', 'email')}
          {field('phone', 'Phone', '+1 555 000 0000', 'tel')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {field('linkedIn', 'LinkedIn', 'linkedin.com/in/janesmith')}
          {field('website', 'Website', 'janesmith.com')}
        </div>
      </div>
    </div>
  )
}
