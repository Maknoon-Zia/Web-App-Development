const express = require('express');
const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

// Sample student data
let students = [
  { id: 1, name: "Ali", email: "ali@example.com", age: 20 },
  { id: 2, name: "Sara", email: "sara@example.com", age: 22 },
  { id: 3, name: "Omar", email: "omar@example.com", age: 19 }
];

// Helper function to validate student
function validateStudent(student) {
  const { name, email, age } = student;
  if (!name || !email || !age) return "All fields are required.";
  if (!email.includes("@")) return "Email must include '@'.";
  if (age <= 0) return "Age must be greater than 0.";
  return null;
}

// Get all students
app.get('/students', (req, res) => {
  const { name } = req.query;
  if (name) {
    const filtered = students.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
    return res.json(filtered);
  }
  res.json(students);
});

// Get single student by ID
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// Add a new student
app.post('/students', (req, res) => {
  const error = validateStudent(req.body);
  if (error) return res.status(400).json({ message: error });

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    ...req.body
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student details
app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });

  const error = validateStudent(req.body);
  if (error) return res.status(400).json({ message: error });

  student.name = req.body.name;
  student.email = req.body.email;
  student.age = req.body.age;

  res.json(student);
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Student not found" });

  const deleted = students.splice(index, 1);
  res.json(deleted[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
