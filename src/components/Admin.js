// AdminInterface.js
import React, { useState, useEffect, useCallback } from "react";
import TeacherForm from "./AdminFunctions/TeacherForm";
import StudentForm from "./AdminFunctions/StudentForm";
import TeacherList from "./AdminFunctions/TeacherList";
import StudentList from "./AdminFunctions/StudentList";

const AdminInterface = () => {
    // State to trigger a refresh in the TeacherList component
    const [listVersion, setListVersion] = useState(0);

    // Function to call after a teacher is successfully added
    const onTeacherAdded = () => {
        // Increment the listVersion to trigger a refresh in the TeacherList component
        setListVersion(listVersion + 1);
    };

    return (
        <div>
            <div className="titleContainer">Admin Interface</div>
            <TeacherForm onTeacherAdded={onTeacherAdded} />
            <StudentForm />
            {/* Passing a key that changes to trigger a rerender */}
            <TeacherList key={listVersion} />
            <StudentList />
        </div>
    );
};

export default AdminInterface;
