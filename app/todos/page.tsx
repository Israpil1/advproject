import TodoList from '@/components/ToDoList'

export default function TodosPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Мой Todo List</h1>
      <TodoList />
    </div>
  )
}