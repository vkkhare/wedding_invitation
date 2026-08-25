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

let fonts = fs.readFileSync('public/css/fonts.css', 'utf8')
fonts = fonts.replace(/url\(['"]?\.\.\/assets\/fonts\/([^)'"]+)['"]?\)/g, (m, f) =>
  `url('${dataURI('public/assets/fonts/' + f, 'font/woff2')}')`)
if (/assets\/fonts/.test(fonts)) throw new Error('font urls left unreplaced')

const assets = {
  'assets/monogram.png': ['public/assets/monogram.png', 'image/png'],
  'assets/jharokha.webp': ['public/assets/jharokha.webp', 'image/webp'],
  'assets/train.webp': ['public/assets/train.webp', 'image/webp'],
  'assets/haldi.webp': ['public/assets/haldi.webp', 'image/webp'],
}
for (const [ref, [file, mime]] of Object.entries(assets)) {
  js = js.split(`"${ref}"`).join(JSON.stringify(dataURI(file, mime)))
}

const out = `<title>Varun weds Prarita</title>\n<style>\n${fonts}\n${css}\n</style>\n<div id="root"></div>\n<script type="module">\n${js}\n</script>\n`
const dest = process.argv[2] || 'preview.html'
fs.writeFileSync(dest, out)
console.log('written', dest, (fs.statSync(dest).size / 1048576).toFixed(2), 'MB')
