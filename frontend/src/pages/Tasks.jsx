import useTasks from "../hooks/useTasks";

function Tasks() {
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return (
      <section className="page-section">
        <p className="eyebrow">NOVA // TASK SYSTEM</p>

        <h2>
          LOADING <span>TASKS...</span>
        </h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-section">
        <p className="eyebrow">NOVA // ERROR</p>

        <h2>
          SYSTEM <span>ERROR.</span>
        </h2>

        <p className="page-description">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">
          NOVA // TASK SYSTEM
        </p>

        <h2>
          ALL <span>TASKS.</span>
        </h2>

        <p className="page-description">
          Your complete mission queue.
        </p>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="task-check">
              {task.completed ? "✓" : ""}
            </div>

            <div className="task-info">
              <div className="task-topline">
                <span className="task-category">
                  {task.category}
                </span>

                <span
                  className={`priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>
              </div>

              <h3>{task.title}</h3>

              <p>{task.description}</p>
            </div>

            <div className="task-arrow">
              →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tasks;