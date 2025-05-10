function oklchToHexa(l: number, c: number, h: number, alpha: number = 1): string {
  const hRadians = (h * Math.PI) / 180
  const a = c * Math.cos(hRadians)
  const b = c * Math.sin(hRadians)

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  const l_cube = l_ * l_ * l_
  const m_cube = m_ * m_ * m_
  const s_cube = s_ * s_ * s_

  const r = 4.0767416621 * l_cube - 3.3077115913 * m_cube + 0.2309699292 * s_cube
  const g = -1.2684380046 * l_cube + 2.6097574011 * m_cube - 0.3413193965 * s_cube
  const b_val = -0.0041960863 * l_cube - 0.7034186147 * m_cube + 1.707614701 * s_cube

  const r_clamped = Math.max(0, Math.min(1, r))
  const g_clamped = Math.max(0, Math.min(1, g))
  const b_clamped = Math.max(0, Math.min(1, b_val))

  const r_255 = Math.round(r_clamped * 255)
  const g_255 = Math.round(g_clamped * 255)
  const b_255 = Math.round(b_clamped * 255)
  const a_255 = Math.round(alpha * 255)

  const r_hex = r_255.toString(16).padStart(2, '0')
  const g_hex = g_255.toString(16).padStart(2, '0')
  const b_hex = b_255.toString(16).padStart(2, '0')
  const a_hex = a_255.toString(16).padStart(2, '0')

  return `#${r_hex}${g_hex}${b_hex}${a_hex !== 'ff' ? a_hex : ''}`
}

export function parseOklchToHexa(oklchString: string): string {
  const regex = /oklch\(\s*([0-9.]+)(%?)\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+))?\s*\)/i
  const match = oklchString.match(regex)

  if (!match) {
    throw new Error('not a valid oklch string: ' + oklchString)
  }

  let l = parseFloat(match[1])
  const isPercent = match[2] === '%'
  if (isPercent) {
    l = l / 100
  }

  const c = parseFloat(match[3])
  const h = parseFloat(match[4])
  const alpha = match[5] ? parseFloat(match[5]) : 1

  return oklchToHexa(l, c, h, alpha)
}
