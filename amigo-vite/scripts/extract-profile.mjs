import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mammoth from 'mammoth'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const viteRoot = path.resolve(__dirname, '..')

const candidateDocxPaths = [
  process.env.PROFILE_DOCX_PATH,
  process.argv[2] ? path.resolve(viteRoot, process.argv[2]) : null,
  path.resolve(viteRoot, '..', '..', 'AMIGO Profile 2026.docx'),
  path.resolve(viteRoot, '..', '..', '..', 'AMIGO Profile 2026.docx'),
  path.resolve(viteRoot, '..', 'AMIGO Profile 2026.docx'),
].filter(Boolean)

const outDir = path.resolve(viteRoot, 'public', 'profile')
const outImagesDir = path.resolve(outDir, 'images')
const outHtmlPath = path.resolve(outDir, 'profile.html')

async function ensureDir(dirPath) {
  await fsp.mkdir(dirPath, { recursive: true })
}

function extForContentType(contentType) {
  const map = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
  }

  return map[contentType] || 'bin'
}

function resolveDocxPath() {
  const match = candidateDocxPaths.find((candidate) => fs.existsSync(candidate))

  if (!match) {
    throw new Error(
      `Could not find "AMIGO Profile 2026.docx". Checked:\n${candidateDocxPaths.join('\n')}`
    )
  }

  return match
}

async function main() {
  const docxPath = resolveDocxPath()

  await ensureDir(outImagesDir)

  let imgIndex = 0
  const result = await mammoth.convertToHtml(
    { path: docxPath },
    {
      convertImage: mammoth.images.imgElement(async (image) => {
        imgIndex += 1
        const buffer = await image.read()
        const ext = extForContentType(image.contentType)
        const fileName = `image-${String(imgIndex).padStart(3, '0')}.${ext}`
        const filePath = path.join(outImagesDir, fileName)

        await fsp.writeFile(filePath, buffer)

        return { src: `/profile/images/${fileName}` }
      }),
    }
  )

  await fsp.writeFile(outHtmlPath, result.value, 'utf8')

  console.log('Extracted profile:')
  console.log('  DOCX:', docxPath)
  console.log('  HTML:', outHtmlPath)
  console.log('  Images:', outImagesDir)

  if (result.messages?.length) {
    console.log('\nMammoth messages:')
    for (const message of result.messages) {
      console.log('-', message.message)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
