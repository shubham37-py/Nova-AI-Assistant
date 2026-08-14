import { BrowserRouter, Routes, Route } from "react-router-dom";

import NovaShell from "./components/NovaShell";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NovaShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </NovaShell>
    </BrowserRouter>
  );
}

export default App;