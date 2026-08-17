import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const srcRoot = path.join(root, 'src')
const allowedOpacity = new Set([0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100])
const errors = []
const notes = []

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

function resolveLocalImport(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier)
  const candidates = [base, `${base}.js`, `${base}.jsx`, `${base}.json`, path.join(base, 'index.js'), path.join(base, 'index.jsx')]
  return candidates.find((candidate) => fs.existsSync(candidate))
}

const sourceFiles = walk(srcRoot).filter((file) => /\.(?:js|jsx|css)$/.test(file))
const jsFiles = sourceFiles.filter((file) => /\.(?:js|jsx)$/.test(file))

for (const file of jsFiles) {
  const source = fs.readFileSync(file, 'utf8')
  const importPattern = /(?:import\s+(?:[^'";]+?\s+from\s+)?|import\s*\()(['"])([^'"]+)\1/g
  for (const match of source.matchAll(importPattern)) {
    const specifier = match[2]
    if (specifier.startsWith('.') && !resolveLocalImport(file, specifier)) {
      errors.push(`${path.relative(root, file)}: unresolved import "${specifier}"`)
    }
  }
}

const opacityPattern = /(?:^|\s)(?:[\w-]+:)*(?:bg|text|border|from|via|to|ring|divide|placeholder|outline|fill|stroke)-[^\s"'`{}]+?\/(\d+)(?![\d\]])/g
for (const file of sourceFiles) {
  const source = fs.readFileSync(file, 'utf8')
  for (const match of source.matchAll(opacityPattern)) {
    const value = Number(match[1])
    if (!allowedOpacity.has(value)) {
      errors.push(`${path.relative(root, file)}: unsupported Tailwind opacity "/${value}"; use bracket syntax such as /[0.${String(value).padStart(2, '0')}]`)
    }
  }
}

const publicReferencePatterns = [
  /(?:src|href|image)\s*[:=]\s*['"]\/(?!\/)([^'"?#]+)['"]/g,
  /(?:src|href|image)\s*[:=]\s*['"]\.\/(deck\/[^'"?#]+|favicon\.svg)['"]/g,
]
for (const file of [...jsFiles, path.join(root, 'index.html')]) {
  const source = fs.readFileSync(file, 'utf8')
  for (const pattern of publicReferencePatterns) {
    for (const match of source.matchAll(pattern)) {
      const publicFile = path.join(root, 'public', match[1])
      if (!fs.existsSync(publicFile) && !match[1].startsWith('src/')) {
        errors.push(`${path.relative(root, file)}: missing public asset "${match[1]}"`)
      }
    }
  }
}

const planFile = path.join(srcRoot, 'data', 'plan.js')
const appFile = path.join(srcRoot, 'App.jsx')
if (fs.existsSync(planFile) && fs.existsSync(appFile)) {
  const plan = fs.readFileSync(planFile, 'utf8')
  const app = fs.readFileSync(appFile, 'utf8')
  const hrefs = [...plan.matchAll(/href:\s*['"]#([^'"]+)['"]/g)].map((match) => match[1])
  for (const id of hrefs) {
    if (!new RegExp(`id=["']${id}["']`).test(app)) errors.push(`Navigation target "#${id}" is not present in src/App.jsx`)
  }
}

const deckAssets = fs.readdirSync(path.join(root, 'public', 'deck')).filter((name) => name.endsWith('.webp'))
notes.push(`${jsFiles.length} JavaScript/JSX files checked`)
notes.push(`${deckAssets.length} source-deck images found`)
notes.push('Relative imports, navigation anchors, public assets and Tailwind opacity utilities checked')

if (errors.length) {
  console.error('\nProject validation failed:\n')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log('Project validation passed.')
notes.forEach((note) => console.log(`- ${note}`))
