'use client'

// Minimal — sans-serif, light-weight name, understated section labels, lots of breathing room

const DEFAULT_ORDER = ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'volunteer', 'awards']

export default function ModernTemplate({ resume, pageBreaks = {} }) {
  const { contact, summary, experience, education, skills, projects, certifications, languages, volunteer, awards, style, sectionVisibility, sectionOrder } = resume
  const accent = style?.accentColour || '#000000'
  const order = sectionOrder ?? DEFAULT_ORDER

  const SectionTitle = ({ children }) => (
    <div className="mb-3" style={{ breakAfter: 'avoid' }}>
      <h3 className="text-[9.5px] uppercase tracking-widest" style={{ color: accent }}>
        {children}
      </h3>
      <div style={{ height: '0.5px', background: accent, opacity: 0.25, marginTop: '5px' }} />
    </div>
  )

  const Spacer = ({ id }) =>
    pageBreaks[id] > 0 ? <div aria-hidden="true" style={{ height: pageBreaks[id] }} /> : null

  const filteredExperience    = (experience?.entries     ?? []).filter(e => e.title || e.company)
  const filteredEducation     = (education?.entries      ?? []).filter(e => e.institution)
  const filteredProjects      = (projects?.entries       ?? []).filter(e => e.name)
  const filteredCertifications= (certifications?.entries ?? []).filter(e => e.name)
  const filteredLanguages     = (languages?.entries      ?? []).filter(e => e.language)
  const filteredVolunteer     = (volunteer?.entries      ?? []).filter(e => e.role || e.organisation)
  const filteredAwards        = (awards?.entries         ?? []).filter(e => e.name)

  const sections = {
    summary: () => sectionVisibility?.summary && summary?.text ? (
      <>
        <Spacer id="sec-summary" />
        <div data-section="summary" className="mb-6" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Summary</SectionTitle>
          <p style={{ fontSize: '12.5px', color: '#4b5563', lineHeight: 1.7 }}>{summary.text}</p>
        </div>
      </>
    ) : null,

    experience: () => filteredExperience.length > 0 ? (
      <>
        <Spacer id="sec-experience" />
        <div data-section="experience" className="mb-6" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Experience</SectionTitle>
          {filteredExperience.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="mb-4" style={{ breakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{e.title}</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af', flexShrink: 0, paddingLeft: '8px' }}>
                    {e.startDate}{e.endDate || e.current ? ` – ${e.current ? 'Present' : e.endDate}` : ''}
                  </span>
                </div>
                {(e.company || e.location) && (
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                    {e.company}{e.location ? `, ${e.location}` : ''}
                  </div>
                )}
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul style={{ marginTop: '4px' }}>
                    {e.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: 'flex', gap: '8px', fontSize: '12.5px', color: '#374151', marginBottom: '2px' }}>
                        <span style={{ color: accent, flexShrink: 0, fontWeight: 700 }}>·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,

    education: () => filteredEducation.length > 0 ? (
      <>
        <Spacer id="sec-education" />
        <div data-section="education" className="mb-6" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Education</SectionTitle>
          {filteredEducation.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{e.institution}</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af', flexShrink: 0, paddingLeft: '8px' }}>
                    {e.startDate}{e.endDate || e.current ? ` – ${e.current ? 'Present' : e.endDate}` : ''}
                  </span>
                </div>
                {e.location && <div style={{ fontSize: '12px', color: '#6b7280' }}>{e.location}</div>}
                <div style={{ fontSize: '12.5px', color: '#4b5563' }}>
                  {e.degree}{e.field ? `, ${e.field}` : ''}{e.grade ? ` · ${e.grade}` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,

    skills: () => sectionVisibility?.skills && (skills?.groups ?? []).some(g => g.skills.length > 0) ? (
      <>
        <Spacer id="sec-skills" />
        <div data-section="skills" className="mb-6" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Skills</SectionTitle>
          {(skills?.groups ?? []).filter(g => g.skills.length > 0).map((g) => (
            <div key={g.id} style={{ display: 'flex', gap: '8px', fontSize: '12.5px', marginBottom: '3px' }}>
              {g.label && <span style={{ color: '#6b7280', fontWeight: 600, flexShrink: 0 }}>{g.label}:</span>}
              <span style={{ color: '#374151' }}>{g.skills.join(' · ')}</span>
            </div>
          ))}
        </div>
      </>
    ) : null,

    projects: () => sectionVisibility?.projects && filteredProjects.length > 0 ? (
      <>
        <Spacer id="sec-projects" />
        <div data-section="projects" className="mb-6" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Projects</SectionTitle>
          {filteredProjects.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{e.name}</span>
                  {(e.startDate || e.endDate) && (
                    <span style={{ fontSize: '11px', color: '#9ca3af', flexShrink: 0, paddingLeft: '8px' }}>
                      {e.startDate}{e.endDate ? ` – ${e.endDate}` : ''}
                    </span>
                  )}
                </div>
                {e.url && <div style={{ fontSize: '11px', color: '#9ca3af' }}>{e.url}</div>}
                {e.description && <div style={{ fontSize: '12.5px', color: '#4b5563' }}>{e.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,

    certifications: () => sectionVisibility?.certifications && filteredCertifications.length > 0 ? (
      <>
        <Spacer id="sec-certifications" />
        <div data-section="certifications" className="mb-6" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Certifications</SectionTitle>
          {filteredCertifications.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '3px', breakInside: 'avoid' }}>
                <span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{e.name}</span>
                  {e.issuer && <span style={{ color: '#6b7280' }}>, {e.issuer}</span>}
                </span>
                <span style={{ fontSize: '11px', color: '#9ca3af', flexShrink: 0, paddingLeft: '8px' }}>
                  {e.date}{e.expiry ? ` – ${e.expiry}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,

    languages: () => sectionVisibility?.languages && filteredLanguages.length > 0 ? (
      <>
        <Spacer id="sec-languages" />
        <div data-section="languages" className="mb-6" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Languages</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 20px' }}>
            {filteredLanguages.map((e) => (
              <span key={e.id} style={{ fontSize: '12.5px', color: '#374151' }}>
                <span style={{ fontWeight: 600 }}>{e.language}</span>
                <span style={{ color: '#9ca3af' }}> — {e.proficiency}</span>
              </span>
            ))}
          </div>
        </div>
      </>
    ) : null,

    volunteer: () => sectionVisibility?.volunteer && filteredVolunteer.length > 0 ? (
      <>
        <Spacer id="sec-volunteer" />
        <div data-section="volunteer" className="mb-6" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Volunteer</SectionTitle>
          {filteredVolunteer.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{e.role}</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af', flexShrink: 0, paddingLeft: '8px' }}>
                    {e.startDate}{e.endDate || e.current ? ` – ${e.current ? 'Present' : e.endDate}` : ''}
                  </span>
                </div>
                {e.organisation && <div style={{ fontSize: '12px', color: '#6b7280' }}>{e.organisation}</div>}
                {e.description && <div style={{ fontSize: '12.5px', color: '#4b5563' }}>{e.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,

    awards: () => sectionVisibility?.awards && filteredAwards.length > 0 ? (
      <>
        <Spacer id="sec-awards" />
        <div data-section="awards" className="mb-6" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Awards</SectionTitle>
          {filteredAwards.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="mb-2" style={{ breakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
                    {e.name}{e.issuer ? `, ${e.issuer}` : ''}
                  </span>
                  <span style={{ fontSize: '11px', color: '#9ca3af', flexShrink: 0, paddingLeft: '8px' }}>{e.date}</span>
                </div>
                {e.description && <div style={{ fontSize: '12.5px', color: '#4b5563' }}>{e.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,
  }

  return (
    <div
      className="bg-white overflow-hidden wrap-anywhere"
      style={{
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
        padding: '16mm 20mm',
        width: '100%',
        color: '#1a1a1a',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '34px', fontWeight: 300, color: accent, lineHeight: 1.1, marginBottom: '6px' }}>
          {contact.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '11.5px', color: '#9ca3af', letterSpacing: '0.01em' }}>
          {[contact.location, contact.email, contact.phone, contact.linkedIn, contact.website].filter(Boolean).join('  ·  ')}
        </p>
      </div>

      {order.map((id) => {
        const render = sections[id]
        const content = render ? render() : null
        return content ? <div key={id}>{content}</div> : null
      })}
    </div>
  )
}
