import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/students").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const addStudent = () => {
    axios
      .post("http://localhost:5000/students", {
        name,
        course,
        age: Number(age),
      })
      .then((response) => {
        setStudents([...students, response.data]);
        setName("");
        setCourse("");
        setAge("");
      });
  };

  const updateStudent = () => {
    axios
      .put(`http://localhost:5000/students/${editingId}`, {
        name,
        course,
        age: Number(age),
      })
      .then((response) => {
        setStudents(
          students.map((student) =>
            student._id === editingId ? response.data : student
          )
        );

        setEditingId(null);
        setName("");
        setCourse("");
        setAge("");
      });
  };

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`).then(() => {
      setStudents(students.filter((student) => student._id !== id));
    });
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  return (
    <>
      <h1>Student Management System</h1>

      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <br />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />

      {editingId ? (
        <button onClick={updateStudent}>Update Student</button>
      ) : (
        <button onClick={addStudent}>Add Student</button>
      )}

      <h2>Students</h2>

      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

          <button onClick={() => editStudent(student)}>
            Edit
          </button>

          <button onClick={() => deleteStudent(student._id)}>
            Delete
          </button>

          <br />
          <br />
        </div>
      ))}
    </>
  );
}

export default App;