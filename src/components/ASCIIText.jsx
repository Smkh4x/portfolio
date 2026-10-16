import { useEffect, useRef, useState } from 'react';

const CHARSET = ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
const FONT = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const GLYPH_WIDTH = 40;
const GLYPH_HEIGHT = 64;
const TEXT_PX = 256;
const RIPPLES = 4;

const VERTEX = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
#define RIPPLES ${RIPPLES}
uniform sampler2D uText;
uniform sampler2D uGlyphs;
uniform vec2 uSize;
uniform vec2 uCell;
uniform float uGlyphCount;
uniform float uTextAspect;
uniform float uPlaneHeight;
uniform vec2 uTilt;
uniform float uTime;
uniform float uWaves;
uniform float uWaveSpeed;
uniform float uChroma;
uniform float uBlocks;
uniform vec3 uColors[3];
uniform float uHue;
uniform vec2 uPointer;
uniform float uHover;
uniform float uScramble;
uniform vec4 uRipples[RIPPLES];
uniform float uIntro;
uniform float uLight;
uniform float uReady;
uniform float uDissolve;
out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec3 hueRotate(vec3 color, float angle) {
  const vec3 axis = vec3(0.57735);
  float c = cos(angle);
  return color * c + cross(axis, color) * sin(angle) + axis * dot(axis, color) * (1.0 - c);
}

vec4 scene(vec2 pixel) {
  vec2 ndc = vec2(pixel.x / uSize.x * 2.0 - 1.0, 1.0 - pixel.y / uSize.y * 2.0);
  float tanHalf = 0.41421356;
  vec3 dir = normalize(vec3(ndc.x * tanHalf * uSize.x / uSize.y, ndc.y * tanHalf, -1.0));
  vec3 origin = vec3(0.0, 0.0, 30.0);
  float cx = cos(uTilt.x);
  float sx = sin(uTilt.x);
  float cy = cos(uTilt.y);
  float sy = sin(uTilt.y);
  mat3 rotation = mat3(1.0, 0.0, 0.0, 0.0, cx, sx, 0.0, -sx, cx) * mat3(cy, 0.0, -sy, 0.0, 1.0, 0.0, sy, 0.0, cy);
  vec3 normal = rotation * vec3(0.0, 0.0, 1.0);
  float facing = dot(dir, normal);
  if (abs(facing) < 0.0001) return vec4(0.0);
  vec3 hit = origin + dir * (-dot(origin, normal) / facing);
  vec3 local = transpose(rotation) * hit;
  float planeHeight = 24.8528 * uPlaneHeight;
  float planeWidth = planeHeight * uTextAspect;
  float wave = 5.0 * sin(uTime * uWaveSpeed);
  local.x -= sin(wave + local.y) * 0.5 * uWaves;
  local.y -= cos(wave) * 0.15 * uWaves;
  local.xy /= 1.0 + sin(wave + local.x) * uWaves / 30.0;
  vec2 uv = vec2(local.x / planeWidth + 0.5, 0.5 - local.y / planeHeight);
  float t = sin(uTime);
  float red = texture(uText, uv + cos(t + uv.x) * 0.01 * uChroma).r;
  float green = texture(uText, uv + clamp(tan(uv.x - t * 0.5), -3.0, 3.0) * 0.01 * uChroma).g;
  float blue = texture(uText, uv - cos(t * 3.0 + uv.y) * 0.01 * uChroma).b;
  vec4 base = texture(uText, uv);
  float inside = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
  return vec4(red, green, blue, base.a) * inside;
}

void main() {
  vec2 pixel = vec2(gl_FragCoord.x, uSize.y - gl_FragCoord.y);
  vec2 cell = floor(pixel / uCell);
  vec2 local = fract(pixel / uCell);
  vec2 center = (cell + 0.5) * uCell;
  float tick = floor(uTime * 18.0);

  float ring = 0.0;
  vec2 push = vec2(0.0);
  for (int i = 0; i < RIPPLES; i++) {
    vec4 ripple = uRipples[i];
    if (ripple.w <= 0.0) continue;
    float radius = ripple.z * max(uSize.x, uSize.y) * 0.75;
    float gap = abs(distance(center, ripple.xy) - radius);
    float band = max(uCell.y * 3.0, 24.0);
    float strength = (1.0 - smoothstep(0.0, 1.2, ripple.z)) * (1.0 - smoothstep(0.0, band, gap));
    ring = max(ring, strength);
    push += normalize(center - ripple.xy + 0.001) * strength * uCell.y * 1.5;
  }

  // Full-screen pixel dissolve and attraction towards mouse cursor
  vec2 samplePos = center - push;
  if (uDissolve > 0.0) {
    float rnd = hash(cell * 41.17 + 19.3);
    float rnd2 = hash(cell * 73.51 + 7.7);
    vec2 toPointer = uPointer - center;
    float dist = length(toPointer);
    vec2 pullDir = dist > 0.001 ? toPointer / dist : vec2(0.0);
    // Dynamic pull towards mouse across full screen
    float pull = pow(uDissolve, 1.25) * dist * (0.5 + 0.8 * rnd);
    // Full-screen explosive particle scatter
    vec2 scatterDir = vec2(cos(rnd * 6.2831), sin(rnd * 6.2831));
    vec2 scatter = scatterDir * uDissolve * max(uSize.x, uSize.y) * 0.22 * (0.3 + 0.7 * rnd2);
    samplePos += (pull * pullDir + scatter);
  }

  vec4 base = scene(samplePos);
  float content = step(0.02, base.a);
  float gray = clamp(dot(base.rgb, vec3(0.3, 0.6, 0.1)), 0.0, 1.0);
  float index = content > 0.0 ? max(1.0, floor(gray * (uGlyphCount - 1.0) + 0.5)) : 0.0;
  float randomGlyph = 1.0 + floor(hash(cell * 1.7 + tick * 0.37) * (uGlyphCount - 1.0));

  float reach = uSize.y * 0.18 * (0.5 + uScramble);
  float scramble = uHover * uScramble * (1.0 - smoothstep(reach * 0.35, reach, distance(center, uPointer)));
  if (content > 0.0 && hash(cell + tick * 7.13) < scramble * 0.8) index = randomGlyph;
  if (hash(cell + tick * 3.1) < ring) index = randomGlyph;
  float decoding = step(hash(cell * 0.37 + 2.1), uIntro);
  if (content > 0.0 && decoding > 0.0) index = randomGlyph;

  // Progressive micro-pixel dropout like PixelTrail decay
  if (uDissolve > 0.0) {
    float rndDrop = hash(cell * 29.31 + 83.1);
    if (rndDrop < uDissolve * 1.2) {
      content = 0.0;
    }
  }

  float mask = texture(uGlyphs, vec2((index + local.x) / uGlyphCount, local.y)).a;
  float glyphAlpha = mask * max(content * (1.0 - decoding * 0.35), ring * 0.75);

  float spread = length((pixel - uSize * 0.5) / (uSize * 0.5)) * 0.7071;
  vec3 tint = mix(mix(uColors[0], uColors[1], smoothstep(0.0, 0.5, spread)), uColors[2], smoothstep(0.5, 1.0, spread));

  // Turn into solid micro-pixel blocks as it dissolves, matching PixelTrail
  float blockStrength = mix(uBlocks, 1.0, clamp(uDissolve * 2.2, 0.0, 1.0));
  float blockAlpha = base.a * blockStrength * (1.0 - uIntro);
  vec3 under = base.rgb * blockAlpha;
  vec3 color = mix(under, abs(tint - under), glyphAlpha * max(0.0, 1.0 - uDissolve * 1.6));
  float alpha = max(blockAlpha, glyphAlpha) * uReady * clamp(1.0 - pow(uDissolve, 1.8), 0.0, 1.0);
  color = clamp(hueRotate(color, uHue), 0.0, 1.0) * uReady;
  if (uLight > 0.5) color = vec3(alpha) - color;
  fragColor = vec4(color, alpha);
}`;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const compile = (gl, type, source) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
};

const toRgb = color => {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return [1, 1, 1];
  ctx.fillStyle = '#ffffff';
  ctx.fillStyle = color;
  const value = String(ctx.fillStyle);
  if (value.startsWith('#')) {
    const hex = parseInt(value.slice(1, 7), 16);
    return [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255];
  }
  const parts = value.match(/[\d.]+/g)?.map(Number) ?? [255, 255, 255];
  return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
};

const drawText = (text, fontFamily, fontWeight, color) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const font = `${fontWeight} ${TEXT_PX}px ${fontFamily}`;
  ctx.font = font;
  const width = Math.max(TEXT_PX * 0.6, ctx.measureText(text || ' ').width);
  canvas.width = Math.ceil(width + TEXT_PX * 0.3);
  canvas.height = Math.ceil(TEXT_PX * 1.3);
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  return canvas;
};

const drawGlyphs = (charset, fontFamily) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  canvas.width = charset.length * GLYPH_WIDTH;
  canvas.height = GLYPH_HEIGHT;
  ctx.font = `500 ${GLYPH_HEIGHT * 0.74}px ${fontFamily}`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  Array.from(charset).forEach((char, i) => {
    ctx.fillText(char, i * GLYPH_WIDTH + GLYPH_WIDTH / 2, GLYPH_HEIGHT / 2 + GLYPH_HEIGHT * 0.04);
  });
  return canvas;
};

export default function ASCIIText({
  text = 'Hey!',
  asciiFontSize = 8,
  charset = CHARSET,
  fontFamily = FONT,
  fontWeight = 600,
  textColor = '#fdf9f3',
  colors = ['#ff6188', '#fc9867', '#ffd866'],
  textScale = 1,
  blocks = 0.9,
  waves = 1,
  waveSpeed = 1,
  chroma = 1,
  tilt = 1,
  hueShift = 1,
  scramble = 0.6,
  clickRipple = true,
  intro = true,
  idle = true,
  interactive = true,
  theme = 'dark',
  dissolve = 0,
  className = '',
  style
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const buildRef = useRef(null);
  const wakeRef = useRef(null);
  const [fallback, setFallback] = useState(false);
  const glyphs = Array.from(charset).length > 1 ? charset : CHARSET;
  const palette = (colors?.length ? colors : ['#ffffff']).slice(0, 3);
  const settings = {
    cellSize: Math.max(3, asciiFontSize),
    textScale: clamp(textScale, 0.1, 3),
    blocks: clamp(blocks, 0, 1),
    waves: Math.max(0, waves),
    waveSpeed: Math.max(0, waveSpeed),
    chroma: Math.max(0, chroma),
    tilt: Math.max(0, tilt),
    hueShift: clamp(hueShift, 0, 2),
    scramble: clamp(scramble, 0, 1),
    clickRipple,
    intro,
    idle,
    interactive,
    dissolve: clamp(dissolve, 0, 1),
    light: theme === 'light',
    colors: [palette[0], palette[1] ?? palette[0], palette[2] ?? palette[1] ?? palette[0]]
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    wakeRef.current?.();
  }, [dissolve]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
    let program = null;
    let buffer = null;
    let textTexture = null;
    let glyphTexture = null;
    const uniforms = {};

    if (gl) {
      const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      if (vertex && fragment) {
        program = gl.createProgram();
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.bindAttribLocation(program, 0, 'position');
        gl.linkProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          gl.deleteProgram(program);
          program = null;
        }
      }
      if (program) {
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        textTexture = gl.createTexture();
        glyphTexture = gl.createTexture();
        for (const name of [
          'uText',
          'uGlyphs',
          'uSize',
          'uCell',
          'uGlyphCount',
          'uTextAspect',
          'uPlaneHeight',
          'uTilt',
          'uTime',
          'uWaves',
          'uWaveSpeed',
          'uChroma',
          'uBlocks',
          'uColors',
          'uHue',
          'uPointer',
          'uHover',
          'uScramble',
          'uRipples',
          'uIntro',
          'uLight',
          'uReady',
          'uDissolve'
        ]) {
          uniforms[name] = gl.getUniformLocation(program, name);
        }
      }
    }
    if (!gl || !program) {
      setFallback(true);
      return undefined;
    }

    const upload = (texture, source, smooth) => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, smooth ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, smooth ? gl.LINEAR : gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };

    const state = {
      ready: false,
      textAspect: 1,
      glyphCount: 1,
      time: 0,
      tiltX: 0,
      tiltY: 0,
      hue: 0,
      hover: 0,
      intro: 0,
      pointerX: 0,
      pointerY: 0,
      targetX: 0,
      targetY: 0,
      inside: false,
      visible: true,
      ripples: [],
      introPlayed: false
    };
    const rippleData = new Float32Array(RIPPLES * 4);
    const colorData = new Float32Array(9);
    let colorKey = '';
    let raf = 0;
    let last = performance.now();
    let alive = true;

    const build = (value, family, weight, color, characters, playIntro) => {
      const textCanvas = drawText(value, family, weight, color);
      const glyphCanvas = drawGlyphs(characters, family);
      if (!textCanvas || !glyphCanvas) return;
      upload(textTexture, textCanvas, false);
      upload(glyphTexture, glyphCanvas, true);
      state.textAspect = textCanvas.width / textCanvas.height;
      state.glyphCount = Array.from(characters).length;
      state.ready = true;
      if (playIntro && settingsRef.current.intro && !state.introPlayed && !reduce) {
        state.introPlayed = true;
        state.intro = 1;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(container.clientWidth * dpr));
      const height = Math.max(1, Math.round(container.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const frame = now => {
      raf = 0;
      if (!alive) return;
      const s = settingsRef.current;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      state.time += reduce ? 0 : dt;
      const dpr = canvas.width / Math.max(1, container.clientWidth);

      let targetX = 0;
      let targetY = 0;
      if (s.interactive && state.inside) {
        targetX = state.targetY * 0.5 * s.tilt;
        targetY = state.targetX * 0.5 * s.tilt;
      } else if (s.idle && !reduce) {
        targetX = Math.sin(state.time * 0.55) * 0.12 * s.tilt;
        targetY = Math.sin(state.time * 0.4 + 1.3) * 0.2 * s.tilt;
      }
      const follow = 1 - Math.exp(-dt / 0.3);
      state.tiltX += (targetX - state.tiltX) * follow;
      state.tiltY += (targetY - state.tiltY) * follow;
      const angle = Math.atan2(state.targetY, state.targetX);
      const hueTarget = s.interactive && state.inside ? angle * s.hueShift : state.hue;
      let delta = hueTarget - state.hue;
      delta = Math.atan2(Math.sin(delta), Math.cos(delta));
      state.hue += delta * (1 - Math.exp(-dt / 0.25));
      state.hover += ((s.interactive && state.inside ? 1 : 0) - state.hover) * (1 - Math.exp(-dt / 0.2));
      if (state.intro > 0) state.intro = Math.max(0, state.intro - dt / 1.4);

      rippleData.fill(0);
      state.ripples = state.ripples.filter(ripple => (ripple.age += dt) < 1.3);
      state.ripples.slice(-RIPPLES).forEach((ripple, i) => {
        rippleData.set([ripple.x * dpr, ripple.y * dpr, ripple.age, 1], i * 4);
      });

      const width = canvas.width;
      const height = canvas.height;
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textTexture);
      gl.uniform1i(uniforms.uText, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, glyphTexture);
      gl.uniform1i(uniforms.uGlyphs, 1);
      gl.uniform2f(uniforms.uSize, width, height);

      // Responsive plane height calculation:
      // The ray-marching camera projects horizontally proportional to (width / height).
      // On mobile portrait screens, viewportAspect is narrow (~0.45 - 0.58).
      // We clamp plane height so the text width (planeHeight * textAspect) takes at most 78% of the screen width.
      const viewportAspect = width / Math.max(1, height);
      const textAspect = Math.max(0.5, state.textAspect || 2.0);
      const maxPlaneHeightForWidth = (viewportAspect * 0.78) / (2.0 * textAspect);
      const basePlaneHeight = 0.5 * s.textScale;
      const responsivePlaneHeight = Math.min(basePlaneHeight, maxPlaneHeightForWidth);

      // Dynamically scale cell size so ASCII resolution stays proportional and crisp on mobile
      const scaleRatio = Math.min(1.0, responsivePlaneHeight / Math.max(0.001, basePlaneHeight));
      const responsiveCellSize = Math.max(2.5, s.cellSize * Math.max(0.65, Math.pow(scaleRatio, 0.4)));

      gl.uniform2f(uniforms.uCell, responsiveCellSize * 0.62 * dpr, responsiveCellSize * dpr);
      gl.uniform1f(uniforms.uGlyphCount, state.glyphCount);
      gl.uniform1f(uniforms.uTextAspect, state.textAspect);
      gl.uniform1f(uniforms.uPlaneHeight, responsivePlaneHeight);
      gl.uniform2f(uniforms.uTilt, state.tiltX, state.tiltY);
      gl.uniform1f(uniforms.uTime, state.time);
      gl.uniform1f(uniforms.uWaves, s.waves);
      gl.uniform1f(uniforms.uWaveSpeed, s.waveSpeed);
      gl.uniform1f(uniforms.uChroma, s.chroma);
      gl.uniform1f(uniforms.uBlocks, s.blocks);
      const key = s.colors.join();
      if (key !== colorKey) {
        colorKey = key;
        colorData.set(s.colors.flatMap(toRgb));
      }
      gl.uniform3fv(uniforms.uColors, colorData);
      gl.uniform1f(uniforms.uHue, state.hue);
      gl.uniform2f(uniforms.uPointer, state.pointerX * dpr, state.pointerY * dpr);
      gl.uniform1f(uniforms.uHover, state.hover);
      gl.uniform1f(uniforms.uScramble, s.scramble);
      gl.uniform4fv(uniforms.uRipples, rippleData);
      gl.uniform1f(uniforms.uIntro, state.intro);
      gl.uniform1f(uniforms.uLight, s.light ? 1 : 0);
      gl.uniform1f(uniforms.uReady, state.ready ? 1 : 0);
      gl.uniform1f(uniforms.uDissolve, s.dissolve);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (state.visible) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || !alive || !state.visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    wakeRef.current = wake;

    buildRef.current = (value, family, weight, color, characters) => {
      build(value, family, weight, color, characters, true);
      wake();
    };

    const locate = event => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      state.pointerX = x;
      state.pointerY = y;
      state.targetX = clamp((x / Math.max(1, rect.width)) * 2 - 1, -1, 1);
      state.targetY = clamp((y / Math.max(1, rect.height)) * 2 - 1, -1, 1);
    };
    const onMove = event => {
      locate(event);
      state.inside = true;
    };
    const onLeave = () => {
      state.inside = false;
    };
    const onDown = event => {
      const s = settingsRef.current;
      if (!s.interactive || !s.clickRipple) return;
      locate(event);
      state.ripples.push({ x: state.pointerX, y: state.pointerY, age: 0 });
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const visibility = new IntersectionObserver(entries => {
      state.visible = entries.some(entry => entry.isIntersecting);
      if (state.visible) wake();
    });
    visibility.observe(container);
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerdown', onDown);
    container.addEventListener('pointerleave', onLeave);
    resize();
    wake();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      buildRef.current = null;
      wakeRef.current = null;
      resizeObserver.disconnect();
      visibility.disconnect();
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerdown', onDown);
      container.removeEventListener('pointerleave', onLeave);
      gl.deleteTexture(textTexture);
      gl.deleteTexture(glyphTexture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (!cancelled) buildRef.current?.(text, fontFamily, fontWeight, textColor, glyphs);
    };
    run();
    const fonts = document.fonts;
    if (fonts?.load) {
      Promise.all([
        fonts.load(`${fontWeight} ${TEXT_PX}px ${fontFamily}`, text || 'A'),
        fonts.load(`500 ${GLYPH_HEIGHT}px ${fontFamily}`, glyphs)
      ])
        .catch(() => null)
        .then(run);
    }
    fonts?.addEventListener?.('loadingdone', run);
    return () => {
      cancelled = true;
      fonts?.removeEventListener?.('loadingdone', run);
    };
  }, [text, fontFamily, fontWeight, textColor, glyphs]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, touchAction: 'pan-y', ...style }}
      aria-label={text}
      role="img"
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      />
      {fallback && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily,
            fontWeight,
            fontSize: `${8 * textScale}vw`,
            color: textColor
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}
