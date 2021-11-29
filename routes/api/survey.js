const express = require("express");
const router = express.Router();

const Servey = require("../../models/Survey");

// add new Survey .....
router.post("/new", async (req, res) => {
  const { title, questions, email } = req.body;
  if (!title || !questions) {
    return res.status(400).json({ error: "all fields are required" });
  }
  try {
    let servey = new Servey({
      user: email,
      title,
      questions: questions,
      status: "Running",
    });

    await servey.save();
    res.json(servey);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// get all survey.....
router.get("/all", async (req, res) => {
  try {
    const { user } = req.body;
    let surveys = await Servey.find({ user });
    res.json(surveys);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});
// get single survey.....
router.get("/:id", async (req, res) => {
  try {
    let surveys = await Servey.findOne({ _id: req.params.id });
    res.json(surveys);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// send response from customers...........
router.put("/send", async (req, res) => {
  const { _id, responses } = req.body;
  let response_object = {};
  response_object.response = [...responses];

  try {
    let survey = await Servey.findOne({ _id });
    survey.responses.push(response_object);

    await survey.save();
    res.json(survey);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// change survey status .............
router.put("/close", async (req, res) => {
  const { _id } = req.body;
  try {
    let survey = await Servey.findOne({ _id });
    survey.status = "closed";

    await survey.save();
    res.json(survey);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// update survey..........
router.put("/update", async (req, res) => {
  const { _id, questions } = req.body;

  try {
    let survey = await Servey.findOne({ _id });
    survey.questions = [...questions];

    await survey.save();
    res.json(survey);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
