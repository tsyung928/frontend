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
        // POST request to backend using fetch API
        fetch("http://127.0.0.1:5000/add-student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studentData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Handle the response data from the server
                console.log(data);
                if (data.error) {
                    alert(`Error: ${data.error}`);
                } else {
                    alert(`Success: ${data.message}`);
                    // Reset form after successful submission
                    setStudentData({ studentName: "", class: "", studentNumber: "" });
                }
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
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
