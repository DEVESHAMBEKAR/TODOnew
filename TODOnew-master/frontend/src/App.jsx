import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ Fetch todos from backend
  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchTodos = async () => {
    try {
      if (!BASE_URL) {
        setError("Backend API URL not configured. Please set VITE_API_URL environment variable.");
        return;
      }

      const res = await fetch(`${BASE_URL}/todos`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Cannot connect to backend API: " + err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ Add new todo
  const addTodo = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask, status: "pending" }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const data = await res.json();
      setTodos([...todos, data]);
      setNewTask("");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete task");

      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Start editing
  const startEditing = (id, currentTask) => {
    setEditingId(id);
    setEditingText(currentTask);
  };

  // ✅ Save edited todo
  const saveEdit = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: editingText }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updated = await res.json();
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Update status (done/pending)
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const updated = await res.json();
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return todo.status === filter;
  });

  // ✅ Change background color if URL contains color=purple
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("color") === "purple") {
      document.body.style.backgroundColor = "purple";
    } else {
      document.body.style.backgroundColor = "";
    }
  }, []);

  return (
    <div className="App">
      <h1>✅ TODO</h1>

      {error && <p style={{ color: "red" }}>
        ❌ {error}
      </p>}

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Filter Buttons */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("all")}>Show All</button>
        <button onClick={() => setFilter("pending")}>Show Pending</button>
        <button onClick={() => setFilter("done")}>Show Done</button>
      </div>

      <ol>
        {filteredTodos.map((todo) => (
          <li key={todo._id}>
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo._id)}>Save</button>
              </>
            ) : (
              <>
                {todo.task} - <b>{todo.status}</b>
                <br />
                <button onClick={() => startEditing(todo._id, todo.task)}>
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                {todo.status !== "done" ? (
                  <button onClick={() => updateStatus(todo._id, "done")}>
                    Done
                  </button>
                ) : (
                  <button onClick={() => updateStatus(todo._id, "pending")}>
                    Pending
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;