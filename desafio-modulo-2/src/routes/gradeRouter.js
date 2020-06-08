const { Router } = require('express');
const fs = require('fs').promises;

const gradeRoutes = Router();

gradeRoutes.post('/', async (req, res) => {
  const { student, subject, type, value } = req.body;
  
  try {
    const data = await fs.readFile('./files/grades.json', 'utf8').catch(err => console.log('Erro na leitura: ', err.message));
    const grade = JSON.parse(data);

    const newGrade = {
      id: grade.nextId++,
      student,
      subject,
      type,
      value,
      date: new Date(),
    }

    grade.grades.push(newGrade);

    await fs.writeFile('./files/grades.json', JSON.stringify(grade), err => console.log('Erro na escrita: ', err.message));

    return res.json(newGrade);
  } catch (err) {
    console.log(err.message);
  }

});

gradeRoutes.put('/:id?', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'You need provide the grade ID to update' });
  }

  try {
    const { student, subject, type, value } = req.body;

    const data = await fs.readFile('./files/grades.json', 'utf8').catch(err => console.log('Erro na leitura: ', err.message));
    const grade = JSON.parse(data);

    const register = grade.grades.find(register => register.id === Number(req.params.id));

    if (register) {
      student && (register.student = student);
      subject && (register.subject = subject);
      type && (register.type = type);
      value && (register.value = value);

      await fs.writeFile('./files/grades.json', JSON.stringify(grade), err => console.log('Erro na escrita: ', err.message));

      return res.json(register);
    } else {
      return res.status(400).json({ Error: 'Does not have a grade with this id' });
    }

  } catch (err) {
    return res.json({ Error: err.message });
  }
  
});

gradeRoutes.delete('/:id?', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'You need provide the grade ID to remove' });
  }

  try {

    const data = await fs.readFile('./files/grades.json', 'utf8').catch(err => console.log('Erro na leitura: ', err.message));
    const grade = JSON.parse(data);

    const register = grade.grades.findIndex(register => register.id === Number(req.params.id));

    if (register >= 0) {
      grade.grades.splice(register, 1);

      await fs.writeFile('./files/grades.json', JSON.stringify(grade), err => console.log('Erro na escrita: ', err.message));

      return res.status(200).json();

    } else {
      return res.status(400).json({ Error: 'Does not have a grade with this id' });
    }

  } catch (err) {
    return res.json({ Error: err.message });
  }
  
});

gradeRoutes.get('/topgrades', async (req, res) => {
  try {
    const { subject, type } = req.body;

    const data = await fs.readFile('./files/grades.json', 'utf8').catch(err => console.log('Erro na leitura: ', err.message));
    const grade = JSON.parse(data);

    const register = grade.grades.filter(register => register.type === type);
    
    if (register[0]) {
      const gradeSubject = register.filter(register => register.subject === subject);
      
      if (gradeSubject[0]) {
       
  
        return res.status(200).json(gradeSubject.sort((a, b) => b.value - a.value ).slice(0,3));
      } else {
        return res.json({ message: 'Does not have grades for this subject' });
      }

    } else {
      return res.status(400).json({ Error: 'Does not have a grade for this type' });
    }

  } catch (err) {
    return res.json({ Error: err.message });
  }

});

gradeRoutes.get('/medianotas', async (req, res) => {
  try {
    const { subject, type } = req.body;

    const data = await fs.readFile('./files/grades.json', 'utf8').catch(err => console.log('Erro na leitura: ', err.message));
    const grade = JSON.parse(data);

    const register = grade.grades.filter(register => register.type === type);
    
    if (register[0]) {
      const gradeSubject = register.filter(register => register.subject === subject);
      
      if (gradeSubject[0]) {
        const notas = gradeSubject.reduce((accumulator, current) => {
          return accumulator + current.value;
        }, 0);
  
        return res.status(200).json(notas/gradeSubject.length);
      } else {
        return res.json({ message: 'Does not have grades for this subject' });
      }

    } else {
      return res.status(400).json({ Error: 'Does not have a grade for this type' });
    }

  } catch (err) {
    return res.json({ Error: err.message });
  }

});

gradeRoutes.get('/notas', async (req, res) => {
  try {
    const { student, subject } = req.body;

    const data = await fs.readFile('./files/grades.json', 'utf8').catch(err => console.log('Erro na leitura: ', err.message));
    const grade = JSON.parse(data);

    const register = grade.grades.filter(register => register.student === student);

    if (register[0]) {
      const gradeSubject = register.filter(register => register.subject === subject);
      
      if (gradeSubject[0]) {
        const notas = gradeSubject.reduce((accumulator, current) => {
          return accumulator + current.value;
        }, 0);
  
        return res.status(200).json(notas);
      } else {
        return res.json({ message: 'Does not have grades for this subject' });
      }

    } else {
      return res.status(400).json({ Error: 'Does not have a grade for this name' });
    }

  } catch (err) {
    return res.json({ Error: err.message });
  }

});

gradeRoutes.get('/:id?', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'You need provide the grade ID to list' });
  }

  try {

    const data = await fs.readFile('./files/grades.json', 'utf8').catch(err => console.log('Erro na leitura: ', err.message));
    const grade = JSON.parse(data);

    const register = grade.grades.find(register => register.id === Number(req.params.id));

    if (register) {
      return res.status(200).json(register);

    } else {
      return res.status(400).json({ Error: 'Does not have a grade with this id' });
    }

  } catch (err) {
    return res.json({ Error: err.message });
  }

});

module.exports = gradeRoutes;