// AdminInterface.js
import React from "react";
import TeacherForm from "./AdminFunctions/TeacherForm";
import StudentForm from "./AdminFunctions/StudentForm";
import TeacherList from "./AdminFunctions/TeacherList";
import StudentList from "./AdminFunctions/StudentList";

const AdminInterface = () => {
    return (
        <div>
            <div className="titleContainer">Admin Interface</div>
            <TeacherForm />
            <StudentForm />
            <TeacherList />
            <StudentList />
        </div>
    );
};

export default AdminInterface;
