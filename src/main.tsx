import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PreferencesProvider } from "./contexts/Preferences/PreferencesProvider.tsx";
import { TasksProvider } from "./contexts/Tasks/TasksProvider.tsx";

import "./index.css";
import "flowbite";
import { BooksProvider } from "./contexts/Books/BooksProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <PreferencesProvider>
        <TasksProvider>
          <BooksProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BooksProvider>
        </TasksProvider>
      </PreferencesProvider>
    </HashRouter>
  </StrictMode>,
);
