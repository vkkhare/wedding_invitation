import { useEffect, useRef } from 'react'

/* Transparent video from a "stacked" source: colour in the top half, alpha
   matte in the bottom half, recombined by a WebGL shader so the couple floats
   on the page with no rectangular backdrop.

   Stacked H.264 + WebGL is used rather than native alpha video because the
   alpha codecs are split down the middle -- Chrome wants VP9-alpha, Safari
   only does HEVC-alpha, and Safari paints a VP9 alpha channel black. Every
   browser decodes plain H.264, so the transparency is done in the shader. */
export default function AlphaVideo({ sources, className }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return undefined

    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) return undefined

    const compile = (type, code) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, code)
      gl.compileShader(s)
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
    }
    const vs = compile(gl.VERTEX_SHADER, `attribute vec2 p;varying vec2 uv;
      void main(){uv=vec2((p.x+1.)/2.,(1.-p.y)/2.);gl_Position=vec4(p,0.,1.);}`)
    const fs = compile(gl.FRAGMENT_SHADER, `precision mediump float;varying vec2 uv;uniform sampler2D t;
      void main(){
        vec3 c=texture2D(t,vec2(uv.x,uv.y*.5)).rgb;
        float a=texture2D(t,vec2(uv.x,.5+uv.y*.5)).r;
        gl_FragColor=vec4(c*a,a);
      }`)
    if (!vs || !fs) return undefined

    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined
    gl.useProgram(prog)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    let raf = 0
    let sized = false
    let stop = false

    const draw = () => {
      if (stop) return
      if (video.readyState >= 2 && video.videoWidth) {
        if (!sized) {
          sized = true
          canvas.width = video.videoWidth
          canvas.height = Math.floor(video.videoHeight / 2)
          gl.viewport(0, 0, canvas.width, canvas.height)
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    /* iOS pauses inline video on tab switch and after some scroll gestures */
    const kick = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}) }
    kick()
    video.addEventListener('loadeddata', kick)
    document.addEventListener('visibilitychange', kick)

    return () => {
      stop = true
      cancelAnimationFrame(raf)
      video.removeEventListener('loadeddata', kick)
      document.removeEventListener('visibilitychange', kick)
    }
  }, [])

  return (
    <div className={className}>
      <video
        ref={videoRef}
        className="alpha-video__source"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        {sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
      </video>
      <canvas ref={canvasRef} className="alpha-video__canvas" aria-hidden="true" />
    </div>
  )
}
