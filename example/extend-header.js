import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import { createExtract } from 'tar-mini'
import { setupEnv } from './setup.js'

const [ok, symPath] = setupEnv()

async function main() {
  if (!ok) {
    console.error('An error occurred')
    process.exit(1)
  }
  const extract = createExtract()
  const gz = path.join(symPath, 'vite-plugin-compression-1.2.0.tar.gz')
  const readable = fs.createReadStream(gz)

  const unzip = zlib.createUnzip()

  extract.on('entry', (head) => {
    console.log(head)
  })

  readable.pipe(unzip).pipe(extract.receiver)

  await new Promise((resolve) => extract.on('close', resolve))
}

main()
