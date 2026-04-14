import axios from "axios";
import { useState, useEffect } from "react";

export function Jobs() {
  type Job = {
    job_name: string;
    company: string;
    location: string;
    src: string;
    application_link: [
      {
        title: string;
        link: string;
      },
    ];
    description: string;
    job_highlights: [
      {
        title: string;
        items: [string];
      },
    ];
    job_id: string;
  };

  const [jobs, setJobs] = useState<Job[]>([]);
  const JOBS_API_URL = "http://localhost:3000/api/job-info";

  useEffect(() => {
    axios.get(JOBS_API_URL).then((response) => setJobs(response.data));
  }, []);

  return (
    <html className="scroll-smooth!">
      <title>Results</title>
      <body>
        <main>
          <div className="flex justify-center">
            <div>
              <h1 className="text-7xl text-center pt-10 pb-10 text-blush-rose-700">
                jobs found for you!
              </h1>
              {jobs.map((j) => (
                <div className="border-blush-rose-200 hover:border-blush-rose-300 border-2 w-[70vw] mb-3 rounded-2xl align-middle hover:bg-soft-apricot-100 transition delay-50 p-6 ease-in-out hover:-translate-y-1 hover:scale-110">
                  <details className="open:[&_svg]:-rotate-180 transition-all ">
                    <summary className="text-gray-800 text-3xl flex cursor-pointer list-none items-center gap-4">
                      <div>
                        {/* <!-- notice here, we added our own triangle/arrow svg --> */}
                        <svg
                          className="transform rotate-0 text-berry-crush-500 transition-all duration-300"
                          fill="none"
                          height="20"
                          width="20"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                      <div className="text-blush-rose-600 hover:text-blush-rose-800">
                        {j.job_name} — {j.company}
                      </div>
                    </summary>
                    <div id="desc-inner" className="pt-5">
                      <h3 className="text-2xl pb-2.5">{j.location}</h3>
                      <ul className="text-2xl list-disc break-all pb-2.5">
                        Apply on:
                        {j.application_link.map((al) => (
                          <li className="inline p-2 text-xl">
                            <a
                              className="text-night-bordeaux-500 hover:text-night-bordeaux-700 transition delay-25 font-medium"
                              href={al.link}
                              target="_blank"
                            >
                              {al.title}
                            </a>
                            {/* {al.title}: {al.link} */}
                          </li>
                        ))}
                      </ul>
                      <div>
                        <h2 className="text-xl">Description:</h2>
                        <p className="pl-10 pt-5 pr-3 whitespace-pre-wrap">
                          {j.description}
                        </p>
                      </div>
                      <ul>
                        {j.job_highlights.map((jh) => (
                          <li>
                            <div className="text-xl pt-5">{jh.title}:</div>
                            <ul className=" list-disc pl-10 pt-2">
                              {jh.items.map((jhi) => (
                                <li>{jhi}</li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* <h3 className="text-2xl">{j.company}</h3> */}
                    {/* <h3 className="text-2xl">Originally from {j.src}</h3> */}
                  </details>
                  {/* <h5>{j.job_id}</h5> */}
                </div>
              ))}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
