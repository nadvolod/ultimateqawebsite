/**
 * Fails the build if a Practice Page's structure (tags, ids, classes, names, types) differs from the
 * signature recorded when it was frozen. See ADR 0002; re-freeze only if a change is deliberate.
 *
 *   npx tsx scripts/check-practice-pages.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import { PRACTICE_PAGES } from '../src/data/practice-pages'
import { structureOf } from './practice-structure'

const ROOT = path.resolve(__dirname, '..')
const expected: Record<string, string> = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/practice/structure.json'), 'utf8'))

const failures = PRACTICE_PAGES.flatMap((page) => {
  const file = path.join(ROOT, 'public/practice/pages', `${page.key}.html`)
  if (!fs.existsSync(file)) return [`${page.path}: frozen file missing`]
  const actual = structureOf(fs.readFileSync(file, 'utf8'))
  return actual === expected[page.key] ? [] : [`${page.path}: structure changed (${expected[page.key]} → ${actual})`]
})

if (failures.length) {
  console.error(`Practice Page check failed:\n  ${failures.join('\n  ')}`)
  process.exit(1)
}
console.log(`Practice Pages unchanged (${PRACTICE_PAGES.length} checked)`)
