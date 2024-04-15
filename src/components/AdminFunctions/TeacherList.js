import React, { useEffect, useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
    Box,
    Stack,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState({ _id: "", username: "", classes: [] });

    // Function to fetch teachers
    const fetchTeachers = () => {
        setLoading(true);
        fetch("http://127.0.0.1:5000/teachers")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch teachers");
                }
            })
            .then((data) => {
                setTeachers(data);
                console.log(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error);
                setLoading(false);
            });
    };

    const handleClickOpen = (teacher) => {
        setCurrentTeacher(teacher);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (teacherId) => {
        // teacherId should be a string. If it's not, there's a problem in the data you received from the backend.
        console.log("Deleting teacher with ID:", teacherId);
        if (!teacherId) {
            console.error("The teacher ID is undefined or not valid.");
            return;
        }

        fetch(`http://127.0.0.1:5000/delete-teacher/${teacherId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTeachers(teachers.filter((teacher) => teacher._id !== teacherId));
                // Optionally, handle UI feedback
            })
            .catch((error) => console.error("Error:", error));
    };

    const handleUpdate = () => {
        fetch(`http://127.0.0.1:5000/update-teacher/${currentTeacher._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: currentTeacher.username,
                classes: currentTeacher.classes,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                const updatedTeachers = teachers.map((teacher) =>
                    teacher._id === currentTeacher._id
                        ? { ...teacher, username: currentTeacher.username, classes: currentTeacher.classes }
                        : teacher
                );
                setTeachers(updatedTeachers);
                setOpen(false); // Close the dialog
                // Optionally add notifications or other UI feedback
            })
            .catch((error) => console.error("Error:", error));
    };

    // Initial fetch when the component mounts
    useEffect(() => {
        fetchTeachers();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    const sortByName = () => {
        const sortedTeachers = [...teachers].sort((a, b) => a.username.localeCompare(b.username));
        setTeachers(sortedTeachers);
    };

    return (
        <Box component="form" noValidate sx={{ mt: 1, mx: 15, my: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="title2LeftContainer">Teacher List</div>
                <Stack direction="row" spacing={2}>
                    <Button onClick={sortByName} sx={{ ml: 1 }}>
                        Sort by Name
                    </Button>
                    <Button onClick={fetchTeachers} sx={{ ml: 1 }}>
                        Refresh List
                    </Button>
                </Stack>
            </Box>

            <List>
                {teachers.map((teacher, index) => (
                    <ListItem
                        key={teacher._id}
                        sx={{
                            backgroundColor: index % 2 ? "action.hover" : "background.paper",
                            "&:hover": {
                                backgroundColor: "action.selected",
                            },
                        }}
                        secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(teacher)}>
                                    <EditIcon />
                                </IconButton>

                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(teacher._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText
                            primary={teacher.username.replace(/([A-Z])/g, " $1").trim()} // Add space before each uppercase letter
                            secondary={`Classes: ${teacher.classes.join(", ")}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Teacher</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentTeacher.username}
                        onChange={(e) => setCurrentTeacher({ ...currentTeacher, username: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Classes (comma-separated)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentTeacher.classes.join(",")}
                        onChange={(e) => setCurrentTeacher({ ...currentTeacher, classes: e.target.value.split(",") })}
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

export default TeacherList;
