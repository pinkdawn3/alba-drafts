import { usePreferences } from "./usePreferences";

const translations = {
  en: {
    //Priority options in Task Managers
    low: "Low",
    medium: "Medium",
    high: "High",

    //Status options in Task Managers
    "not-started": "Not Started",
    "in-progress": "In Progress",
    completed: "Completed",

    //Options for columns in Kanban Board
    priority: "Priority",
    status: "Status",

    // Label for Checkbox in Kanban
    Completed: "Completed",
    "Mark Completed": "Mark Completed",

    // Headers for shelves in Book gracker
    paused: "Paused",
  },
  es: {
    low: "Baja",
    medium: "Media",
    high: "Alta",

    "not-started": "Pendiente",
    "in-progress": "En Curso",
    completed: "Terminado",

    priority: "Prioridad",
    status: "Progreso",

    Completed: "Terminado",
    "Mark Completed": "Marcar como terminado",

    paused: "En Pausa",
  },
} as const;

type TranslationKey = keyof typeof translations.en;
export function useTranslate() {
  const { language } = usePreferences();

  return (key: string) => {
    const translationKey = key as TranslationKey;
    return translations[language][translationKey] || key;
  };
}
