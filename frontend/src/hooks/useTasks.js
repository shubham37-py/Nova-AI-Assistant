import { useEffect, useState } from "react";
import { getTasks } from "../services/api";

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);

        const data = await getTasks();

        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
  };
}

export default useTasks;