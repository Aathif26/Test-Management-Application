import { useParams } from "react-router"

export default function CreateEditPage() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)

  return (
    <main id="create-edit-page">
      <h1>{isEditing ? "Edit Test" : "Create Test"}</h1>
    </main>
  )
}
