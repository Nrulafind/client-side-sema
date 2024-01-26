// student_update/component.tsx
import { useState } from "react";
import { put } from "../../lib/action";

interface StudentUpdateProps {
  studentId: number;
  onSuccess: () => void;
}
const StudentUpdateComponent: React.FC<StudentUpdateProps> = ({onSuccess}) => {
    const [students, setStudents] = useState<any[]>([]);
    const [newStudent, setNewStudent] = useState({
      nisn: "",
      nama: "",
      alamat: "",
      kelas: "",
    });

const StudentUpdateComponent: React.FC<StudentUpdateProps> = ({
  studentId,
  onSuccess,
}) => {
  // Similar structure to StudentAddComponent, but with update logic
const handleUpdateStudent = async () =>{
    try {
        await put
    } catch (error) {
        
    }
}

  return (
    <div>
      <h2>Update Student</h2>
      {/* Your form inputs here */}
      <button onClick={/* Call your update logic */}>Update Student</button>
    </div>
  );
};

export default StudentUpdateComponent;

import { useState } from "react";
import { post } from "../../lib/action";

interface StudentAddProps {
  onSuccess: () => void;
}

const StudentAddComponent: React.FC<StudentAddProps> = ({ onSuccess }) => {
  const [newStudent, setNewStudent] = useState({
    nisn: "",
    nama: "",
    alamat: "",
    kelas: "",
  });

  const handleCreateStudent = async () => {
    try {
      await post("student", newStudent);
      console.log("Student created successfully");
      setNewStudent({
        nisn: "",
        nama: "",
        alamat: "",
        kelas: "",
      });
      onSuccess(); // Invoke the onSuccess callback
    } catch (error) {
      console.error("Error creating student", error);
    }
  };

  return (
    <div>
      <h2>Create Student</h2>
      {/* Your form inputs here */}
      <button onClick={handleCreateStudent}>Create Student</button>
    </div>
  );
};

export default StudentAddComponent;
