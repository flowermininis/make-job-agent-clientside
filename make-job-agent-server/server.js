const express = require("express");
const FormData = require("form-data");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

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

app.get("/api/job-info", (req, res) => {
  res.send("Hello!! hello!!!");
});

// method that receives POST request from the HTML form on the client side
// but this will end up posting that data to make.com's webhook to
// start the scenario
app.post("/api/job-info", upload.single("resume"), (req, res) => {
  const formData = new FormData();

  formData.append("name", req.body.name);
  formData.append("skills", req.body.skills);
  formData.append("jobTypes", req.body.jobTypes);
  formData.append("industries", req.body.industries);
  formData.append("location", req.body.location);
  formData.append("keywordsAvoid", req.body.keywordsAvoid);
  formData.append("resume", req.file.buffer, {
    filename: req.file.originalname,
    contentType: req.file.mimetype,
  });

  data = req.body;
  resume = req.file;

  try {
    //   const externalResponse =
    //
    fetch("https://hook.us2.make.com/hvtlobj1qxn526j92i601h7ool6zjxud", {
      method: "POST",
      headers: {
        "x-make-apikey": process.env.MAKE_WEBHOOK_KEY,
      },
      body: formData,
    });

    //   const apiResult = externalResponse.json();

    //   // Send the external API's response back to your frontend
    //   res.status(externalResponse.status).json(apiResult);
  } catch (error) {
    console.error("Error posting to external API:", error);
    res.status(500).json({ error: "Failed to communicate with external API" });
  }

  //if data is received successfully, print data to console and send a response back to the client with the data. but wait!
  console.log(data, resume);
  res.status(200).json({ message: "it worked!", body: formData });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
