const fs = require("fs");

const express = require("express");
const { nanoid } = require("nanoid");

const app = express();

app.use(express.json());

const data = fs.readFileSync("./db.json", "utf8");

let db = JSON.parse(data);

//GET COURSES
app.get("/v1/courses", (req, res) => {
  res.status(200).json(db);
});

//GET A COURSE
app.get("/v1/courses/:id", (req, res) => {
  const course = db.find((curCourse) => req.params.id === curCourse.id);
  if (!course) 
    return res.status(404).json({error: "ID is invalid"});
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
  const id = req.params.id;
  const course = db.find((curCourse) => id === curCourse.id);
  if (!course) return res.status(404).json({error: "ID is invalid"});

  const { name, description } = req.body;

  const updateCourse = {
      name: name || course.name,
      description: description || course.description
  }

  db = db.map(curCourse => {
      if(id === curCourse.id) {
          curCourse = {id, ...updateCourse};
      }
      return curCourse;
  });

  saveData(db);
  res.status(200).json({message: "Update Successfully"});
});

//DELETE COURSE
app.delete("/v1/courses/:id", (req, res) => {
  const index = db.findIndex((curCourse) => req.params.id === curCourse.id);
  if (index == -1) return res.status(404).json({error: "ID is invalid"});

  db.splice(index, 1);
  saveData(db);
  res.status(200).json({message: "Delete successfully"});
});

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
