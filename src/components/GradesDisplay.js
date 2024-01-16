// GradesDisplayPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const GradesDisplayPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const students = location.state ? location.state.students : [];

    const handleBack = () => {
        navigate(-1); // This will take the user back to the previous page
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Student Grades and Comments
            </Typography>
            {students.map((student) => (
                <Box key={student.id} mb={2}>
                    <Typography variant="h6">{`${student.name} (${student.number})`}</Typography>
                    <Typography variant="subtitle1">Grade: {student.grade}</Typography>
                    <Typography variant="subtitle1">Comments: {student.comments}</Typography>
                </Box>
            ))}
            <Button variant="outlined" onClick={handleBack}>Back</Button>
        </Box>
    );
};

export default GradesDisplayPage;
