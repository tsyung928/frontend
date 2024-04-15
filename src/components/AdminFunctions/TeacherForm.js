// TeacherForm.js
import React, { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

const TeacherForm = ({ onSubmit }) => {
    const [teacherData, setTeacherData] = useState({
        username: "",
        classes: "",
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [initialPassword, setInitialPassword] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({ ...teacherData, [name]: value });
    };

    const handleSubmit = async (e) => {
        console.log(teacherData);
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:5000/add-teacher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacherData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            alert(`Teacher added successfully!\nInitial Password: ${data.initial_password}`);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mx: 15, my: 5 }}>
                <div className="title2LeftContainer">Add Teacher</div>
                <TextField
                    fullWidth
                    id="username"
                    label="Teacher's Name"
                    name="username"
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
        </>
    );
};

export default TeacherForm;
