import ProfilePic from "../../assets/profile-pic.jpg";
import CVEnglish from "../../assets/AlbaDeTaoro_SoftwareDeveloper_CV (English).pdf";
import CVSpanish from "../../assets/AlbaDeTaoro_SoftwareDeveloper_CV (Español).pdf";

function About() {
  return (
    <main className="sm:flex items-center max-w-7xl">
      <div className="sm:w-1/2 p-10 flex justify-content">
        <div className="image mx-auto">
          <img src={ProfilePic} alt="profile picture" className="rounded-3xl" />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
            About Me
          </span>
          <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
            Alba <span className="text-indigo-600">De Taoro González</span>
          </h2>
          <div className="text-gray-200 space-y-4">
            <p>
              My professional journey didn't start in software development. I
              originally studied Translation and interpreting, but I had the
              misfortune of having to enter the job market in 2020.
            </p>
            <p>
              I felt stuck so I decided to reinvent myself. Apart from
              languages, my other great passion since I was a child was
              computers. So, I studied software development with my initial
              intention being working on Game Development.
            </p>
            <p>
              Along the way, however, I uncovered a passion for web development
              and front-end, and here I am now. I am excited to keep learning
              and creating new things along the way.
            </p>

            <div className="flex items-center">
              <a
                aria-label="download cv in english"
                className="button text-center"
                href={CVEnglish}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>

              <p className="pl-5 text-center">
                <span className=" whitespace-pre-wrap">
                  ...or download it in{" "}
                </span>

                <a
                  aria-label="download cv in spanish"
                  className="text-blue-500 underline hover:cursor-pointer"
                  href={CVSpanish}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spanish
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
