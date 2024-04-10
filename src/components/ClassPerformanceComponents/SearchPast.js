import React, { useState, useEffect } from "react";
import {
    Select,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
} from "@mui/material";
import ViewHomework from "../DisplayFunction/ViewHomework";

const SearchPast = ({ selectedClass }) => {
    const [homeworkTitles, setHomeworkTitles] = useState([]);
    const [selectedHomework, setSelectedHomework] = useState("");
    const [students, setStudents] = useState([]);
    const [viewHomeworkOpenIndex, setViewHomeworkOpenIndex] = useState(null);
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [selectedNumber, setSelectedNumber] = useState("");
    const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
    const [selectedHomeworkDescription, setSelectedHomeworkDescription] = useState("");

    const [assignmentId, setAssignmentId] = useState(null);

    useEffect(() => {
        const fetchHomeworkTitles = async () => {
            const data = await fetch(`http://127.0.0.1:5000/assignment/${selectedClass}`).then((d) => {
                return d.json();
            });
            setHomeworkTitles(data);
        };

        if (selectedClass) {
            fetchHomeworkTitles();
        }
    }, [selectedClass]);

    useEffect(() => {
        const fetchStudentsForHomework = async () => {
            const response = await fetch(`http://127.0.0.1:5000/students-for-homework/${selectedHomework}`);
            const studentList = await response.json();
            setStudents(studentList);
        };

        if (selectedHomework) {
            fetchStudentsForHomework();
        }
    }, [selectedHomework]);

    const handleOpenHomework = (submissionId, studentName, studentNumber, index) => {
        setSelectedSubmissionId(submissionId);
        setSelectedName(studentName);
        setSelectedNumber(studentNumber);
        setViewHomeworkOpenIndex(index);
    };

    const handleCloseHomework = () => {
        setViewHomeworkOpenIndex(null);
    };
    const handleSelectedHomeworkChange = async (event) => {
        setSelectedHomework(event.target.value);
    };

    return (
        <>
            <TextField
                select
                label="Homework Title"
                value={selectedHomework}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleSelectedHomeworkChange}
            >
                {homeworkTitles.map((title) => (
                    <MenuItem key={title} value={title}>
                        {title}
                    </MenuItem>
                ))}
            </TextField>
            <Button variant="outlined" onClick={() => setOpenDescriptionDialog(true)} sx={{ mr: 2 }}>
                View Description
            </Button>

            <List>
                {students.map((student, index) => (
                    <ListItem
                        key={student._id}
                        button
                        onClick={() => handleOpenHomework(student.submissionId, student.name, student.number, index)}
                    >
                        <ListItemText primary={student.name} />
                        <Button
                            variant="outlined"
                            onClick={() =>
                                handleOpenHomework(student.submissionId, student.name, student.number, index)
                            }
                            sx={{ mr: 2 }}
                        >
                            View Homework
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                handleOpenHomework(student.submissionId, student.name, student.number, index)
                            }
                        >
                            View Grades
                        </Button>
                    </ListItem>
                ))}
            </List>

            <ViewHomework
                open={viewHomeworkOpenIndex !== null}
                onClose={handleCloseHomework}
                submissionId={selectedSubmissionId}
                name={selectedName}
                number={selectedNumber}
            />

            <Dialog open={openDescriptionDialog} onClose={() => setOpenDescriptionDialog(false)}>
                <DialogTitle>Homework Description</DialogTitle>
                <DialogContent>
                    <DialogContentText>{selectedHomeworkDescription}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDescriptionDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SearchPast;
