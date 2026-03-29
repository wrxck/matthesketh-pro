import { config } from '../site.config.js'

const PLACEHOLDERS = ['Your Name', 'yourdomain.com', 'yourusername', 'yourprofile']
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

check('name', config.name)
check('title', config.title)
check('description', config.description)
check('url', config.url)
check('bio', config.bio)
check('contact.email', config.contact.email)
check('contact.github', config.contact.github)
check('contact.linkedin', config.contact.linkedin)

for (const card of config.navCards) {
  check(`navCards[${card.title}].url`, card.url)
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
