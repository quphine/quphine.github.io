import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import { renderMathTitle } from "./renderMathTitle"

const MathArticleTitle: QuartzComponentConstructor = () => {
  const Component: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const title = fileData.frontmatter?.title ?? fileData.slug ?? ""
    return <h1 dangerouslySetInnerHTML={{ __html: renderMathTitle(title as string) }} />
  }
  return Component
}

export default MathArticleTitle