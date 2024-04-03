import React from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const TopPerforming = ({ topPerformingStudents }) => {
    return (
        <Paper elevation={3} sx={{ p: 2, my: 2 }}>
            <Typography variant="h6" gutterBottom>
                Top Performing Students
            </Typography>
            <List>
                {topPerformingStudents.map((student, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={student.name} secondary={`Score: ${student.score}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default TopPerforming;
