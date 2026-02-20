// test-utils.tsx
import { render } from "@testing-library/react";
import { HashRouter } from "react-router";
import { PreferencesProvider } from "../contexts/Preferences/PreferencesProvider.tsx";

import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { messages as enMessages } from "../locales/en/messages.ts";
import { messages as esMessages } from "../locales/es/messages.ts";
import { TasksProvider } from "../contexts/Tasks/TasksProvider.tsx";
import { BooksProvider } from "../contexts/Books/BooksProvider.tsx";

i18n.load("en", enMessages);
i18n.load("es", esMessages);
i18n.activate("en");

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <HashRouter>
      <PreferencesProvider>
        <TasksProvider>
          <BooksProvider>
            <I18nProvider i18n={i18n}>{ui}</I18nProvider>
          </BooksProvider>
        </TasksProvider>
      </PreferencesProvider>
    </HashRouter>,
  );
}

export {
  screen,
  waitFor,
  fireEvent,
  within,
  renderHook,
  act,
} from "@testing-library/react";
