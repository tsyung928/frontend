// StudentForm.js
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const StudentForm = ({ onSubmit }) => {
    const [studentData, setStudentData] = useState({
        studentName: "",
        class: "",
        studentNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(studentData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mx: 15, my: 5 }}>
            <div className="title2LeftContainer">Add Student</div>
            <TextField
                fullWidth
                id="studentName"
                label="Student's Name"
                name="studentName"
                autoComplete="studentName"
                margin="normal"
                value={studentData.studentName}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                id="class"
                label="Class"
                name="class"
                margin="normal"
                value={studentData.class}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                id="studentNumber"
                label="Student Number"
                name="studentNumber"
                margin="normal"
                value={studentData.studentNumber}
                onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save Student
            </Button>
        </Box>
    );
};

export default StudentForm;
