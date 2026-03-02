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

export const identity = {
  name: 'Matt Hesketh',
  title: 'Software Engineer',
  summary: 'Full-stack engineer with mainframe expertise and AI specialisation. Self-taught since 2010. Building across the entire stack — from COBOL on IBM zOS to RAG pipelines and compiler design.',
}

export const experience: Experience[] = [
  {
    company: 'Lloyds Banking Group',
    title: 'Software Engineer',
    period: 'Apr 2024 — Present',
    bullets: [
      'Hired as host engineer for IBM zOS mainframe (COBOL, ISPF, JCL, DB2)',
      'Expanded scope to 9 applications across the full modern stack',
      'Built Lloyds Banking Group\'s first PWA with BM Online website',
      'Built web-based biometric authentication for the same application',
      'AI specialisation: RAG pipelines and agentic workflows',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'COBOL', 'GCP', 'Azure', 'Terraform', 'Helmfile', 'Harness', 'Jenkins', 'Vault', 'Python', 'MSSQL', 'PostgreSQL', 'Redis'],
  },
  {
    company: 'Freelance',
    title: 'Full-Stack Developer',
    period: '2018 — 2024',
    bullets: [
      'React and Next.js applications for clients across industries',
      'Go and TypeScript backends with REST and GraphQL APIs',
      'E-commerce builds: Shopify, Medusa, WordPress',
      'Database design: MongoDB, PostgreSQL, Redis',
    ],
    stack: ['React', 'Next.js', 'Go', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL', 'Redis', 'Shopify', 'Medusa'],
  },
]

export const skills: SkillCategory[] = [
  { name: 'languages', items: ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'C#', 'Java', 'C', 'C++', 'Lua', 'Shell', 'COBOL'] },
  { name: 'frontend', items: ['React', 'Next.js', 'SvelteKit', 'Svelte'] },
  { name: 'backend', items: ['Node.js', 'Express', 'Fastify', 'Django', 'FastAPI', 'Spring', 'Tokio', 'Axum', '.NET'] },
  { name: 'infrastructure', items: ['Docker', 'Kubernetes', 'Terraform', 'Helmfile', 'Harness', 'Jenkins', 'GCP', 'Azure', 'AWS', 'Vault', 'Dynatrace', 'SonarQube'] },
  { name: 'databases', items: ['PostgreSQL', 'MSSQL', 'MongoDB', 'Redis', 'DB2'] },
  { name: 'platforms', items: ['Shopify', 'Medusa', 'WordPress', 'Unity'] },
  { name: 'mainframe', items: ['IBM zOS', 'COBOL', 'ISPF', 'JCL', 'DB2'] },
]

export const projects: Project[] = [
  {
    name: 'UtopiaJS',
    description: 'Compiler-first UI framework',
    details: [
      '18,000+ lines of TypeScript across 11 packages',
      'Compiles .utopia SFCs to direct DOM operations — no virtual DOM',
      'Fine-grained signal-based reactivity with expression-level tracking',
      'Full-stack: routing, SSR, form validation, email templating, AI/MCP integration',
    ],
    url: 'https://github.com/wrxck/utopiajs',
  },
]

export const contact: ContactLink[] = [
  { label: 'email', url: 'mailto:matt@matthesketh.pro', icon: '>' },
  { label: 'github', url: 'https://github.com/wrxck', icon: '>' },
  { label: 'linkedin', url: 'https://linkedin.com/in/matthesketh', icon: '>' },
  { label: 'portfolio', url: 'https://matthesketh.pro', icon: '>' },
]

export const commands = {
  whoami: '$ whoami',
  experience: '$ cat experience.md',
  skills: '$ ls -la skills/',
  projects: '$ cat projects/utopiajs.md',
  contact: '$ echo $CONTACT',
} as const
