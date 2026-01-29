import ProfilePic from "../assets/profile-pic.jpg";
import CVEnglish from "../assets/AlbaDeTaoro_SoftwareDeveloper_CV (English).pdf";
import CVSpanish from "../assets/AlbaDeTaoro_SoftwareDeveloper_CV (Español).pdf";
import { Trans } from "@lingui/react/macro";
import { i18n } from "@lingui/core";

function About() {
  const handleCVLanguage = (button: string) => {
    switch (button) {
      case "primary":
        if (i18n.locale == "es") {
          return CVSpanish;
        } else if (i18n.locale == "en") {
          return CVEnglish;
        }

        break;

      case "secondary":
        if (i18n.locale == "es") {
          return CVEnglish;
        } else if (i18n.locale == "en") {
          return CVSpanish;
        }

        break;

      default:
        return CVEnglish;
    }
  };

  const CVPrimary = handleCVLanguage("primary");
  const CVSecondary = handleCVLanguage("secondary");

  return (
    <section className="sm:flex items-center max-w-7xl">
      <div className="sm:w-1/2 p-10 flex justify-content">
        <div className="image mx-auto">
          <img src={ProfilePic} alt="profile picture" className="rounded-3xl" />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-font border-b-2 border-indigo-600 uppercase">
            <Trans>About Me</Trans>
          </span>
          <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
            Alba <span className="text-indigo-600">De Taoro González</span>
          </h2>
          <div className="space-y-4">
            <p>
              <Trans>
                My professional journey didn't start in software development. I
                originally studied Translation and interpreting, but I had the
                misfortune of having to enter the job market in 2020.
              </Trans>
            </p>
            <p>
              <Trans>
                I felt stuck so I decided to reinvent myself. Apart from
                languages, my other great passion since I was a child was
                computers. So, I studied software development with my initial
                intention being working on Game Development.
              </Trans>
            </p>
            <p>
              <Trans>
                Along the way, however, I uncovered a passion for web
                development and front-end, and here I am now. I am excited to
                keep learning and creating new things along the way.
              </Trans>
            </p>

            <div className="flex items-center font-semibold">
              <a
                aria-label="download cv in english"
                className="button text-center font-semibold!"
                href={CVPrimary}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Trans>Download CV</Trans>
              </a>

              <p className="pl-5 text-center">
                <span className=" whitespace-pre-wrap">
                  <Trans>...or download it in </Trans>
                </span>

                <a
                  aria-label="download cv in spanish"
                  className="text-blue-500 underline hover:cursor-pointer"
                  href={CVSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Trans id="cv_language">Spanish</Trans>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
