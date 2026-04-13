import axios from "axios";

const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
  const FORM_API_URL = "http://localhost:3000/api/job-info";

  event.preventDefault();
  let data = new FormData();
  let jfile = document.querySelector("#jobs") as HTMLInputElement;

  data.append("jobs", jfile.files![0])

  // axios call to post to server. pls work
  // i'm begging
  axios
    .post(FORM_API_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));

    window.location.href = "/jobs";

}

export function Welcome() {
  return (
    <main>
      <div>
        <header>
        </header>
        <div>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <label htmlFor="jobs">SerpAPI Jobs JSON File</label>
              <br />
              <input name="jobs" id="jobs" type="file" />
            </div>
            <div>
              <input type="submit" value="Send"/>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
