import { useState } from "react";
import useTasks from "../hooks/useTasks";
import NovaCore from "../components/NovaCore";
import TaskList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskForm";

function Dashboard() {
  const { tasks, loading, error, addTask, toggleTask } = useTasks();
  const [showCreateTask, setShowCreateTask] = useState(false);
  if (loading) {
    return (
      <section className="dashboard">
        <p className="eyebrow">NOVA // SYSTEM</p>
        <h2>
          LOADING <span>TASKS...</span>
        </h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard">
        <p className="eyebrow">NOVA // ERROR</p>
        <h2>
          SYSTEM <span>ERROR.</span>
        </h2>
        <p className="page-description">{error}</p>
      </section>
    );
  }

  return (
    <>
      <header className="nova-header">
        <div>
          <span className="nova-status">NOVA // ONLINE</span>

          <h1>GOOD MORNING.</h1>
        </div>

        <div className="header-status">
          <span>14 DAY STREAK</span>

          <span className="system-online">● SYSTEM ONLINE</span>
        </div>
      </header>

      <section className="dashboard">
        <NovaCore />

        <div className="dashboard-intro">
          <div>
            <p className="eyebrow">TODAY'S OBJECTIVES</p>

            <h2>
              WHAT ARE WE
              <span> ATTACKING?</span>
            </h2>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowCreateTask(true)}
          >
            + NEW TASK
          </button>
        </div>

        <TaskList tasks={tasks} onToggle={toggleTask} />
      </section>
      {showCreateTask && (
        <div className="task-panel-overlay">
          <aside className="task-panel">
            <button
              className="panel-close"
              onClick={() => setShowCreateTask(false)}
            >
              ×
            </button>

            <CreateTaskForm
              onCreated={(createdTask) => {
                setShowCreateTask(false);
                addTask(createdTask);
              }}
            />
          </aside>
        </div>
      )}
    </>
  );
}

export default Dashboard;
