const express = require("express");
const { Task } = require("./db/models");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const todosFromDB = await Task.findAll();
    const todos = JSON.parse(JSON.stringify(todosFromDB));
    res.json(todos);
  } catch (error) {
    console.log("Error get todos from DB: ", error);
  }
});
module.exports = router;
