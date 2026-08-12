import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import type { Plugin } from 'vite'

import { config } from './site.config'

const PLACEHOLDER = /\{\{(\w+(?:\.\w+)*)\}\}/g

// an optional block: kept when the key has a value, removed entirely when it
// does not, so a fork that sets no ad account ships no ad markup at all
const OPTIONAL_BLOCK = /[ \t]*<!--\{\{#(\w+(?:\.\w+)*)\}\}-->\n?([\s\S]*?)[ \t]*<!--\{\{\/\1\}\}-->\n?/g

function lookup(path: string): unknown {
    return path.split('.').reduce<unknown>((current, key) => {
        if (current === null || typeof current !== 'object') return undefined
        return (current as Record<string, unknown>)[key]
    }, config)
}

function render(text: string): string {
    return text
        .replace(OPTIONAL_BLOCK, (_, path: string, body: string) => (lookup(path) ? body : ''))
        .replace(PLACEHOLDER, (_, path: string) => {
            const value = lookup(path)
            return value != null ? String(value) : ''
        })
}

// files copied out of public/ verbatim, so they are rendered afterwards rather
// than through transformIndexHtml. `requires` names a config value the file is
// meaningless without: when it is unset the file is dropped from the build, so
// a fork never ships a half-filled ads.txt naming nobody.
const PUBLIC_TEMPLATES: Array<{ file: string; type: string; requires?: string }> = [
    { file: 'site.webmanifest', type: 'application/manifest+json' },
    { file: 'ads.txt', type: 'text/plain', requires: 'adsense.publisherId' },
    { file: 'favicon.svg', type: 'image/svg+xml' },
    { file: 'apple-touch-icon.svg', type: 'image/svg+xml' },
    { file: 'mask-icon.svg', type: 'image/svg+xml' },
]

export function htmlConfig(): Plugin {
    let outDir = 'dist'

    return {
        name: 'html-config',

        configResolved(resolved) {
            outDir = resolved.build.outDir
        },

        transformIndexHtml(html: string) {
            return render(html)
        },

        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const path = req.url?.split('?')[0]
                const template = PUBLIC_TEMPLATES.find((t) => path === `/${t.file}`)
                if (!template) return next()
                if (template.requires && !lookup(template.requires)) {
                    res.statusCode = 404
                    return res.end()
                }
                try {
                    const source = await readFile(resolve(server.config.publicDir, template.file), 'utf8')
                    res.setHeader('Content-Type', template.type)
                    res.end(render(source))
                } catch {
                    next()
                }
            })
        },

        async closeBundle() {
            for (const template of PUBLIC_TEMPLATES) {
                const target = resolve(outDir, template.file)
                try {
                    if (template.requires && !lookup(template.requires)) {
                        await rm(target, { force: true })
                        continue
                    }
                    await writeFile(target, render(await readFile(target, 'utf8')))
                } catch {
                    // the file is not in this build, which is not an error
                }
            }
        },
    }
}
