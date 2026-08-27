import { useEffect, useRef, useState } from 'react'

/* Transparent video via a "stacked" mp4: colour in the top half, alpha matte
   in the bottom half. A WebGL shader recombines them so the couple floats
   over the page with no rectangular background. H.264 + WebGL plays
   everywhere — unlike VP9/HEVC alpha, which iOS Safari and Chrome split on.
   Falls back to `fallbackSrc` (the original framed video) without WebGL. */
export default function AlphaVideo({ src, fallbackSrc, muted }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return undefined
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true })
    if (!gl) {
      setFailed(true)
      return undefined
    }

    const vsrc = `attribute vec2 p;varying vec2 uv;
      void main(){uv=vec2((p.x+1.)/2.,(1.-p.y)/2.);gl_Position=vec4(p,0.,1.);}`
    const fsrc = `precision mediump float;varying vec2 uv;uniform sampler2D t;
      void main(){
        vec3 c=texture2D(t,vec2(uv.x,uv.y*.5)).rgb;
        float a=texture2D(t,vec2(uv.x,.5+uv.y*.5)).r;
        gl_FragColor=vec4(c*a,a);
      }`
    const compile = (type, code) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, code)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsrc))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsrc))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true)
      return undefined
    }
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

    let raf
    let sized = false
    const draw = () => {
      if (video.readyState >= 2) {
        if (!sized) {
          sized = true
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight / 2
          gl.viewport(0, 0, canvas.width, canvas.height)
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    video.play().catch(() => {})
    return () => cancelAnimationFrame(raf)
  }, [failed])

  if (failed) {
    return <video className="sangeet__fallback" src={fallbackSrc} autoPlay muted={muted} loop playsInline preload="metadata" />
  }
  return (
    <>
      <video
        ref={videoRef}
        className="alpha-video__source"
        src={src}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onError={() => setFailed(true)}
      />
      <canvas ref={canvasRef} width="368" height="816" />
    </>
  )
}
