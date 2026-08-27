// Bundle the built site (dist/) into one self-contained HTML file for
// publishing as a Claude artifact preview — no hosting credits needed.
// Usage: npm run build && node scripts/build-preview.mjs <out.html>
import fs from 'node:fs'
import path from 'node:path'

const dist = 'dist'
const cssFile = fs.readdirSync(path.join(dist, 'assets')).find((f) => f.endsWith('.css'))
const jsFile = fs.readdirSync(path.join(dist, 'assets')).find((f) => f.endsWith('.js'))
const css = fs.readFileSync(path.join(dist, 'assets', cssFile), 'utf8')
let js = fs.readFileSync(path.join(dist, 'assets', jsFile), 'utf8')

const dataURI = (p, mime) => `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`

const MIME = { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml' }
const cssInlined = css.replace(/url\(\.\/([^)'"]+)\)/g, (m, f) => {
  const ext = f.split('.').pop()
  if (!MIME[ext]) throw new Error('unknown asset type in css: ' + f)
  return `url('${dataURI(path.join(dist, 'assets', f), MIME[ext])}')`
})
if (/url\(\.\//.test(cssInlined)) throw new Error('css asset urls left unreplaced')

let fonts = fs.readFileSync('public/css/fonts.css', 'utf8')
fonts = fonts.replace(/url\(['"]?\.\.\/assets\/fonts\/([^)'"]+)['"]?\)/g, (m, f) =>
  `url('${dataURI('public/assets/fonts/' + f, 'font/woff2')}')`)
if (/assets\/fonts/.test(fonts)) throw new Error('font urls left unreplaced')

const assets = {
  'assets/monogram.png': ['public/assets/monogram.png', 'image/png'],
  'assets/jharokha.webp': ['public/assets/jharokha.webp', 'image/webp'],
  'assets/train.webp': ['public/assets/train.webp', 'image/webp'],
  'assets/haldi.webp': ['public/assets/haldi.webp', 'image/webp'],
  'assets/sangeet-couple.mp4': ['public/assets/sangeet-couple.mp4', 'video/mp4'],
  'assets/sangeet-couple-still.webp': ['public/assets/sangeet-couple-still.webp', 'image/webp'],
  'assets/ganesha.webp': ['public/assets/ganesha.webp', 'image/webp'],
  'assets/hero-mandap.webp': ['public/assets/hero-mandap.webp', 'image/webp'],
  'assets/hero-mandap-tall.webp': ['public/assets/hero-mandap-tall.webp', 'image/webp'],
  'assets/lantern-a.webp': ['public/assets/lantern-a.webp', 'image/webp'],
  'assets/lantern-b.webp': ['public/assets/lantern-b.webp', 'image/webp'],
  'assets/lantern-c.webp': ['public/assets/lantern-c.webp', 'image/webp'],
}
for (const [ref, [file, mime]] of Object.entries(assets)) {
  js = js.split(`"${ref}"`).join(JSON.stringify(dataURI(file, mime)))
}

const out = `<title>Varun weds Prarita</title>\n<style>\n${fonts}\n${cssInlined}\n</style>\n<div id="root"></div>\n<script type="module">\n${js}\n</script>\n`
const dest = process.argv[2] || 'preview.html'
fs.writeFileSync(dest, out)
console.log('written', dest, (fs.statSync(dest).size / 1048576).toFixed(2), 'MB')
