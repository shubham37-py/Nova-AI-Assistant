import { useState } from "react";
import useTasks from "../hooks/useTasks";
import NovaCore from "../components/NovaCore";
import TaskList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskForm";

function Dashboard() {
  const {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    removeTask,
  } = useTasks();

  const [showCreateTask, setShowCreateTask] = useState(false);

  if (loading) {
    return (
      <section className="dashboard-state">
        <span className="eyebrow">NOVA // SYSTEM</span>
        <h1>LOADING <span>MISSIONS...</span></h1>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-state">
        <span className="eyebrow">NOVA // ERROR</span>
        <h1>SYSTEM <span>ERROR.</span></h1>
        <p>{error}</p>
      </section>
    );
  }

  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = tasks.length - completedTasks;

  const highPriority = tasks.filter(
    (task) =>
      !task.completed &&
      task.priority?.toLowerCase() === "high"
  ).length;

  return (
    <>
      <header className="nova-header">
        <div className="header-copy">
          <span className="nova-status">NOVA // COMMAND CENTER</span>
          <h1>GOOD MORNING.</h1>
        </div>

        <div className="header-status">
          <span>14 DAY STREAK</span>

          <span className="system-online">
            <i />
            SYSTEM ONLINE
          </span>
        </div>
      </header>

      <main className="dashboard">

        {/* =========================================
            HERO COMMAND AREA
        ========================================= */}

        <section className="dashboard-hero">

          <div className="core-module">
            <div className="module-label">
              <span>NOVA CORE</span>
              <span>01 // ACTIVE</span>
            </div>

            <NovaCore />

            <div className="core-telemetry">
              <span>CORE STATUS</span>
              <strong>OPERATIONAL</strong>
            </div>
          </div>

          <div className="command-status">

            <div className="status-heading">
              <span className="eyebrow">SYSTEM TELEMETRY</span>
              <span className="telemetry-code">
                LIVE // 001
              </span>
            </div>

            <div className="mission-stats">

              <div className="mission-stat">
                <span>ACTIVE</span>
                <strong>{activeTasks.toString().padStart(2, "0")}</strong>
                <small>MISSIONS</small>
              </div>

              <div className="mission-stat">
                <span>COMPLETED</span>
                <strong>{completedTasks.toString().padStart(2, "0")}</strong>
                <small>TODAY</small>
              </div>

              <div className="mission-stat stat-danger">
                <span>HIGH PRIORITY</span>
                <strong>{highPriority.toString().padStart(2, "0")}</strong>
                <small>REQUIRES ATTENTION</small>
              </div>

            </div>

            <div className="system-readout">
              <div>
                <span>SYSTEM LOAD</span>
                <strong>78%</strong>
              </div>

              <div className="load-bar">
                <span style={{ width: "78%" }} />
              </div>

              <div className="system-readout-footer">
                <span>FOCUS MODE</span>
                <span>ENGAGED</span>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================
            MISSIONS
        ========================================= */}

        <section className="missions-section">

          <div className="missions-heading">

            <div>
              <span className="eyebrow">
                TODAY'S MISSIONS
              </span>

              <h2>
                WHAT ARE WE <span>ATTACKING?</span>
              </h2>
            </div>

            <button
              className="primary-btn"
              onClick={() => setShowCreateTask(true)}
            >
              <span>+</span>
              NEW TASK
            </button>

          </div>

          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={removeTask}
          />

        </section>

      </main>

      {/* =========================================
          CREATE TASK PANEL
      ========================================= */}

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