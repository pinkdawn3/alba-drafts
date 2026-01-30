import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { PreferencesProvider } from "./contexts/PreferencesProvider.tsx";
import { TasksProvider } from "./contexts/TasksProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <PreferencesProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </PreferencesProvider>
    </HashRouter>
  </StrictMode>,
);
