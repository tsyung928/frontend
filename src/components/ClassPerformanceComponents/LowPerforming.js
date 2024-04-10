import React, { useEffect, useState } from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const LowPerforming = ({ selectedClass }) => {
    const [lowPerformingStudents, setLowPerformingStudents] = useState([]);

    const fetchLowScoringStudents = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/performance/get_low_performing_students/${selectedClass}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            const data = await response.json();
            setLowPerformingStudents(data);
        } catch (error) {
            console.error("Failed to fetch average grades:", error);
            // Handle errors here
        }
    };

    useEffect(() => {
        if (selectedClass) {
            fetchLowScoringStudents();
        }
    }, [selectedClass]);

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Students need improvement
            </Typography>
            <List>
                {lowPerformingStudents.map((student, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={student.name} secondary={`Average Score: ${student.score}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default LowPerforming;
