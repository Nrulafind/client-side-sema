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
