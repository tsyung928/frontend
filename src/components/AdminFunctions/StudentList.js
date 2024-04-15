// StudentList.js
import React, { useEffect, useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button,
    CircularProgress,
    Box,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StudentList = ({ onEdit, onDelete }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState(""); // New state to track sort order
    const [open, setOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState({ _id: "", name: "", class: "", number: "" });

    const fetchStudents = () => {
        setLoading(true);
        fetch("http://127.0.0.1:5000/students")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch students");
                }
            })
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error);
                setLoading(false);
            });
    };
    useEffect(() => {
        setLoading(true);
        fetch("http://127.0.0.1:5000/students")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch students");
                }
            })
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <CircularProgress />;
    }
    // Function to sort students by name
    const sortByName = () => {
        const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));
        setStudents(sortedStudents);
        setSortOrder("name");
    };

    // Function to sort students by class
    const sortByClass = () => {
        const sortedStudents = [...students].sort((a, b) => a.class.localeCompare(b.class));
        setStudents(sortedStudents);
        setSortOrder("class");
    };
    const handleRefresh = () => {
        fetchStudents();
    };
    const handleDelete = (studentId) => {
        console.log(studentId);
        fetch(`http://127.0.0.1:5000/delete-student/${studentId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                fetchStudents(); // Refresh the list after deletion
            })
            .catch((error) => console.error("Error:", error));
    };
    const handleEdit = (student) => {
        setCurrentStudent(student);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleUpdate = () => {
        fetch(`http://127.0.0.1:5000/update-student/${currentStudent._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentStudent),
        })
            .then((response) => response.json())
            .then(() => {
                fetchStudents(); // Refresh the list after update
                setOpen(false); // Close the edit dialog
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <Box component="form" noValidate sx={{ mt: 1, mx: 15, my: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="title2LeftContainer">Student List</div>
                <Stack direction="row" spacing={2}>
                    <Button onClick={sortByName} sx={{ ml: 1 }}>
                        Sort by Name
                    </Button>
                    <Button onClick={sortByClass} sx={{ ml: 1 }}>
                        Sort by Class
                    </Button>
                    <Button onClick={handleRefresh} sx={{ ml: 1 }}>
                        Refresh
                    </Button>
                </Stack>
            </Box>

            <List>
                {students.map((student, index) => (
                    <ListItem
                        key={student._id}
                        sx={{
                            backgroundColor: index % 2 ? "action.hover" : "background.paper",
                            "&:hover": {
                                backgroundColor: "action.selected",
                            },
                        }}
                        secondaryAction={
                            <>
                                <IconButton onClick={() => handleEdit(student)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(student._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText
                            primary={student.name.replace(/([A-Z])/g, " $1").trim()}
                            secondary={`Class: ${student.class} Number: ${student.number}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Name"
                        type="text"
                        fullWidth
                        value={currentStudent.name}
                        onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        label="Class"
                        type="text"
                        fullWidth
                        value={currentStudent.class}
                        onChange={(e) => setCurrentStudent({ ...currentStudent, class: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        label="Number"
                        type="text"
                        fullWidth
                        value={currentStudent.number}
                        onChange={(e) => setCurrentStudent({ ...currentStudent, number: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StudentList;
