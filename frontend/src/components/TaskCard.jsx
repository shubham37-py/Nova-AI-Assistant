function TaskCard({ task, onToggle }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <button
        className="task-check"
        onClick={onToggle}
        aria-label={`Mark ${task.title} as ${
          task.completed ? "incomplete" : "complete"
        }`}
      >
        {task.completed ? "✓" : ""}
      </button>

      <div className="task-info">
        <div className="task-topline">
          <span className="task-category">
            {task.category}
          </span>

          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>

        <h3>{task.title}</h3>

        <p>{task.description}</p>
      </div>

      <div className="task-arrow">→</div>
    </div>
  );
}

export default TaskCard;