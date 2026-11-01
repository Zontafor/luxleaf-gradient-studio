import { createApp, h, ref, computed } from 'vue'
import {
  ShaderGradientCanvas,
  ShaderGradient,
  presets,
} from '../../packages/shadergradient-vue/dist/index.js'
import './style.css'
const looks = [
  {
    id: 'emerald-tide',
    title: 'Emerald Tide',
    base: 'mint' as const,
    description:
      'Soft mint, deep teal and warm ivory over a flowing water plane.',
    props: {
      color1: '#134f43',
      color2: '#94d8b0',
      color3: '#f5e6c7',
      uSpeed: 0.45,
      uStrength: 3.0,
      brightness: 1.15,
    },
  },
  {
    id: 'orchid-orbit',
    title: 'Orchid Orbit',
    base: 'pensive' as const,
    description: 'Violet and rose moving across a sculpted spherical surface.',
    props: {
      color1: '#dcc2f1',
      color2: '#bc67ba',
      color3: '#f3baa3',
      uSpeed: 0.5,
      brightness: 1.6,
      uStrength: 0.6,
    },
  },
  {
    id: 'copper-dawn',
    title: 'Copper Dawn',
    base: 'halo' as const,
    description:
      'A broad, animated plane blending burnt copper, apricot and burgundy.',
    props: {
      color1: '#b44a25',
      color2: '#f0c795',
      color3: '#542a51',
      uSpeed: 0.45,
      brightness: 1.1,
      uStrength: 3.8,
    },
  },
]
createApp({
  setup() {
    const selected = ref(0),
      paused = ref(false),
      busy = ref(false),
      status = ref('Choose a palette. The preview is rendered live.'),
      player = ref(false)
    const look = computed(() => looks[selected.value])
    async function record() {
      const canvas = document.querySelector(
        '.stage canvas'
      ) as HTMLCanvasElement
      if (
        !canvas ||
        !canvas.captureStream ||
        typeof MediaRecorder === 'undefined'
      ) {
        status.value = 'Canvas recording is unavailable in this browser.'
        return
      }
      if (
        document.hidden ||
        matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        status.value =
          'Recording requires a visible preview with reduced motion disabled.'
        return
      }
      busy.value = true
      paused.value = false
      player.value = false
      const mime = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8'].find(
        (x) => MediaRecorder.isTypeSupported(x)
      )
      if (!mime) {
        status.value = 'WebM recording unavailable.'
        busy.value = false
        return
      }
      const stream = canvas.captureStream(30),
        chunks: Blob[] = []
      try {
        status.value = 'Recording 12 seconds of the live renderer…'
        const blob = await new Promise<Blob>((resolve, reject) => {
          const recorder = new MediaRecorder(stream, {
            mimeType: mime,
            videoBitsPerSecond: 6_000_000,
          })
          const timer = setTimeout(() => recorder.stop(), 12000)
          recorder.ondataavailable = (e) => {
            if (e.data.size) chunks.push(e.data)
          }
          recorder.onerror = () => {
            clearTimeout(timer)
            reject(Error('Recording failed'))
          }
          recorder.onstop = () => {
            clearTimeout(timer)
            resolve(new Blob(chunks, { type: mime }))
          }
          recorder.start(200)
        })
        const response = await fetch(`/__capture?preset=${look.value.id}`, {
          method: 'POST',
          headers: { 'Content-Type': blob.type },
          body: blob,
        })
        if (!response.ok) throw Error(await response.text())
        status.value = `Saved ${look.value.title}: WebM from the live canvas. Run the encoder to refresh MP4 and GIF exports.`
      } catch (e) {
        status.value = String(e)
      } finally {
        stream.getTracks().forEach((t) => t.stop())
        busy.value = false
      }
    }
    return () =>
      h('main', [
        h('header', [
          h('a', { href: '/' }, 'LUXLEAF'),
          h('span', 'GRADIENT MOTION / 01'),
        ]),
        h('section', { class: 'intro' }, [
          h('div', [
            h('p', { class: 'eyebrow' }, 'COLOR, IN MOTION'),
            h('h1', look.value.title),
          ]),
          h('p', look.value.description),
        ]),
        h(
          'nav',
          { 'aria-label': 'Motion palettes' },
          looks.map((x, i) =>
            h(
              'button',
              {
                disabled: busy.value,
                class: selected.value === i ? 'active' : '',
                onClick: () => {
                  selected.value = i
                  status.value = 'Live preview'
                  player.value = false
                },
              },
              x.title
            )
          )
        ),
        h(
          'div',
          {
            class: 'stage',
            role: 'img',
            'aria-label': `${look.value.title} animated gradient`,
          },
          [
            h(
              ShaderGradientCanvas,
              {
                key: look.value.id,
                pixelDensity: 1,
                preserveDrawingBuffer: true,
                lazyLoad: false,
              },
              {
                default: () =>
                  h(ShaderGradient, {
                    ...presets[look.value.base].props,
                    ...look.value.props,
                    animate: paused.value ? 'off' : 'on',
                    lightType: '3d',
                    grain: 'off',
                    enableTransition: false,
                  }),
              }
            ),
          ]
        ),
        h('section', { class: 'toolbar' }, [
          h(
            'button',
            {
              disabled: busy.value,
              onClick: () => (paused.value = !paused.value),
            },
            paused.value ? 'Play motion' : 'Pause motion'
          ),
          h(
            'button',
            { disabled: busy.value, onClick: record },
            busy.value ? 'Recording…' : 'Record 12-second clip'
          ),
          h(
            'button',
            {
              disabled: busy.value,
              onClick: () => {
                player.value = !player.value
                paused.value = true
              },
            },
            'Watch saved clip'
          ),
          h(
            'a',
            { href: `/${look.value.id}.mp4`, download: '' },
            'Download MP4'
          ),
          h('span', { role: 'status' }, status.value),
        ]),
        player.value
          ? h(
              'video',
              {
                src: `/${look.value.id}.mp4`,
                controls: true,
                playsinline: true,
                poster: `/${look.value.id}.jpg`,
                style: 'width:100%;margin-top:24px',
              },
              'Your browser does not support video.'
            )
          : null,
        h('footer', [
          h(
            'p',
            'LuxLeaf palette studies rendered with our licensed gradient foundation. Clips show actual canvas output.'
          ),
          h(
            'p',
            'No soundtrack. Canvas capture does not record your screen or other applications.'
          ),
        ]),
      ])
  },
}).mount('#app')
