"use client";
// "use client";
import { useState, useEffect } from "react";
import { get, post, put, patch, remove } from "../lib/action";

const STUDENT_ENDPOINT = "student";

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [newStudent, setNewStudent] = useState({
    nisn: "",
    nama: "",
    alamat: "",
    kelas: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await get(STUDENT_ENDPOINT);
        setStudents(data.data); // Assuming your API response has a 'data' property
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };
    fetchStudents();
  }, []);

  const handleCreateStudent = async () => {
    try {
      await post(STUDENT_ENDPOINT, newStudent);
      console.log("Student created successfully");
      setNewStudent({
        nisn: "",
        nama: "",
        alamat: "",
        kelas: "",
      });
    } catch (error) {
      console.error("Error creating student", error);
    }
  };

  const handleUpdateStudent = async (studentId: number) => {
    try {
      const updatedStudent = {
        nisn: newStudent.nisn,
        nama: newStudent.nama,
        alamat: newStudent.alamat,
        kelas: newStudent.kelas,
      };
      await put(`${STUDENT_ENDPOINT}/${studentId}`, updatedStudent); // Fixing the endpoint URL
      console.log("Student updated successfully");
    } catch (error) {
      console.error("Error updating student", error);
    }
  };

  const handlePartialUpdateStudent = async (studentId: number) => {
    try {
      const partialUpdate = {
        alamat: newStudent.alamat,
      };
      await patch(`${STUDENT_ENDPOINT}/${studentId}`, partialUpdate); // Fixing the endpoint URL
      console.log("Student partially updated successfully");
    } catch (error) {
      console.error("Error partially updating student", error);
    }
  };

  const handleDeleteStudent = async (studentId: number) => {
    try {
      await remove(`${STUDENT_ENDPOINT}/${studentId}`); // Fixing the endpoint URL
      console.log("Student deleted successfully");
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map((student: any) => (
          <li key={student.id}>
            {student.nama} -{" "}
            <button onClick={() => handleUpdateStudent(student.id)}>
              Update
            </button>{" "}
            <button onClick={() => handlePartialUpdateStudent(student.id)}>
              Partial Update
            </button>{" "}
            <button onClick={() => handleDeleteStudent(student.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2>Create Student</h2>
      <label>
        NISN:
        <input
          type="text"
          value={newStudent.nisn}
          onChange={(e) =>
            setNewStudent({ ...newStudent, nisn: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Nama:
        <input
          type="text"
          value={newStudent.nama}
          onChange={(e) =>
            setNewStudent({ ...newStudent, nama: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Alamat:
        <input
          type="text"
          value={newStudent.alamat}
          onChange={(e) =>
            setNewStudent({ ...newStudent, alamat: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Kelas:
        <input
          type="text"
          value={newStudent.kelas}
          onChange={(e) =>
            setNewStudent({ ...newStudent, kelas: e.target.value })
          }
        />
      </label>
      <br />
      <button onClick={handleCreateStudent}>Create Student</button>
    </div>
  );
};

export default StudentPage;
