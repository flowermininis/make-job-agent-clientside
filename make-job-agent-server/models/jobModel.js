const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    job_name: String,
    company: {
      type: String,
      index: true,
    },
    location: String,
    src: String,
    application_link: [
      {
        title: String,
        link: String,
      },
    ],
    description: String,
    job_highlights: [
      {
        title: String,
        items: [String],
      },
    ],
    job_id: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
