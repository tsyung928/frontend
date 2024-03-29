import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import {
    TextField,
    Typography,
    Box,
    Button,
    DialogActions,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    Backdrop,
    CircularProgress,
    MenuItem,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import { ResponsiveContainer } from "recharts";
import ViewHomework from "./DisplayFunction/ViewHomework";
import EditIcon from "@mui/icons-material/Edit";

function GradesDisplay() {
    const [grades, setGrades] = useState([]);
    const location = useLocation();
    const { assignmentId } = location.state || {};
    const [classInfo, setClassInfo] = useState("");
    const [title, setTitle] = useState("");
    const [editGrade, setEditGrade] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ score: "", explanation: "" });
    const [viewHomeworkOpenIndex, setViewHomeworkOpenIndex] = useState(-1);
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [selectedNumber, setSelectedNumber] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [sortCriteria, setSortCriteria] = useState("number"); // This can be 'number', 'score', or 'name'

    function sortGrades(criteria) {
        let sortedGrades;
        switch (criteria) {
            case "score":
                sortedGrades = [...grades].sort((a, b) => b.score - a.score);
                break;
            case "name":
                sortedGrades = [...grades].sort((a, b) => a.studentName.localeCompare(b.studentName));
                break;
            case "number":
            default:
                sortedGrades = [...grades].sort(
                    (a, b) => parseInt(a.studentNumber, 10) - parseInt(b.studentNumber, 10)
                );
                break;
        }
        setGrades(sortedGrades);
    }
    useEffect(() => {
        const fetchAssignmentDetails = async () => {
            setIsLoading(true);
            try {
                await fetch(`http://127.0.0.1:5000/marking/grades_after_mark/${assignmentId}`)
                    .then((response) => response.json())
                    .then((data) => setGrades(data))
                    .catch((error) => console.error("Error fetching grades:", error));

                await fetch(`http://127.0.0.1:5000/assignment/get_homework_text_by_submissionId/${grades.submissionId}`)
                    .then((response) => response.json())
                    .catch((error) => console.error("Error fetching grades:", error));
                const response1 = await fetch(
                    `http://127.0.0.1:5000/assignment/get_class_by_assignmentid/${assignmentId}`
                );
                if (!response1.ok) {
                    throw new Error(`HTTP error! status: ${response1.status}`);
                }
                const data1 = await response1.json();
                const response2 = await fetch(
                    `http://127.0.0.1:5000/assignment/get_title_by_assignmentid/${assignmentId}`
                );
                if (!response2.ok) {
                    throw new Error(`HTTP error! status: ${response2.status}`);
                }
                const data2 = await response2.json();
                setClassInfo(data1.class);
                setTitle(data2.title);
            } catch (error) {
                console.error("Fetching assignment details failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAssignmentDetails();
    }, [assignmentId]);

    useEffect(() => {
        if (assignmentId) {
            // ... fetch and sort logic
            sortGrades(sortCriteria); // Now it's okay to call sortGrades here
        }
    }, [assignmentId, sortCriteria]);

    const [originalEditGrade, setOriginalEditGrade] = useState(null);

    const handleEditClick = (grade) => {
        setEditGrade(grade);
        setOriginalEditGrade(grade);
    };

    const isChanged =
        editGrade &&
        (editGrade.score !== originalEditGrade.score || editGrade.explanation !== originalEditGrade.explanation);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditGrade({ ...editGrade, [name]: value });

        let scoreError = "";
        let explanationError = "";

        if (name === "score") {
            if (value === "-") {
                scoreError = "Score can't be negative";
            } else if (parseFloat(value) < 0) {
                scoreError = "Score can't be negative";
            } else if (value.trim() === "") {
                scoreError = "Score can't be empty";
            }
        } else if (name === "explanation") {
            explanationError = value.trim() === "" ? "Explanation can't be empty" : "";
        }

        setErrors({ ...errors, score: scoreError, explanation: explanationError });
    };

    const handleClose = () => {
        setEditGrade(null);
    };

    const handleSubmit = async () => {
        if (validateFields()) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/marking/update_grade/${editGrade.submissionId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editGrade),
                });
                if (!response.ok) {
                    throw new Error("Could not update grade");
                }
                setGrades(grades.map((grade) => (grade.submissionId === editGrade.submissionId ? editGrade : grade)));
                handleClose();
            } catch (error) {
                console.error("Failed to update grade:", error);
            }
        }
    };

    const validateFields = () => {
        let tempErrors = { score: "", explanation: "" };
        if (editGrade) {
            tempErrors.score = editGrade.score < 0 ? "Score can't be negative" : "";
            tempErrors.score = editGrade.score === "" ? "Score can't be empty" : tempErrors.score;
            tempErrors.explanation = editGrade.explanation.trim() === "" ? "Explanation can't be empty" : "";
        }
        setErrors({ ...tempErrors });
        return Object.values(tempErrors).every((x) => x === ""); // Returns true if no errors
    };

    const exit = () => {
        navigate("/MarkHomework");
    };

    const handleOpenHomework = (index, submissionId) => {
        setSelectedSubmissionId(submissionId);
        setSelectedName(grades.find((grade) => grade.submissionId === submissionId).studentName);
        setSelectedNumber(grades.find((grade) => grade.submissionId === submissionId).studentNumber);
        setViewHomeworkOpenIndex(index);
    };

    const handleCloseHomework = () => {
        setViewHomeworkOpenIndex(-1);
    };
    if (isLoading) {
        return (
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <ResponsiveContainer>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "85%",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: 15,
                    my: 5,
                }}
            >
                <div className="titleContainer">Grades Display</div>
                <div className="title2Container">
                    <Typography variant="h6" component="h4" style={{ marginBottom: "8px" }}>
                        Class: {classInfo}
                    </Typography>
                    <Typography variant="h6" component="h4" style={{ marginBottom: "8px" }}>
                        Homework Title: {title}
                    </Typography>
                </div>
                <TextField
                    select
                    label="Sort by"
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2, mx: 2 }}
                >
                    <MenuItem value="number">Class Number</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="score">Score</MenuItem>
                </TextField>
                <Paper elevation={3} sx={{ maxWidth: 1000, margin: "auto" }}>
                    <List>
                        {grades.map((grade, index) => (
                            <React.Fragment key={grade.studentId}>
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{
                                        backgroundColor: "background.paper",
                                        "&:hover": {
                                            backgroundColor: "action.selected",
                                        },
                                        p: 2,
                                    }}
                                >
                                    <ListItemText
                                        primary={`Student Name: ${grade.studentName} (${grade.studentNumber})`}
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: "block" }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Score: {grade.score}
                                                </Typography>
                                                Score Explanation: {grade.explanation}
                                            </>
                                        }
                                    />
                                    <Stack direction="column" spacing={1} sx={{ p: 1 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleOpenHomework(index, grade.submissionId)}
                                        >
                                            Homework
                                        </Button>
                                        <ViewHomework
                                            open={viewHomeworkOpenIndex === index}
                                            onClose={handleCloseHomework}
                                            submissionId={selectedSubmissionId}
                                            name={selectedName}
                                            number={selectedNumber}
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleEditClick(grade)}
                                            endIcon={<EditIcon />}
                                        >
                                            Edit
                                        </Button>
                                    </Stack>
                                </ListItem>
                                {index < grades.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                    <Dialog open={Boolean(editGrade)} onClose={handleClose} fullWidth maxWidth="md">
                        <DialogTitle>Edit Grade</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                label="Score"
                                type="number"
                                fullWidth
                                variant="outlined"
                                name="score"
                                value={editGrade?.score || ""}
                                onChange={handleChange}
                                error={Boolean(errors.score)}
                                helperText={errors.score}
                            />
                            <TextField
                                margin="dense"
                                label="Explanation"
                                type="text"
                                fullWidth
                                variant="outlined"
                                multiline
                                name="explanation"
                                value={editGrade?.explanation || ""}
                                onChange={handleChange}
                                error={Boolean(errors.explanation)}
                                helperText={errors.explanation}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmit} disabled={!isChanged}>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
                <Box sx={{ display: "flex" }}>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={exit}>
                        Exit
                    </Button>
                </Box>
            </Box>
        </ResponsiveContainer>
    );
}

export default GradesDisplay;
