/**
 * 将OKLCH颜色格式转换为HEXA格式
 * @param l 亮度 (0-1)
 * @param c 色度 (0-0.4)
 * @param h 色相 (0-360)
 * @param alpha 透明度 (0-1)
 * @returns HEXA格式的颜色字符串 (#RRGGBBAA)
 */
function oklchToHexa(l: number, c: number, h: number, alpha: number = 1): string {
  // 首先将OKLCH转换为OKLAB
  const hRadians = (h * Math.PI) / 180
  const a = c * Math.cos(hRadians)
  const b = c * Math.sin(hRadians)

  // 将OKLAB转换为线性RGB
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  // 将线性RGB转换为sRGB
  const l_cube = l_ * l_ * l_
  const m_cube = m_ * m_ * m_
  const s_cube = s_ * s_ * s_

  const r = 4.0767416621 * l_cube - 3.3077115913 * m_cube + 0.2309699292 * s_cube
  const g = -1.2684380046 * l_cube + 2.6097574011 * m_cube - 0.3413193965 * s_cube
  const b_val = -0.0041960863 * l_cube - 0.7034186147 * m_cube + 1.707614701 * s_cube

  // 将sRGB值限制在0-1范围内
  const r_clamped = Math.max(0, Math.min(1, r))
  const g_clamped = Math.max(0, Math.min(1, g))
  const b_clamped = Math.max(0, Math.min(1, b_val))

  // 转换为0-255范围
  const r_255 = Math.round(r_clamped * 255)
  const g_255 = Math.round(g_clamped * 255)
  const b_255 = Math.round(b_clamped * 255)
  const a_255 = Math.round(alpha * 255)

  // 转换为十六进制
  const r_hex = r_255.toString(16).padStart(2, '0')
  const g_hex = g_255.toString(16).padStart(2, '0')
  const b_hex = b_255.toString(16).padStart(2, '0')
  const a_hex = a_255.toString(16).padStart(2, '0')

  // 返回HEXA格式
  return `#${r_hex}${g_hex}${b_hex}${a_hex !== 'ff' ? a_hex : ''}`
}

/**
 * 解析OKLCH字符串并转换为HEXA格式
 * @param oklchString OKLCH格式的字符串，如 "oklch(0.8 0.2 270 / 0.5)"
 * @returns HEXA格式的颜色字符串
 */
export function parseOklchToHexa(oklchString: string): string {
  // 更新正则表达式以支持百分比格式和更灵活的空格
  const regex = /oklch\(\s*([0-9.]+)(%?)\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+))?\s*\)/i
  const match = oklchString.match(regex)

  if (!match) {
    throw new Error('not a valid oklch string: ' + oklchString)
  }

  // 处理百分比值
  let l = parseFloat(match[1])
  const isPercent = match[2] === '%'
  if (isPercent) {
    l = l / 100 // 将百分比转换为0-1范围
  }

  const c = parseFloat(match[3])
  const h = parseFloat(match[4])
  const alpha = match[5] ? parseFloat(match[5]) : 1

  return oklchToHexa(l, c, h, alpha)
}
