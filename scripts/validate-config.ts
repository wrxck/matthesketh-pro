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

// --- Showcase config (Open Source + Apps) ---------------------------------
const VALID_SPANS = ['sm', 'md', 'lg', 'wide', 'tall']
const HEX = /^#[0-9a-fA-F]{3,8}$/

function checkSpan(path: string, value: unknown) {
  if (value !== undefined && !VALID_SPANS.includes(value as string)) {
    errors.push(`'${path}' has invalid span '${String(value)}' (expected ${VALID_SPANS.join('|')})`)
  }
}

function checkHex(path: string, value: unknown) {
  if (typeof value !== 'string' || !HEX.test(value)) {
    errors.push(`'${path}' must be a hex colour, got '${String(value)}'`)
  }
}

// openSource and apps are OPTIONAL — only validate them when a fork has
// configured them. Drop the block from site.config.ts to omit the section.
const openSource = config.openSource
if (openSource) {
  if (typeof openSource.username !== 'string' || openSource.username === '') {
    errors.push(`'openSource.username' is empty`)
  } else if (!Array.isArray(openSource.featured) || openSource.featured.length === 0) {
    errors.push(`'openSource.featured' must be a non-empty array`)
  } else {
    const seen = new Set<string>()
    for (const f of openSource.featured) {
      const id = `openSource.featured[${f.repo}]`
      check(`${id}.repo`, f.repo)
      if (seen.has(f.repo)) errors.push(`${id}.repo is duplicated`)
      seen.add(f.repo)
      checkSpan(`${id}.span`, f.span)
      checkHex(`${id}.theme.accent`, f.theme?.accent)
    }
  }
}

const apps = config.apps
if (apps) {
  if (!Array.isArray(apps.items) || apps.items.length === 0) {
    errors.push(`'apps.items' must be a non-empty array (omit the 'apps' block to drop the section)`)
  } else {
    for (const a of apps.items) {
      const id = `apps.items[${a.name}]`
      check(`${id}.name`, a.name)
      check(`${id}.url`, a.url)
      checkSpan(`${id}.span`, a.span)
      checkHex(`${id}.theme.accent`, a.theme?.accent)
    }
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
