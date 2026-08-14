import { useState } from "react";

function CreateTaskForm({ onCreated }) {
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
      <div className="form-header">
        <div>
          <p className="eyebrow">NOVA // NEW MISSION</p>

          <h2>
            DEPLOY <span>MISSION.</span>
          </h2>
        </div>

        <span className="form-code">CREATE // 001</span>
      </div>

      <div className="form-section">
        <label htmlFor="task-title">MISSION OBJECTIVE</label>

        <input
          id="task-title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="What are we attacking?"
          autoFocus
          required
        />
      </div>

      <div className="form-section">
        <label htmlFor="task-description">MISSION BRIEF</label>

        <textarea
          id="task-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add intelligence, context or instructions..."
          rows={4}
        />
      </div>

      <div className="form-grid">
        <div className="form-section">
          <label htmlFor="task-priority">PRIORITY</label>

          <select
            id="task-priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="High">HIGH</option>
            <option value="Medium">MEDIUM</option>
            <option value="Low">LOW</option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="task-category">CATEGORY</label>

          <input
            id="task-category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Development"
            required
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-section">
          <label htmlFor="task-date">DUE DATE</label>

          <input
            id="task-date"
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <label htmlFor="task-time">DUE TIME</label>

          <input
            id="task-time"
            type="time"
            name="due_time"
            value={form.due_time}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && (
        <div className="form-error">
          <span>!</span>
          <div>
            <strong>SYSTEM ERROR</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className="form-footer">
        <span className="form-status">
  <i className={saving ? "processing" : ""} />
  {saving ? "TRANSMITTING..." : "READY FOR DEPLOYMENT"}
</span>
        <button
          className="primary-btn"
          type="submit"
          disabled={saving}
        >
          {saving ? "DEPLOYING..." : "DEPLOY MISSION →"}
        </button>
      </div>
    </form>
  );
}

export default CreateTaskForm;