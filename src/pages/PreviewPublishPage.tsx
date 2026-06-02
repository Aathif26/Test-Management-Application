import { useParams } from "react-router"

export default function PreviewPublishPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <main id="preview-publish-page">
      <h1>Preview & Publish</h1>
      <p>Test ID: {id}</p>
    </main>
  )
}
