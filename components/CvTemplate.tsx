/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CvData } from "@/lib/cv";
import { themeTokens } from "@/lib/themes";

type Props = {
  data: CvData;
};

export function CvTemplate({ data }: Props) {
  const tokens = themeTokens[data.theme];
  const accent = data.accentColor || tokens.accent;

  return (
    <article
      data-theme={data.theme}
      className="cv-page mx-auto rounded-xl p-10 shadow-print"
      style={
        {
          "--accent": accent,
          "--accent-soft": tokens.background,
          "--text": tokens.text,
          "--muted": tokens.muted,
          "--background": tokens.background,
        } as React.CSSProperties
      }
    >
      <header className="flex items-start justify-between gap-6 border-b border-[color:var(--accent)] pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--text)]">
            {data.profile.fullName}
          </h1>
          <p className="text-lg font-medium text-[color:var(--accent)]">
            {data.profile.role}
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-[color:var(--muted)]">
            <span>{data.profile.location}</span>
            <span className="text-[color:var(--accent)]">•</span>
            <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a>
            <span className="text-[color:var(--accent)]">•</span>
            <a href={`tel:${data.profile.phone}`}>{data.profile.phone}</a>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[color:var(--muted)]">
            {data.profile.links.linkedin && (
              <a href={data.profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
            {data.profile.links.github && (
              <a href={data.profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            {data.profile.links.website && (
              <a href={data.profile.links.website} target="_blank" rel="noreferrer">
                Website
              </a>
            )}
          </div>
        </div>
        {data.profile.photo ? (
          <img
            src={data.profile.photo}
            alt={`${data.profile.fullName} headshot`}
            className="h-24 w-24 rounded-full border-2 border-[color:var(--accent)] object-cover"
          />
        ) : null}
      </header>

      <section className="cv-section mt-6 space-y-6">
        <p className="text-[15px] leading-relaxed text-[color:var(--text)]">
          {data.profile.about}
        </p>
      </section>

      {data.experience.length > 0 && (
        <section className="cv-section mt-8 space-y-4">
          <SectionHeading label="Experience" />
          <div className="space-y-5">
            {data.experience.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-base font-semibold text-[color:var(--text)]">
                      {item.role}
                    </p>
                    <p className="text-sm text-[color:var(--muted)]">{item.company}</p>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--muted)]">
                    {item.start} — {item.end || "Present"}
                  </p>
                </div>
                <ul className="ml-4 list-disc space-y-1 text-sm text-[color:var(--text)]">
                  {item.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="cv-section mt-8 space-y-4">
          <SectionHeading label="Projects" />
          <div className="grid gap-4">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="rounded-lg border border-[color:var(--accent-soft)] bg-[color:var(--background)] p-4"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-[color:var(--text)]">
                      {project.name}
                    </p>
                    <p className="text-sm text-[color:var(--muted)]">
                      <a href={project.link} target="_blank" rel="noreferrer">
                        {project.link}
                      </a>
                    </p>
                  </div>
                  {project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tag, i) => (
                        <span
                          key={i}
                          className="pill px-2 py-1 text-[11px] font-medium uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-[color:var(--text)]">{project.description}</p>
                {project.highlights.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2 text-xs text-[color:var(--muted)]">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="pill px-2 py-1">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="cv-section mt-8 space-y-3">
          <SectionHeading label="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="pill px-3 py-1 text-sm font-medium text-[color:var(--text)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="cv-section mt-8 space-y-4">
          <SectionHeading label="Education" />
          <div className="space-y-3">
            {data.education.map((item, index) => (
              <div key={index} className="flex flex-wrap justify-between gap-2 text-sm">
                <div>
                  <p className="font-semibold text-[color:var(--text)]">{item.degree}</p>
                  <p className="text-[color:var(--muted)]">{item.school}</p>
                  <p className="text-[color:var(--text)]">{item.details}</p>
                </div>
                <p className="text-[color:var(--muted)]">
                  {item.start} — {item.end}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {(data.languages.length > 0 || data.certifications.length > 0) && (
        <section className="cv-section mt-8 grid gap-6 md:grid-cols-2">
          {data.languages.length > 0 && (
            <div className="space-y-2">
              <SectionHeading label="Languages" />
              <ul className="list-disc space-y-1 pl-5 text-sm text-[color:var(--text)]">
                {data.languages.map((lang, index) => (
                  <li key={index}>{lang}</li>
                ))}
              </ul>
            </div>
          )}
          {data.certifications.length > 0 && (
            <div className="space-y-2">
              <SectionHeading label="Certifications" />
              <ul className="list-disc space-y-1 pl-5 text-sm text-[color:var(--text)]">
                {data.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </article>
  );
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-[2px] w-8 bg-[color:var(--accent)]" />
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
        {label}
      </h2>
    </div>
  );
}
