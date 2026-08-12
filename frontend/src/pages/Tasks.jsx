import { useState } from "react";
import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";

function Tasks() {
  const [page, setPage] = useState(1);
  const [completed, setCompleted] = useState(null);

  const limit = 20;

  const {
  tasks,
  loading,
  error,
  toggleTask,
} = useTasks(page, limit, completed);

  function changeFilter(value) {
    setCompleted(value);
    setPage(1);
  }

  const hasNextPage = tasks.length === limit;
  const hasPreviousPage = page > 1;

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

      <div className="task-filters">

        <button
          className={completed === null ? "filter active" : "filter"}
          onClick={() => changeFilter(null)}
        >
          ALL
        </button>

        <button
          className={completed === false ? "filter active" : "filter"}
          onClick={() => changeFilter(false)}
        >
          ACTIVE
        </button>

        <button
          className={completed === true ? "filter active" : "filter"}
          onClick={() => changeFilter(true)}
        >
          COMPLETED
        </button>

      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>NO MISSIONS FOUND.</p>
        </div>
      ) : (
        <TaskList
  tasks={tasks}
  onToggle={toggleTask}
/>
      )}

      <div className="pagination">

        <button
          className="pagination-btn"
          disabled={!hasPreviousPage}
          onClick={() => setPage((current) => current - 1)}
        >
          ← PREVIOUS
        </button>

        <span>
          PAGE {page}
        </span>

        <button
          className="pagination-btn"
          disabled={!hasNextPage}
          onClick={() => setPage((current) => current + 1)}
        >
          NEXT →
        </button>

      </div>

    </section>
  );
}

export default Tasks;