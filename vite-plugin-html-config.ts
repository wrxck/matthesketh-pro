import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import type { Plugin } from 'vite'

import { config } from './site.config'

const PLACEHOLDER = /\{\{(\w+(?:\.\w+)*)\}\}/g

function lookup(path: string): unknown {
    return path.split('.').reduce<unknown>((current, key) => {
        if (current === null || typeof current !== 'object') return undefined
        return (current as Record<string, unknown>)[key]
    }, config)
}

function render(text: string): string {
    return text.replace(PLACEHOLDER, (_, path: string) => {
        const value = lookup(path)
        return value != null ? String(value) : ''
    })
}

// the manifest is copied out of public/ verbatim, so it is rendered afterwards
// rather than through transformIndexHtml
const MANIFEST = 'site.webmanifest'

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
                if (req.url?.split('?')[0] !== `/${MANIFEST}`) return next()
                try {
                    const source = await readFile(resolve(server.config.publicDir, MANIFEST), 'utf8')
                    res.setHeader('Content-Type', 'application/manifest+json')
                    res.end(render(source))
                } catch {
                    next()
                }
            })
        },

        async closeBundle() {
            const target = resolve(outDir, MANIFEST)
            try {
                await writeFile(target, render(await readFile(target, 'utf8')))
            } catch {
                // no manifest in this build, which is not an error
            }
        },
    }
}
