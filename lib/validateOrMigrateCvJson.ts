import { CvData, defaultCv } from "./cv";

const blankString = (value: unknown) =>
  typeof value === "string" ? value : "";

const stringArray = (value: unknown) =>
  Array.isArray(value) ? value.map((v) => String(v)) : [];

const asRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : {};

export function validateOrMigrateCvJson(input: unknown): CvData {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid CV payload");
  }

  const root = asRecord(input);
  const profileInput = asRecord(root.profile);
  const linksInput = asRecord(profileInput.links);

  const profile = {
    fullName: blankString(profileInput.fullName) || defaultCv.profile.fullName,
    role: blankString(profileInput.role) || defaultCv.profile.role,
    location:
      blankString(profileInput.location) || defaultCv.profile.location,
    email: blankString(profileInput.email) || defaultCv.profile.email,
    phone: blankString(profileInput.phone) || defaultCv.profile.phone,
    about: blankString(profileInput.about) || defaultCv.profile.about,
    links: {
      linkedin: blankString(linksInput.linkedin),
      github: blankString(linksInput.github),
      website: blankString(linksInput.website),
    },
    photo:
      typeof profileInput.photo === "string" ? profileInput.photo : undefined,
  };

  if (!profile.fullName || !profile.role) {
    throw new Error("Profile name and role are required");
  }

  const experience = Array.isArray(root.experience)
    ? root.experience.map((item) => {
        const record = asRecord(item);
        return {
          company: blankString(record.company),
          role: blankString(record.role),
          start: blankString(record.start),
          end: blankString(record.end),
          bullets: stringArray(record.bullets),
        };
      })
    : [];

  const education = Array.isArray(root.education)
    ? root.education.map((item) => {
        const record = asRecord(item);
        return {
          school: blankString(record.school),
          degree: blankString(record.degree),
          start: blankString(record.start),
          end: blankString(record.end),
          details: blankString(record.details),
        };
      })
    : [];

  const projects = Array.isArray(root.projects)
    ? root.projects.map((item) => {
        const record = asRecord(item);
        return {
          name: blankString(record.name),
          link: blankString(record.link),
          description: blankString(record.description),
          highlights: stringArray(record.highlights),
          tech: stringArray(record.tech),
        };
      })
    : [];

  const theme =
    root.theme === "slate" || root.theme === "teal" || root.theme === "rose"
      ? root.theme
      : defaultCv.theme;

  const data: CvData = {
    profile,
    experience,
    education,
    projects,
    skills: stringArray(root.skills),
    languages: stringArray(root.languages),
    certifications: stringArray(root.certifications),
    theme,
    accentColor:
      typeof root.accentColor === "string" && root.accentColor.length > 2
        ? root.accentColor
        : undefined,
  };

  return data;
}
