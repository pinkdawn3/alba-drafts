import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PreferencesProvider } from "./contexts/PreferencesProvider.tsx";
import { TasksProvider } from "./contexts/TasksProvider.tsx";

import "./index.css";
import "flowbite";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <PreferencesProvider>
        <TasksProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </TasksProvider>
      </PreferencesProvider>
    </HashRouter>
  </StrictMode>,
);
