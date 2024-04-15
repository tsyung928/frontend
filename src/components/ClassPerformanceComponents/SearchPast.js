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
import ViewGrades from "../DisplayFunction/ViewGrades";
import DescriptionRubricsDialog from "../DisplayFunction/DescriptionRubricsDialog";

const SearchPast = ({ selectedClass }) => {
    const [homeworkTitles, setHomeworkTitles] = useState([]);
    const [selectedHomework, setSelectedHomework] = useState("");
    const [students, setStudents] = useState([]);
    const [viewHomeworkOpenIndex, setViewHomeworkOpenIndex] = useState(false);
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [selectedNumber, setSelectedNumber] = useState("");
    const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
    const [selectedHomeworkDescription, setSelectedHomeworkDescription] = useState("");
    const [selectedHomeworkRubrics, setSelectedHomeworkRubrics] = useState("");
    const [viewGradesOpenIndex, setViewGradesOpenIndex] = useState(false);
    const [openViewHomework, setOpenViewHomework] = useState(false);
    const [openGradeDisplay, setOpenGradeDisplay] = useState(false);
    const [selectedHomeworkType, setSelectedHomeworkType] = useState("");

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
            console.log(studentList);
        };

        if (selectedHomework) {
            fetchStudentsForHomework();
        }
    }, [selectedHomework]);

    const handleOpenHomework = (submissionId, studentName, studentNumber) => {
        setSelectedSubmissionId(submissionId);
        setSelectedName(studentName);
        setSelectedNumber(studentNumber);
        setOpenViewHomework(true);
    };

    const handleOpenGrades = (submissionId, studentName, studentNumber) => {
        setSelectedSubmissionId(submissionId);
        setSelectedName(studentName);
        setSelectedNumber(studentNumber);
        setOpenGradeDisplay(true);
    };

    const handleSelectedHomeworkChange = async (event) => {
        const homeworkTitle = event.target.value;
        setSelectedHomework(homeworkTitle);

        if (homeworkTitle) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:5000/assignment/fetch_description_by_title/${homeworkTitle}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch homework description");
                }
                const data = await response.json();
                setSelectedHomeworkDescription(data.description);
            } catch (error) {
                console.error("Error fetching homework description:", error);
                setSelectedHomeworkDescription("Error fetching description.");
            }

            try {
                const response = await fetch(
                    `http://127.0.0.1:5000/assignment/fetch_rubrics_by_title/${homeworkTitle}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch homework rubrics");
                }
                const data = await response.json();
                setSelectedHomeworkRubrics(data.rubrics);
            } catch (error) {
                console.error("Error fetching homework rubrics:", error);
                setSelectedHomeworkRubrics("Error fetching rubrics.");
            }

            try {
                const response = await fetch(`http://127.0.0.1:5000/assignment/fetch_type_by_title/${homeworkTitle}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch homework type");
                }
                const data = await response.json();
                setSelectedHomeworkType(data.type);
            } catch (error) {
                console.error("Error fetching homework type:", error);
                setSelectedHomeworkType("Error fetching type.");
            }
        }
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
                    <ListItem key={student._id}>
                        <ListItemText primary={`${student.name} (${student.number})`} />
                        <Button
                            variant="outlined"
                            onClick={() => handleOpenHomework(student.submissionId, student.name, student.number)}
                            sx={{ mr: 2 }}
                        >
                            View Homework
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleOpenGrades(student.submissionId, student.name, student.number)}
                        >
                            View Grades
                        </Button>
                    </ListItem>
                ))}
            </List>

            <ViewHomework
                open={openViewHomework}
                onClose={() => setOpenViewHomework(false)}
                submissionId={selectedSubmissionId}
                name={selectedName}
                number={selectedNumber}
            />

            <DescriptionRubricsDialog
                open={openDescriptionDialog}
                onClose={() => setOpenDescriptionDialog(false)}
                description={selectedHomeworkDescription}
                rubrics={selectedHomeworkRubrics}
                title={selectedHomework}
                type={selectedHomeworkType}
            />

            <ViewGrades
                open={openGradeDisplay}
                onClose={() => setOpenGradeDisplay(false)}
                submissionId={selectedSubmissionId}
                name={selectedName}
                number={selectedNumber}
            />
        </>
    );
};

export default SearchPast;
