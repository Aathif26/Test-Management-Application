import { useParams } from "react-router"

export default function AddQuestionPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <main id="add-question-page">
      <h1>Add Questions</h1>
      <p>Test ID: {id}</p>
    </main>
  )
}
