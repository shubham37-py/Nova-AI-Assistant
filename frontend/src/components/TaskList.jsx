import TaskCard from "./TaskCard";

function TaskList({ tasks, onToggle }) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          onToggle={() => onToggle(index)}
        />
      ))}
    </div>
  );
}

export default TaskList;