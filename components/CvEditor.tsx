"use client";

import { ChangeEvent, useState } from "react";
import {
  CvData,
  EducationItem,
  ExperienceItem,
  ProjectItem,
} from "@/lib/cv";
import { SortableList } from "./SortableList";
import { PhotoUploader } from "./PhotoUploader";

type Props = {
  value: CvData;
  onChange: (cv: CvData) => void;
  onImport: (file: File) => void | Promise<void>;
};

const emptyExperience: ExperienceItem = {
  company: "",
  role: "",
  start: "",
  end: "",
  bullets: [],
};

const emptyEducation: EducationItem = {
  school: "",
  degree: "",
  start: "",
  end: "",
  details: "",
};

const emptyProject: ProjectItem = {
  name: "",
  link: "",
  description: "",
  highlights: [],
  tech: [],
};

export function CvEditor({
  value,
  onChange,
  onImport,
}: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    profile: true,
    experience: true,
    projects: true,
    education: true,
    skills: true,
    languages: true,
    certifications: true,
  });

  const toggle = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  const updateProfile = (field: keyof CvData["profile"], newValue: string) => {
    onChange({
      ...value,
      profile: { ...value.profile, [field]: newValue },
    });
  };

  const updateProfileLink = (field: keyof CvData["profile"]["links"], newValue: string) => {
    onChange({
      ...value,
      profile: {
        ...value.profile,
        links: { ...value.profile.links, [field]: newValue },
      },
    });
  };

  const updateArrayField = <T,>(
    items: T[],
    index: number,
    updater: (item: T) => T,
    key: keyof CvData
  ) => {
    const copy = [...(items as T[])];
    copy[index] = updater(copy[index]);
    onChange({ ...value, [key]: copy } as CvData);
  };

  const moveItem = <T,>(items: T[], from: number, to: number, key: keyof CvData) => {
    if (to < 0 || to >= items.length) return;
    const copy = [...items];
    const [removed] = copy.splice(from, 1);
    copy.splice(to, 0, removed);
    onChange({ ...value, [key]: copy } as CvData);
  };

  const removeItem = <T,>(items: T[], index: number, key: keyof CvData) => {
    const copy = [...items];
    copy.splice(index, 1);
    onChange({ ...value, [key]: copy } as CvData);
  };

  const handleTextListChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    key: keyof CvData
  ) => {
    const list = event.target.value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    onChange({ ...value, [key]: list } as CvData);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm md:flex-row md:items-center md:justify-between no-print">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Builder</h1>
          <p className="text-sm text-gray-600">
            Fill the fields below, preview, then print or share.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-gray-300">
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onImport(file);
              }}
            />
            Upload JSON
          </label>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <SectionCard
            title="Profile"
            open={openSections.profile}
            onToggle={() => toggle("profile")}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Full name"
                value={value.profile.fullName}
                onChange={(e) => updateProfile("fullName", e.target.value)}
              />
              <Field
                label="Role / title"
                value={value.profile.role}
                onChange={(e) => updateProfile("role", e.target.value)}
              />
              <Field
                label="Location"
                value={value.profile.location}
                onChange={(e) => updateProfile("location", e.target.value)}
              />
              <Field
                label="Email"
                value={value.profile.email}
                onChange={(e) => updateProfile("email", e.target.value)}
              />
              <Field
                label="Phone"
                value={value.profile.phone}
                onChange={(e) => updateProfile("phone", e.target.value)}
              />
              <Field
                label="Website"
                value={value.profile.links.website}
                onChange={(e) => updateProfileLink("website", e.target.value)}
              />
              <Field
                label="LinkedIn"
                value={value.profile.links.linkedin}
                onChange={(e) => updateProfileLink("linkedin", e.target.value)}
              />
              <Field
                label="GitHub"
                value={value.profile.links.github}
                onChange={(e) => updateProfileLink("github", e.target.value)}
              />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-sm font-semibold text-gray-800">About</label>
              <textarea
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-gray-400"
                rows={3}
                value={value.profile.about}
                onChange={(e) => updateProfile("about", e.target.value)}
              />
            </div>
            <div className="mt-4">
              <PhotoUploader
                value={value.profile.photo}
                onChange={(photo) =>
                  onChange({ ...value, profile: { ...value.profile, photo } })
                }
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Experience"
            open={openSections.experience}
            onToggle={() => toggle("experience")}
            actionLabel="Add"
            onAction={() =>
              onChange({
                ...value,
                experience: [...value.experience, { ...emptyExperience }],
              })
            }
          >
            <SortableList
              items={value.experience}
              getKey={(_, idx) => `exp-${idx}`}
              onMove={(from, to) => moveItem(value.experience, from, to, "experience")}
              onRemove={(idx) => removeItem(value.experience, idx, "experience")}
              renderItem={(item, idx) => (
                <div className="grid gap-3 md:grid-cols-2">
                  <Field
                    label="Company"
                    value={item.company}
                    onChange={(e) =>
                      updateArrayField(
                        value.experience,
                        idx,
                        (it) => ({ ...it, company: e.target.value }),
                        "experience"
                      )
                    }
                  />
                  <Field
                    label="Role"
                    value={item.role}
                    onChange={(e) =>
                      updateArrayField(
                        value.experience,
                        idx,
                        (it) => ({ ...it, role: e.target.value }),
                        "experience"
                      )
                    }
                  />
                  <Field
                    label="Start"
                    value={item.start}
                    onChange={(e) =>
                      updateArrayField(
                        value.experience,
                        idx,
                        (it) => ({ ...it, start: e.target.value }),
                        "experience"
                      )
                    }
                  />
                  <Field
                    label="End"
                    value={item.end}
                    onChange={(e) =>
                      updateArrayField(
                        value.experience,
                        idx,
                        (it) => ({ ...it, end: e.target.value }),
                        "experience"
                      )
                    }
                  />
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-800">
                      Bullet points
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-gray-400"
                      rows={3}
                      value={item.bullets.join("\n")}
                      onChange={(e) =>
                        updateArrayField(
                          value.experience,
                          idx,
                          (it) => ({
                            ...it,
                            bullets: e.target.value
                              .split("\n")
                              .map((b) => b.trim())
                              .filter(Boolean),
                          }),
                          "experience"
                        )
                      }
                    />
                  </div>
                </div>
              )}
            />
          </SectionCard>

          <SectionCard
            title="Projects"
            open={openSections.projects}
            onToggle={() => toggle("projects")}
            actionLabel="Add"
            onAction={() =>
              onChange({
                ...value,
                projects: [...value.projects, { ...emptyProject }],
              })
            }
          >
            <SortableList
              items={value.projects}
              getKey={(_, idx) => `project-${idx}`}
              onMove={(from, to) => moveItem(value.projects, from, to, "projects")}
              onRemove={(idx) => removeItem(value.projects, idx, "projects")}
              renderItem={(item, idx) => (
                <div className="grid gap-3 md:grid-cols-2">
                  <Field
                    label="Name"
                    value={item.name}
                    onChange={(e) =>
                      updateArrayField(
                        value.projects,
                        idx,
                        (it) => ({ ...it, name: e.target.value }),
                        "projects"
                      )
                    }
                  />
                  <Field
                    label="Link"
                    value={item.link}
                    onChange={(e) =>
                      updateArrayField(
                        value.projects,
                        idx,
                        (it) => ({ ...it, link: e.target.value }),
                        "projects"
                      )
                    }
                  />
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-800">
                      Description
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-gray-400"
                      rows={2}
                      value={item.description}
                      onChange={(e) =>
                        updateArrayField(
                          value.projects,
                          idx,
                          (it) => ({ ...it, description: e.target.value }),
                          "projects"
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-800">
                      Highlights (one per line)
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-gray-400"
                      rows={2}
                      value={item.highlights.join("\n")}
                      onChange={(e) =>
                        updateArrayField(
                          value.projects,
                          idx,
                          (it) => ({
                            ...it,
                            highlights: e.target.value
                              .split("\n")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          }),
                          "projects"
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-800">
                      Tech stack (one per line)
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-gray-400"
                      rows={2}
                      value={item.tech.join("\n")}
                      onChange={(e) =>
                        updateArrayField(
                          value.projects,
                          idx,
                          (it) => ({
                            ...it,
                            tech: e.target.value
                              .split("\n")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          }),
                          "projects"
                        )
                      }
                    />
                  </div>
                </div>
              )}
            />
          </SectionCard>

          <SectionCard
            title="Education"
            open={openSections.education}
            onToggle={() => toggle("education")}
            actionLabel="Add"
            onAction={() =>
              onChange({
                ...value,
                education: [...value.education, { ...emptyEducation }],
              })
            }
          >
            <SortableList
              items={value.education}
              getKey={(_, idx) => `edu-${idx}`}
              onMove={(from, to) => moveItem(value.education, from, to, "education")}
              onRemove={(idx) => removeItem(value.education, idx, "education")}
              renderItem={(item, idx) => (
                <div className="grid gap-3 md:grid-cols-2">
                  <Field
                    label="School"
                    value={item.school}
                    onChange={(e) =>
                      updateArrayField(
                        value.education,
                        idx,
                        (it) => ({ ...it, school: e.target.value }),
                        "education"
                      )
                    }
                  />
                  <Field
                    label="Degree"
                    value={item.degree}
                    onChange={(e) =>
                      updateArrayField(
                        value.education,
                        idx,
                        (it) => ({ ...it, degree: e.target.value }),
                        "education"
                      )
                    }
                  />
                  <Field
                    label="Start"
                    value={item.start}
                    onChange={(e) =>
                      updateArrayField(
                        value.education,
                        idx,
                        (it) => ({ ...it, start: e.target.value }),
                        "education"
                      )
                    }
                  />
                  <Field
                    label="End"
                    value={item.end}
                    onChange={(e) =>
                      updateArrayField(
                        value.education,
                        idx,
                        (it) => ({ ...it, end: e.target.value }),
                        "education"
                      )
                    }
                  />
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-800">
                      Details
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-gray-400"
                      rows={2}
                      value={item.details}
                      onChange={(e) =>
                        updateArrayField(
                          value.education,
                          idx,
                          (it) => ({ ...it, details: e.target.value }),
                          "education"
                        )
                      }
                    />
                  </div>
                </div>
              )}
            />
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <SectionCard
            title="Skills"
            open={openSections.skills}
            onToggle={() => toggle("skills")}
          >
            <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            <p className="text-sm text-gray-600">One skill per line.</p>
            <textarea
              className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-gray-400"
              rows={4}
              value={value.skills.join("\n")}
              onChange={(e) => handleTextListChange(e, "skills")}
            />
          </SectionCard>

          <SectionCard
            title="Languages"
            open={openSections.languages}
            onToggle={() => toggle("languages")}
          >
            <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
            <textarea
              className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-gray-400"
              rows={3}
              value={value.languages.join("\n")}
              onChange={(e) => handleTextListChange(e, "languages")}
            />
          </SectionCard>

          <SectionCard
            title="Certificates"
            open={openSections.certifications}
            onToggle={() => toggle("certifications")}
          >
            <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
            <textarea
              className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-gray-400"
              rows={3}
              value={value.certifications.join("\n")}
              onChange={(e) => handleTextListChange(e, "certifications")}
            />
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Field({ label, value, onChange }: FieldProps) {
  return (
    <label className="block text-sm font-semibold text-gray-800">
      {label}
      <input
        className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-gray-400"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

type SectionCardProps = {
  title: string;
  open: boolean;
  onToggle: () => void;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
};

function SectionCard({ title, open, onToggle, actionLabel, onAction, children }: SectionCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 text-lg font-semibold text-gray-900"
          onClick={onToggle}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full border border-gray-300 text-center text-xs leading-5 ${
              open ? "bg-gray-900 text-white" : "bg-white text-gray-700"
            }`}
            aria-hidden
          >
            {open ? "−" : "+"}
          </span>
          {title}
        </button>
        {actionLabel && onAction ? (
          <button
            type="button"
            className="rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-700 hover:border-gray-300"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
      {open ? <div className="space-y-3">{children}</div> : null}
    </div>
  );
}
