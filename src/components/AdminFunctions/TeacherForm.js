// TeacherForm.js
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const TeacherForm = ({ onSubmit }) => {
    const [teacherData, setTeacherData] = useState({
        username: "",
        classes: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({ ...teacherData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(teacherData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mx: 15, my: 5 }}>
            <div className="title2LeftContainer">Add Teacher</div>
            <TextField
                fullWidth
                id="username"
                label="Teacher's Name"
                name="username"
                autoComplete="username"
                autoFocus
                margin="normal"
                value={teacherData.username}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                id="classes"
                label="Classes (comma-separated)"
                name="classes"
                margin="normal"
                value={teacherData.classes}
                onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save Teacher
            </Button>
        </Box>
    );
};

export default TeacherForm;
