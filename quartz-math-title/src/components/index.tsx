import type { QuartzComponent, QuartzComponentProps } from "@quartz-community/types"
import { renderMathTitle } from "../renderMathTitle"

function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

export const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  if (title) {
    return (
      <h1
        class={classNames(displayClass, "article-title")}
        dangerouslySetInnerHTML={{ __html: renderMathTitle(title) }}
      />
    )
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default () => ArticleTitle
