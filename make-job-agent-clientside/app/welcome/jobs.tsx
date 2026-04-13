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
    <main>
      <div>
        <h1>today's jobs!</h1>
        <h2>test</h2>
        <div>
          {jobs.map((j) => (
            <div>
              <p>{j.job_name}</p>
              <p>{j.company}</p>
              <p>{j.location}</p>
              <p>{j.src}</p>
              <ul>
                {j.application_link.map((al) => (
                  <li>
                    {al.title}: {al.link}
                  </li>
                ))}
              </ul>
              <p>{j.description}</p>
              <ul>
                {j.job_highlights.map((jh) => (
                  <li>
                    {jh.title}:
                    <ul>
                      {jh.items.map((jhi) => (
                        <li>{jhi}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <p>{j.job_id}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
