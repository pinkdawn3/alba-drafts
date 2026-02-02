// test-utils.tsx
import { render } from "@testing-library/react";
import { HashRouter } from "react-router";
import { PreferencesProvider } from "../contexts/PreferencesProvider";

import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { messages as enMessages } from "../locales/en/messages.ts";
import { messages as esMessages } from "../locales/es/messages.ts";
import { TasksProvider } from "../contexts/TasksProvider.tsx";

i18n.load("en", enMessages);
i18n.load("es", esMessages);
i18n.activate("en");

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <HashRouter>
      <PreferencesProvider>
        <TasksProvider>
          <I18nProvider i18n={i18n}>{ui}</I18nProvider>
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
