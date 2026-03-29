import { config } from '../site.config.js'

const PLACEHOLDERS = ['Your Name', 'Your Title', 'Your Role', 'yourdomain.com', 'yourusername', 'yourprofile', 'Company Name', 'Project Name', 'Your_Name_CV']
const errors: string[] = []

function check(path: string, value: unknown) {
  if (value === undefined || value === null || value === '') {
    errors.push(`'${path}' is empty`)
    return
  }
  if (typeof value === 'string') {
    for (const p of PLACEHOLDERS) {
      if (value.toLowerCase().includes(p.toLowerCase())) {
        errors.push(`'${path}' is still set to placeholder value '${value}'`)
        return
      }
    }
  }
}

check('identity.name', config.identity.name)
check('identity.title', config.identity.title)
check('url', config.url)

if (config.identity.summary === '') {
  errors.push("'identity.summary' is empty — add your summary")
}

if (config.experience.length === 0) {
  errors.push("'experience' is empty — add at least one entry")
} else {
  for (const exp of config.experience) {
    check(`experience[${exp.company}].company`, exp.company)
  }
}

if (config.contact.length === 0) {
  errors.push("'contact' is empty — add at least one contact link")
} else {
  for (const c of config.contact) {
    check(`contact[${c.label}].url`, c.url)
  }
}

if (errors.length > 0) {
  console.error('\nERROR: site.config.ts validation failed:\n')
  for (const err of errors) {
    console.error(`  - ${err}`)
  }
  console.error('\nEdit site.config.ts with your details before building.\n')
  process.exit(1)
}

console.log('site.config.ts validated OK')
