import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { mkdir, writeFile } from 'node:fs/promises'
const require = createRequire(
  new URL('../../apps/example-vue-dev/package.json', import.meta.url)
)
const media = fileURLToPath(new URL('../media/', import.meta.url))
export default {
  root: fileURLToPath(new URL('.', import.meta.url)),
  publicDir: '../media',
  resolve: {
    alias: { vue: require.resolve('vue/dist/vue.runtime.esm-bundler.js') },
    dedupe: ['vue', 'three'],
  },
  server: {
    host: '127.0.0.1',
    port: 4388,
    strictPort: true,
    fs: { allow: [fileURLToPath(new URL('../..', import.meta.url))] },
  },
  plugins: [
    {
      name: 'local-showcase-capture',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use('/__capture', async (req, res) => {
          const id = new URL(req.url, 'http://localhost:4388').searchParams.get(
            'preset'
          )
          if (
            req.method !== 'POST' ||
            !['emerald-tide', 'orchid-orbit', 'copper-dawn'].includes(id) ||
            !['http://localhost:4388', 'http://127.0.0.1:4388'].includes(
              req.headers.origin
            ) ||
            !String(req.headers['content-type']).startsWith('video/webm')
          ) {
            res.statusCode = 403
            res.end('Local recording request required')
            return
          }
          try {
            const parts = []
            let size = 0
            for await (const chunk of req) {
              size += chunk.length
              if (size > 20_000_000) throw Error('Recording exceeds 20 MB')
              parts.push(chunk)
            }
            if (size < 1000) throw Error('Recording is empty')
            await mkdir(media, { recursive: true })
            await writeFile(`${media}/${id}.webm`, Buffer.concat(parts))
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ saved: `${id}.webm`, bytes: size }))
          } catch (e) {
            res.statusCode = 400
            res.end(String(e))
          }
        })
      },
    },
  ],
}
