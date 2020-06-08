const express = require('express');
const fs = require('fs').promises;
const gradeRouter = require('./routes/gradeRouter');

const app = express();

app.use(express.json());
app.use('/grade', gradeRouter);

app.listen(3000, async () => {
  try {
    await fs.readFile('./files/grades.json', 'utf8');

  } catch (err) {
    const grade = {
      nextId: 1,
      grades: []
    };

    fs.writeFile('./files/grades.json', JSON.stringify(grade), err => {
      console.log(err.message);
    });
  }
});