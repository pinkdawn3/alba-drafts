import { Trans } from "@lingui/react/macro";
import type { FunctionComponent } from "react";

export const Home: FunctionComponent = () => {
  return (
    <main className="flex flex-col h-screen items-center justify-center space-y-2 text-center">
      <h1>
        <Trans>Hello!</Trans>
      </h1>

      <p className="text-xl">
        <Trans>
          My name is Alba, and I'm a front-end developer! <br /> This website is
          a porfolio with the things I know how to do.
        </Trans>
      </p>

      <a
        aria-label="Github repo link"
        href="https://github.com/pinkdawn3/alba-drafts"
        className="py-5"
      >
        <Trans>Check the repo in Github</Trans>
      </a>
    </main>
  );
};
