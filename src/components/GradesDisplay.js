// GradesDisplayPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

const GradesDisplayPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { students, homeworkTitle, classInfo } = location.state || {};

    // State for managing the dialog
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedStudent, setSelectedStudent] = React.useState(null);

    // Function to calculate class performance statistics
    const getClassPerformance = () => {
        // Logic to calculate highest, lowest, and average marks
        // Dummy implementation
        return {
            highest: 'A',
            lowest: 'C',
            average: 'B',
            overallComments: 'Overall, the class has shown great improvement in understanding the core concepts.'
        };
    };

    const classPerformance = getClassPerformance();

    const viewIndividualStudent = (student) => {
        setSelectedStudent(student);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const saveAndExitMarking = () => {
        // TODO: Save the grades and comments to the database
        console.log("Grades and Comments Saved");
        navigate(-1); // or navigate to a specific route
    };

    return (
        <Box sx={{ ml: 2 }}>
            <Typography variant="h4" gutterBottom>Class: {classInfo} Homework: {homeworkTitle}</Typography>
            <Typography variant="h5" gutterBottom>Class Performance</Typography>
            <Typography variant="subtitle1">Highest Mark: {classPerformance.highest}</Typography>
            <Typography variant="subtitle1">Lowest Mark: {classPerformance.lowest}</Typography>
            <Typography variant="subtitle1">Average Mark: {classPerformance.average}</Typography>
            <Typography variant="subtitle1">Overall Class Comments: {classPerformance.overallComments}</Typography>

            <Typography variant="h5" gutterBottom mt={4}>
                Individual Student Grades and Comments
            </Typography>
            {students.map((student) => (
                <Box key={student.id} mb={2}>
                    <Typography variant="h6">{`${student.name} (${student.number})`}</Typography>
                    <Typography variant="subtitle1">Grade: {student.grade}</Typography>
                    <Typography variant="subtitle1">Comments: {student.comments}</Typography>
                    <Button variant="outlined" onClick={() => viewIndividualStudent(student)}>View Assignment</Button>
                </Box>
            ))}

            <Box mt={4}>
                <Button variant="contained"  onClick={saveAndExitMarking} >Save And Exit Marking</Button>
            </Box>

            {/* Dialog for viewing individual student's assignment */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{selectedStudent?.name}'s Assignment</DialogTitle>
                <DialogContent>
                    {/* Display the digitized handwritten assignment here */}
                    {/* This could be an image or a document viewer */}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default GradesDisplayPage;
