import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Typography, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const dummyAssignmentData = [
    { name: "Assignment 1", averageGrade: 70 },
    { name: "Assignment 2", averageGrade: 85 },
    { name: "Assignment 3", averageGrade: 75 },
    // ...add more assignments
];

const AverageGrades = ({ selectedClass }) => {
    const [selectedType, setSelectedType] = useState("");

    // Dummy types, replace with API call to fetch real types
    const [assignmentTypes, setAssignmentTypes] = useState([
        "Essay",
        "Multiple Choice",
        "Project",
        "Oral Presentation",
    ]);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        // TODO: Fetch and update chart based on the selected type
    };

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Average Grades of Past Assignments
            </Typography>
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                <InputLabel id="assignment-type-select-label">Assignment Type</InputLabel>
                <Select
                    labelId="assignment-type-select-label"
                    id="assignment-type-select"
                    value={selectedType}
                    label="Assignment Type"
                    onChange={handleTypeChange}
                >
                    {assignmentTypes.map((type, index) => (
                        <MenuItem key={index} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* BarChart to visualize average grades */}
            <BarChart width={600} height={300} data={dummyAssignmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageGrade" fill="#82ca9d" />
            </BarChart>
        </Paper>
    );
};

export default AverageGrades;
