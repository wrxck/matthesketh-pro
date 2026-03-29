import type { SiteConfig } from './site.config.types'

export const config: SiteConfig = {
  // Meta (used in index.html)
  locale: 'en_GB',
  themeColor: '#ffffff',
  url: 'https://cv.yourdomain.com',
  sentryDsn: '', // Leave empty to disable Sentry

  // CV data
  identity: {
    name: 'Your Name',
    title: 'Your Title',
    summary: 'A paragraph summarising your experience and specialisation.',
  },

  experience: [
    {
      company: 'Company Name',
      title: 'Your Role',
      period: '2024 — Present',
      bullets: [
        'Achievement or responsibility 1',
        'Achievement or responsibility 2',
      ],
      stack: ['TypeScript', 'React'],
    },
  ],

  skills: [
    { name: 'languages', items: ['TypeScript', 'Python'] },
    { name: 'frontend', items: ['React', 'Next.js'] },
  ],

  projects: [
    {
      name: 'Project Name',
      description: 'What it does',
      details: ['Key detail 1', 'Key detail 2'],
      url: 'https://github.com/yourusername/project',
    },
  ],

  contact: [
    { label: 'email', url: 'mailto:you@yourdomain.com', icon: '>' },
    { label: 'github', url: 'https://github.com/yourusername', icon: '>' },
    { label: 'linkedin', url: 'https://www.linkedin.com/in/yourprofile', icon: '>' },
  ],

  // PDF export filename (without extension)
  pdfFilename: 'Your_Name_CV',
}
