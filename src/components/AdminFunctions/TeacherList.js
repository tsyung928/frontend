// TeacherList.js
import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, IconButton, CircularProgress, Box, Stack, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TeacherList = ({ onEdit, onDelete }) => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState(""); // New state to track sort order

    useEffect(() => {
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

    const sortByName = () => {
        const sortedTeachers = [...teachers].sort((a, b) => a.username.localeCompare(b.username));
        setTeachers(sortedTeachers);
        setSortOrder("username");
    };

    return (
        <Box component="form" noValidate sx={{ mt: 1, mx: 15, my: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="title2LeftContainer">Teacher List</div>
                <Stack direction="row" spacing={2}>
                    <Button onClick={sortByName} sx={{ ml: 1 }}>
                        Sort by Name
                    </Button>
                </Stack>
            </Box>

            <List>
                {teachers.map((teachers, index) => (
                    <ListItem
                        key={teachers._id}
                        sx={{
                            backgroundColor: index % 2 ? "action.hover" : "background.paper",
                            "&:hover": {
                                backgroundColor: "action.selected",
                            },
                        }}
                        secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => onEdit(teachers)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(teachers._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText
                            primary={teachers.username.replace(/([A-Z])/g, " $1").trim()} // Add space before each uppercase letter
                            secondary={`Classes: ${teachers.classes.join(", ")}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TeacherList;
