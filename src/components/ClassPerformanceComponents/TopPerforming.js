import React, { useEffect, useState } from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const TopPerforming = ({ selectedClass }) => {
    const [topPerformingStudents, setTopPerformingStudents] = useState([]);

    const fetchTopScoringStudents = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/performance/get_top_performing_students/${selectedClass}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            const data = await response.json();
            setTopPerformingStudents(data);
        } catch (error) {
            console.error("Failed to fetch average grades:", error);
            // Handle errors here
        }
    };

    useEffect(() => {
        if (selectedClass) {
            fetchTopScoringStudents();
        }
    }, [selectedClass]);

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Top Performing Students
            </Typography>
            <List>
                {topPerformingStudents.map((student, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={student.name} secondary={`Average Score: ${student.score}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default TopPerforming;
