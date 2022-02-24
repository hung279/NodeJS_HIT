const fs = require("fs");

const express = require("express");
const { nanoid } = require("nanoid");

const app = express();

app.use(express.json());

try {
  const data = fs.readFileSync("./db.json", "utf8");

  const db = JSON.parse(data);

  //GET COURSES
  app.get("/v1/courses", (req, res) => {
    res.status(200).json(db);
  });

  //GET A COURSE
  app.get("/v1/courses/:id", (req, res) => {
    const course = db.find((curCourse) => req.params.id === curCourse.id);
    if (!course) res.status(404).json("ID is invalid");
    res.json(course);
  });

  //ADD COURSE
  app.post("/v1/courses", (req, res) => {
    const { name, description } = req.body;

    const newCourse = {
      id: nanoid(),
      name,
      description,
    };

    db.push(newCourse);
    saveData(db);
    res.status(200).json(newCourse);
  });

  //UPDATE COURSE
  app.put("/v1/courses/:id", (req, res) => {
    const course = db.find((curCourse) => req.params.id === curCourse.id);
    if (!course) res.status(404).json("ID is invalid");

    const { name, description } = req.body;
    course.name = name;
    course.description = description;

    saveData(db);
    res.status(200).json("Update Successfully");
  });

  //DELETE COURSE
  app.delete("/v1/courses/:id", (req, res) => {
    const index = db.findIndex((curCourse) => req.params.id === curCourse.id);
    if (index == -1) res.status(404).json("ID is invalid");

    db.splice(index, 1);
    saveData(db);
    res.status(200).json("Delete successfully");
  });
} catch (error) {
  console.log(error);
}

function saveData(data) {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data), "utf8");
  } catch (error) {
    console.log(error);
  }
}

app.listen(3000, () => {
  console.log(`Server is running ...`);
});
