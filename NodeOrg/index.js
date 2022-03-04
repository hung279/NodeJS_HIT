const http = require("http");
const fs = require("fs");

let db = require("./db.json");

const port = 3000;

function saveData(data) {
  fs.writeFile("./db.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

//GET
function getCourses(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(db));
}

//GET
function getCourse(req, res, id) {
  const course = db.find((curCourse) => id === curCourse.id);

  if (!course) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "ID is invalid" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(course));
}

//POST
function creatCourse(req, res) {
  const body = [];

  req
    .on("data", (chunk) => {
      //console.log(chunk);
      //console.log(chunk.toString());
      body.push(chunk.toString());
    })
    .on("end", () => {
      const { name, description } = JSON.parse(body);

      const newCourse = {
        id: (db.length + 1).toString(),
        name,
        description,
      };

      db.push(newCourse);
      saveData(db);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newCourse));
    });
}

//PUT
function updateCourse(req, res, id) {
  const course = db.find((curCourse) => id === curCourse.id);

  if (!course) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "ID is invalid" }));
  }

  const body = [];

  req
    .on("data", (chunk) => {
      //console.log(chunk.toString());
      body.push(chunk.toString());
    })
    .on("end", () => {
      const { name, description } = JSON.parse(body);

      const updateCourse = {
        name: name || course.name,
        description: description || course.description,
      };

      db = db.map((curCourse) => {
        if (id === curCourse.id) {
          curCourse = { id, ...updateCourse };
        }
        return curCourse;
      });

      saveData(db);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Update successfully" }));
    });
}

//DELETE
function deleteCourse(req, res, id) {
  const index = db.findIndex((curCourse) => id === curCourse.id);

  if (index == -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "ID is invalid" }));
  }

  db.splice(index, 1);
  saveData(db);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Delete successfully" }));
}

const requestListener = (req, res) => {
  const url = req.url;
  const method = req.method;
  //GET COURSES
  if (url === "/v1/courses" && method === "GET") {
    getCourses(req, res);
  }
  //GET A COURSE
  else if (url.match(/\/v1\/courses\/\w+/) && method === "GET") {
    const id = url.split("/").pop();
    getCourse(req, res, id);
  }
  //CREAT COURSE
  else if (url === "/v1/courses" && method === "POST") {
    creatCourse(req, res);
  }
  //UPDATE COURSE
  else if (url.match(/\/v1\/courses\/\w+/) && method === "PUT") {
    const id = url.split("/").pop();
    updateCourse(req, res, id);
  }
  //DELETE COURSE
  else if (url.match(/\/v1\/courses\/\w+/) && method === "DELETE") {
    const id = url.split("/").pop();
    deleteCourse(req, res, id);
  }
};

const server = http.createServer(requestListener);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
