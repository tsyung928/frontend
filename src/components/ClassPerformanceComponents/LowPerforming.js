import React from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const LowPerforming = ({ lowPerformingStudents }) => {
    return (
        <Paper elevation={3} sx={{ p: 2, my: 2 }}>
            <Typography variant="h6" gutterBottom>
                Students Needing Improvement
            </Typography>
            <List>
                {lowPerformingStudents.map((student, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={student.name} secondary={`Score: ${student.score}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default LowPerforming;
