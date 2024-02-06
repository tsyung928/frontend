// StudentList.js
import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, IconButton, Button, CircularProgress, Box, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StudentList = ({ onEdit, onDelete }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState(""); // New state to track sort order

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
                                <IconButton edge="end" aria-label="edit" onClick={() => onEdit(student)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(student._id)}>
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
        </Box>
    );
};

export default StudentList;
