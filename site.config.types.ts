export interface Experience {
  company: string
  title: string
  period: string
  bullets: string[]
  stack?: string[]
}

export interface SkillCategory {
  name: string
  items: string[]
}

export interface Project {
  name: string
  description: string
  details: string[]
  url?: string
}

export interface ContactLink {
  label: string
  url: string
  icon: string
}

export interface SiteConfig {
  locale: string
  themeColor: string
  url: string
  sentryDsn: string
  identity: {
    name: string
    title: string
    summary: string
  }
  experience: Experience[]
  skills: SkillCategory[]
  projects: Project[]
  contact: ContactLink[]
  terminalPrompt: string
  commands: {
    whoami: string
    experience: string
    skills: string
    projects: string
    contact: string
  }
  pdfFilename: string
}
