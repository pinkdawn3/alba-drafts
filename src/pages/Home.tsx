import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { Trans } from "@lingui/react/macro";

function Home() {
  return (
    <section className="flex flex-col h-screen items-center justify-center space-y-2 text-center">
      <h1 className="font-bold">
        <Trans>Hello!</Trans>
      </h1>

      <p className="text-xl px-7">
        <Trans>
          My name is Alba, and I'm a front-end developer! <br /> This website is
          a porfolio with the things I know how to do.
        </Trans>
      </p>
      <div className="py-5">
        <a
          aria-label="Github repo link"
          href="https://github.com/pinkdawn3/alba-drafts"
        >
          <Trans>Check the repo in Github</Trans>
        </a>
        <p className="text-xs">
          Made with React <FontAwesomeIcon icon={faReact} /> (+ Vite{" "}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg"
            alt="vite icon"
            className="size-3 inline"
          />
          ) & Tailwind{" "}
          <img
            src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.96ee6a5a.svg"
            alt="tailwind icon"
            className="size-4 inline"
          />
        </p>
      </div>
    </section>
  );
}

export default Home;
