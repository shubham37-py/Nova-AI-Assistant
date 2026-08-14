import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

function useTasks(page = 1, limit = 20, completed = null) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);

      const data = await getTasks(page, limit, completed);

      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(task) {
    try {
      const createdTask = await createTask(task);

      setTasks((currentTasks) => [...currentTasks, createdTask]);

      return createdTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function toggleTask(task) {
    try {
      const updatedTask = await updateTask(task.id, {
        completed: !task.completed,
      });

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask,
        ),
      );

      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function removeTask(taskId) {
    try {
      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  useEffect(() => {
    loadTasks();
  }, [page, limit, completed]);

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    removeTask,
  };
}

export default useTasks;
