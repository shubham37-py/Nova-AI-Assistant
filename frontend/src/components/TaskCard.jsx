function formatDueDate(date) {
  if (!date) return null;

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  }).toUpperCase();
}

function formatDueTime(time) {
  if (!time) return null;

  return time.slice(0, 5);
}

function TaskCard({ task, index, onToggle, onDelete }) {
  const dueDate = formatDueDate(task.due_date);
  const dueTime = formatDueTime(task.due_time);

  return (
    <article
      className={`task-card ${task.completed ? "completed" : ""}`}
    >
      {/* Mission index */}
      <div className="task-index">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Main content */}
      <div className="task-info">

        <div className="task-topline">
          <span className="task-category">
            {task.category || "GENERAL"}
          </span>

          <span
            className={`priority ${
              task.priority?.toLowerCase() || "normal"
            }`}
          >
            {task.priority || "NORMAL"}
          </span>
        </div>

        <h3>{task.title}</h3>

        {task.description && (
          <p>{task.description}</p>
        )}

        <div className="task-meta">

          <span>
            {dueDate ? `DUE ${dueDate}` : "NO DEADLINE"}
          </span>

          {dueTime && (
            <span>{dueTime}</span>
          )}

          <span className="task-status">
            {task.completed
              ? "MISSION CLEARED"
              : "MISSION ACTIVE"}
          </span>

        </div>

      </div>

      {/* Actions */}
      <div className="task-actions">

        <button
          className={`task-check ${
            task.completed ? "checked" : ""
          }`}
          onClick={onToggle}
          aria-label={`Mark ${task.title} as ${
            task.completed ? "incomplete" : "complete"
          }`}
        >
          {task.completed ? "✓" : ""}
        </button>

        <button
          className="task-delete"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          ×
        </button>

        <span className="task-arrow">
          →
        </span>

      </div>

    </article>
  );
}

export default TaskCard;