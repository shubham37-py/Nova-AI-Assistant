import { useState } from "react";

import NovaCore from "../components/NovaCore";
import TaskList from "../components/TaskList";
import { initialTasks } from "../data/mockTasks";

function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);

  function toggleTask(index) {
    setTasks((currentTasks) =>
      currentTasks.map((task, i) =>
        i === index
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <>
      <header className="nova-header">
        <div>
          <span className="nova-status">
            NOVA // ONLINE
          </span>

          <h1>GOOD MORNING.</h1>
        </div>

        <div className="header-status">
          <span>14 DAY STREAK</span>

          <span className="system-online">
            ● SYSTEM ONLINE
          </span>
        </div>
      </header>

      <section className="dashboard">

        <NovaCore />

        <div className="dashboard-intro">
          <div>
            <p className="eyebrow">
              TODAY'S OBJECTIVES
            </p>

            <h2>
              WHAT ARE WE
              <span> ATTACKING?</span>
            </h2>
          </div>

          <button className="primary-btn">
            + NEW TASK
          </button>
        </div>

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
        />

      </section>
    </>
  );
}

export default Dashboard;