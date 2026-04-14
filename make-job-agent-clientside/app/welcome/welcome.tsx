import axios from "axios";

const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
  const FORM_API_URL = "http://localhost:3000/api/job-info";

  event.preventDefault();
  let data = new FormData();
  let jfile = document.querySelector("#jobs") as HTMLInputElement;

  data.append("jobs", jfile.files![0]);

  // axios call to post to server. pls work
  // i'm begging
  axios
    .post(FORM_API_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));

  window.location.href = "/jobs";
};

export function Welcome() {
  return (
    <main>
      <div className="">
        <header></header>
        <div className="flex justify-center flex-col m-auto h-screen w-[60vw]">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label
                className="text-xl block font-medium justify-center text-center text-blush-rose-700"
                htmlFor="jobs"
              >
                SerpAPI JSON File
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    data-slot="icon"
                    aria-hidden="true"
                    className="mx-auto size-12 text-berry-crush-400"
                  >
                    <path
                      d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="jobs"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blush-rose-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blush-rose-400 hover:text-blush-rose-400"
                    >
                      <span>Upload a file</span>
                      <input
                        name="jobs"
                        id="jobs"
                        type="file"
                        className="sr-only"
                        accept=".json"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">
                    JSON only, up to 10mb
                  </p>
                </div>
              </div>
              <br />
            </div>
            <div className="flex justify-center flex-col">
              <input
                type="submit"
                value="Send"
                className="rounded-md bg-blush-rose-200 px-3 py-2 text-sm font-semibold text-black hover:text-white shadow-xs hover:bg-blush-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-rose-300 transition delay-25"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
