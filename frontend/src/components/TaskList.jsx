import TaskCard from "./TaskCard";

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          index={index}
          onToggle={() => onToggle(task)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;