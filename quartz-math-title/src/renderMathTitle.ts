import katex from "katex"

/**
 * Renders a title string that may contain LaTeX math ($...$ or $$...$$)
 * into an HTML string, with math segments rendered via KaTeX and
 * plain-text segments HTML-escaped.
 *
 * Use with `dangerouslySetInnerHTML={{ __html: renderMathTitle(title) }}`
 * inside a Quartz/Preact component.
 */
export function renderMathTitle(raw: string): string {
  if (!raw) return ""

  // Matches $$...$$ (display) OR $...$ (inline), non-greedy
  const mathPattern = /\$\$([^$]+?)\$\$|\$([^$]+?)\$/g

  let result = ""
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = mathPattern.exec(raw)) !== null) {
    // Escape and append the plain text before this match
    result += escapeHtml(raw.slice(lastIndex, match.index))

    const displayMath = match[1]
    const inlineMath = match[2]
    const isDisplay = displayMath !== undefined
    const expr = isDisplay ? displayMath : inlineMath

    try {
      result += katex.renderToString(expr ?? "", {
        throwOnError: false,
        displayMode: isDisplay,
        output: "html",
      })
    } catch (err) {
      // Fall back to escaped raw text if KaTeX chokes on the expression
      result += escapeHtml(match[0])
    }

    lastIndex = mathPattern.lastIndex
  }

  // Append any trailing plain text after the last match
  result += escapeHtml(raw.slice(lastIndex))

  return result
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}