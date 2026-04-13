const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: "./job-uploads",
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + file.originalname);
    },
  }),
});
const connectDB = require("./config/db");
const Job = require("./models/jobModel");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.get("/api", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/all-job-info", async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json(jobs);
  //res.send("Hello!! hello!!!");
});

/**
 * @description Submits the job JSON file entered by the user on the client-side form.
 * @route POST api/job-info
 * @access Public
 */
app.post("/api/job-info", upload.single("jobs"), async (req, res) => {
  const data = fs.readFileSync(req.file.path, "utf-8");
  const jobsJson = JSON.parse(data);
  const jobsResults = jobsJson.jobs_results;

  testJobs = [];

  // checks if the jobs_results array in the serpAPI JSON is empty.
  // if it is, it send a 400 status code and error message back
  if (!jobsResults) {
    res.status(400);
    throw new Error("There were no jobs in the file you uploaded.");
  }

  for (i = 0; i < jobsResults.length; i++) {
    helpme = await Job.create({
      job_name: jobsResults[i].title,
      company: jobsResults[i].company_name,
      location: jobsResults[i].location,
      src: jobsResults[i].via,
      application_link: jobsResults[i].apply_options,
      description: jobsResults[i].description,
      job_highlights: jobsResults[i].job_highlights,
      job_id: jobsResults[i].job_id,
    });

    testJobs.push(helpme);
  }

  //res.status(200).json({ message: "it worked!", body: testJobs });
  // res.redirect("/api/all-job-info");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
