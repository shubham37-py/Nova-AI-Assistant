import { useState } from "react";


function CreateTaskForm({ onCreated })  {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "General",
    due_date: "",
    due_time: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
  event.preventDefault();

  try {
    setSaving(true);
    setError(null);

    const task = {
      ...form,
      description: form.description || null,
      due_date: form.due_date || null,
      due_time: form.due_time || null,
    };

    await onCreated(task);

    setForm({
      title: "",
      description: "",
      priority: "Medium",
      category: "General",
      due_date: "",
      due_time: "",
    });
  } catch (err) {
    setError(err.message);
  } finally {
    setSaving(false);
  }
}

  return (
    <form className="create-task-form" onSubmit={handleSubmit}>
      <p className="eyebrow">NOVA // NEW MISSION</p>

      <h2>
        CREATE <span>TASK.</span>
      </h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <div className="form-row">
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
      </div>

      <div className="form-row">
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="due_time"
          value={form.due_time}
          onChange={handleChange}
        />
      </div>

      {error && (
        <p className="form-error">{error}</p>
      )}

      <button
        className="primary-btn"
        type="submit"
        disabled={saving}
      >
        {saving ? "CREATING..." : "🔥 CREATE TASK"}
      </button>
    </form>
  );
}

export default CreateTaskForm;