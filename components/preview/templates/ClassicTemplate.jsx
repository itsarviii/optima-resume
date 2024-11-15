'use client'

const DEFAULT_ORDER = ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'volunteer', 'awards']

export default function ClassicTemplate({ resume, pageBreaks = {} }) {
  const { contact, summary, experience, education, skills, projects, certifications, languages, volunteer, awards, style, sectionVisibility, sectionOrder } = resume
  const accent = style?.accentColour || '#000000'
  const order = sectionOrder ?? DEFAULT_ORDER

  const SectionTitle = ({ children }) => (
    <div className="mb-3" style={{ breakAfter: 'avoid' }}>
      <h3 style={{ color: accent, fontVariant: 'small-caps', letterSpacing: '0.05em' }}
        className="text-xs font-bold uppercase tracking-widest text-center">
        {children}
      </h3>
      <hr style={{ borderColor: accent, opacity: 0.4 }} className="mt-1" />
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
        <div data-section="summary" className="mb-5" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-sm italic text-justify" style={{ orphans: 2, widows: 2 }}>{summary.text}</p>
        </div>
      </>
    ) : null,

    experience: () => filteredExperience.length > 0 ? (
      <>
        <Spacer id="sec-experience" />
        <div data-section="experience" className="mb-5" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Work Experience</SectionTitle>
          {filteredExperience.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="mb-4" style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{e.title}{e.company ? `, ${e.company}` : ''}</span>
                  <span className="text-xs text-gray-400 shrink-0 pl-2">{e.startDate}{e.endDate || e.current ? ` – ${e.current ? 'Present' : e.endDate}` : ''}</span>
                </div>
                {e.location && <div className="text-xs text-gray-400 mb-1">{e.location}</div>}
                {e.bullets.filter(Boolean).length > 0 && (
                  <div className="space-y-0.5 mt-1">
                    {e.bullets.filter(Boolean).map((b, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <span className="shrink-0">•</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
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
        <div data-section="education" className="mb-5" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Education</SectionTitle>
          {filteredEducation.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{e.institution}</span>
                  <span className="text-xs text-gray-400 shrink-0 pl-2">{e.startDate}{e.endDate || e.current ? ` – ${e.current ? 'Present' : e.endDate}` : ''}</span>
                </div>
                {e.location && <div className="text-xs text-gray-400">{e.location}</div>}
                <div className="text-sm">{e.degree}{e.field ? `, ${e.field}` : ''}{e.grade ? ` · ${e.grade}` : ''}</div>
                {e.bullets?.filter(Boolean).length > 0 && (
                  <div className="space-y-0.5 mt-1">
                    {e.bullets.filter(Boolean).map((b, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <span className="shrink-0">•</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,

    skills: () => sectionVisibility?.skills && (skills?.groups ?? []).some((g) => g.skills.length > 0) ? (
      <>
        <Spacer id="sec-skills" />
        <div data-section="skills" className="mb-5" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Skills</SectionTitle>
          {(skills?.groups ?? []).filter((g) => g.skills.length > 0).map((g) => (
            <div key={g.id} className="text-sm mb-1">
              {g.label && <span className="font-semibold">{g.label}: </span>}
              {g.skills.join(' · ')}
            </div>
          ))}
        </div>
      </>
    ) : null,

    projects: () => sectionVisibility?.projects && filteredProjects.length > 0 ? (
      <>
        <Spacer id="sec-projects" />
        <div data-section="projects" className="mb-5" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Projects</SectionTitle>
          {filteredProjects.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{e.name}</span>
                  {(e.startDate || e.endDate) && <span className="text-xs text-gray-400 shrink-0 pl-2">{e.startDate}{e.endDate ? ` – ${e.endDate}` : ''}</span>}
                </div>
                {e.url && <p className="text-xs text-gray-400">{e.url}</p>}
                {e.description && <p className="text-sm">{e.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,

    certifications: () => sectionVisibility?.certifications && filteredCertifications.length > 0 ? (
      <>
        <Spacer id="sec-certifications" />
        <div data-section="certifications" className="mb-5" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Certifications</SectionTitle>
          {filteredCertifications.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="flex justify-between text-sm mb-1" style={{ breakInside: 'avoid' }}>
                <span><span className="font-semibold">{e.name}</span>{e.issuer ? `, ${e.issuer}` : ''}</span>
                <span className="text-xs text-gray-400 shrink-0 pl-2">{e.date}{e.expiry ? ` – ${e.expiry}` : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,

    languages: () => sectionVisibility?.languages && filteredLanguages.length > 0 ? (
      <>
        <Spacer id="sec-languages" />
        <div data-section="languages" className="mb-5" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Languages</SectionTitle>
          <div className="flex flex-wrap gap-x-4 text-sm">
            {filteredLanguages.map((e) => (
              <span key={e.id}><span className="font-semibold">{e.language}</span> – {e.proficiency}</span>
            ))}
          </div>
        </div>
      </>
    ) : null,

    volunteer: () => sectionVisibility?.volunteer && filteredVolunteer.length > 0 ? (
      <>
        <Spacer id="sec-volunteer" />
        <div data-section="volunteer" className="mb-5" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Volunteer Work</SectionTitle>
          {filteredVolunteer.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="mb-3" style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{e.role}</span>
                  <span className="text-xs text-gray-400 shrink-0 pl-2">{e.startDate}{e.endDate || e.current ? ` – ${e.current ? 'Present' : e.endDate}` : ''}</span>
                </div>
                {e.organisation && <div className="text-xs text-gray-400 mb-1">{e.organisation}</div>}
                {e.description && <p className="text-sm">{e.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,

    awards: () => sectionVisibility?.awards && filteredAwards.length > 0 ? (
      <>
        <Spacer id="sec-awards" />
        <div data-section="awards" className="mb-5" style={{ breakInside: 'avoid' }}>
          <SectionTitle>Awards & Achievements</SectionTitle>
          {filteredAwards.map((e) => (
            <div key={e.id}>
              <Spacer id={e.id} />
              <div data-entry={e.id} className="mb-2" style={{ breakInside: 'avoid' }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold">{e.name}{e.issuer ? `, ${e.issuer}` : ''}</span>
                  <span className="text-xs text-gray-400 shrink-0 pl-2">{e.date}</span>
                </div>
                {e.description && <p className="text-sm text-gray-600">{e.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </>
    ) : null,
  }

  return (
    <div className="bg-white text-[#1a1a1a] px-[20mm] py-[16mm] w-full font-serif text-sm leading-relaxed overflow-hidden wrap-anywhere">

      {/* Header — always first */}
      <div className="text-center mb-6">
        <h1 style={{ color: accent }} className="text-3xl font-bold tracking-wide mb-1 wrap-break-word">
          {contact.fullName || 'Your Name'}
        </h1>
        {[contact.location, contact.email, contact.phone].filter(Boolean).length > 0 && (
          <p className="text-xs text-gray-500 leading-5">
            {[contact.location, contact.email, contact.phone].filter(Boolean).join(' · ')}
          </p>
        )}
        {(contact.linkedIn || contact.website) && (
          <p className="text-xs text-gray-400 leading-5 mt-0.5">
            {[contact.linkedIn, contact.website].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>

      {order.map((id) => {
        const render = sections[id]
        const content = render ? render() : null
        return content ? <div key={id}>{content}</div> : null
      })}

    </div>
  )
}
