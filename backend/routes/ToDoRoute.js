const { Router } = require("express");

const { getToDo, saveToDo, deleteToDo, updateToDo } = require("../controllers/ToDoController");

const router = Router();

router.get("/tasks", getToDo);

router.post("/tasks", saveToDo);

router.put("/tasks/:id", updateToDo);

router.delete("/tasks/:id", deleteToDo);

module.exports = router;