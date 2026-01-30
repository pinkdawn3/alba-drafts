import { usePreferences } from "./usePreferences";

const translations = {
  en: {
    low: "Low",
    medium: "Medium",
    high: "High",

    "not-started": "Not Started",
    "in-progress": "In Progress",
    completed: "Completed",

    priority: "Priority",
    status: "Status",
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
  },
} as const;

type TranslationKey = keyof typeof translations.en;
export function useTranslateOption() {
  const { language } = usePreferences();

  return (key: string) => {
    const translationKey = key as TranslationKey;
    return translations[language][translationKey] || key;
  };
}
