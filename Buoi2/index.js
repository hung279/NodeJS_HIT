const fs = require('fs');

const express = require('express');
const {nanoid} = require('nanoid');

const app = express();

app.use(express.json());

try {
    const data = fs.readFileSync('./db.json', 'utf8');

    const db = JSON.parse(data);

    //get course
    app.get("/api/course", (req, res) => {
        res.json(db);
    });

    //get a course
    app.get("/api/course/:id", (req, res) => {
        const course = db.find(curCourse => req.params.id === curCourse.id);
        if(!course) {
            res.json('id is invalid');
            return;
        }
        res.json(course);
    });

    //add course
    app.post("/api/course", (req, res) => {
        const {name, description} = req.body;

        const newCourse = {
            id: nanoid(),
            name,
            description
        };
        db.push(newCourse);
        saveData(db);
        res.json(newCourse);
    });

    //update course
    app.put("/api/course/:id", (req, res) => {
        const course = db.find(curCourse => req.params.id === curCourse.id);
        if(!course) {
            res.json('id is invalid');
            return;
        }
        const {name, description} = req.body;
        course.name = name;
        course.description = description;
        
        saveData(db);
        
        res.json('Update Successfully');
    });

    //delete course
    app.delete("/api/course/:id", (req, res) => {
        const index = db.findIndex(curCourse => req.params.id === curCourse.id);
        if(index == -1) {
            res.json('id is invalid');
            return;
        }
        db.splice(index, 1);
        saveData(db);
        res.json('Delete successfully');
    });

} catch (error) {
    console.log(error);
}

function saveData(data) {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data), 'utf8');
    } catch (error) {
        console.log(error);
    }
}

app.listen(3000, () => {
    console.log(`Server is running ...`);
});