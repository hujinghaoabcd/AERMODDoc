import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, posix, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const distRoot = resolve('docs/.vuepress/dist')
const siteBase = '/AERMODDoc/'
const errors = []

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = resolve(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

function decodeUri(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function resolveTarget(sourceFile, rawPath) {
  const decoded = decodeUri(rawPath)
  let rel

  if (decoded.startsWith(siteBase)) {
    rel = decoded.slice(siteBase.length)
  } else if (decoded === siteBase.slice(0, -1)) {
    rel = ''
  } else if (decoded.startsWith('/')) {
    rel = decoded.slice(1)
  } else {
    const sourceRel = relative(distRoot, sourceFile).replaceAll('\\', '/')
    rel = posix.normalize(posix.join(posix.dirname(sourceRel), decoded))
  }

  if (!rel || rel.endsWith('/')) return resolve(distRoot, rel, 'index.html')

  if (!extname(rel)) {
    const html = resolve(distRoot, `${rel}.html`)
    if (existsSync(html)) return html
    return resolve(distRoot, rel, 'index.html')
  }

  return resolve(distRoot, rel)
}

if (!existsSync(distRoot)) {
  console.error('缺少 VuePress 构建目录：docs/.vuepress/dist')
  process.exit(1)
}

const htmlFiles = walk(distRoot).filter((path) => path.endsWith('.html'))
const idsByFile = new Map()

function getIds(file) {
  if (!idsByFile.has(file)) {
    const html = readFileSync(file, 'utf8')
    idsByFile.set(file, new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])))
  }
  return idsByFile.get(file)
}

let links = 0
let fragments = 0

for (const source of htmlFiles) {
  const html = readFileSync(source, 'utf8')
  const sourceRel = relative(distRoot, source).replaceAll('\\', '/')

  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = decodeHtml(match[1])
    if (!href || /^(?:https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(href)) continue

    links += 1
    const hashIndex = href.indexOf('#')
    const queryIndex = href.indexOf('?')
    const pathEndCandidates = [hashIndex, queryIndex].filter((value) => value >= 0)
    const pathEnd = pathEndCandidates.length ? Math.min(...pathEndCandidates) : href.length
    const rawPath = href.slice(0, pathEnd)
    const fragment = hashIndex >= 0 ? href.slice(hashIndex + 1).split('?')[0] : ''
    const target = rawPath ? resolveTarget(source, rawPath) : source

    if (!existsSync(target)) {
      errors.push(`构建后链接目标不存在：${sourceRel} -> ${href}`)
      continue
    }

    if (fragment && target.endsWith('.html')) {
      fragments += 1
      const id = decodeUri(fragment)
      if (!getIds(target).has(id)) {
        const targetRel = relative(distRoot, target).replaceAll('\\', '/')
        errors.push(`构建后锚点不存在：${sourceRel} -> ${targetRel}#${id}`)
      }
    }
  }
}

if (errors.length) {
  console.error('\n构建后链接与锚点检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`构建后链接检查通过：${htmlFiles.length}个HTML页面、${links}个站内链接、${fragments}个锚点链接。`)
