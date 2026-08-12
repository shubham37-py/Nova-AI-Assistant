import TaskCard from "./TaskCard";


function TaskList({ tasks, onToggle }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={() => onToggle(task)}
        />
      ))}
    </div>
  );
}

export default TaskList;