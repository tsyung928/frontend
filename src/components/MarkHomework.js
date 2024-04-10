import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    Box,
    Tab,
    Tabs,
    TextField,
    MenuItem,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Input,
    Autocomplete,
    LinearProgress,
    Chip,
    CircularProgress,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer } from "recharts";
import { type } from "@testing-library/user-event/dist/type";
import CheckIcon from "@mui/icons-material/Check";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";

function MarkassignmentPage() {
    const teacherUsername = localStorage.getItem("username");
    // State for tabs
    const location = useLocation();

    // State for "Create New assignment" form
    const [classes, setClasses] = useState([]);
    const [titles, setTitles] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [assignmentTitle, setassignmentTitle] = useState("");
    const [markingRubrics, setMarkingRubrics] = useState("");
    const [assignmentDescription, setAssignmentDescription] = useState("");
    const [assignmentId, setAssignmentId] = useState(null);

    // States for creating assignment
    const [isassignmentCreated, setIsassignmentCreated] = useState(false);

    const [uploadStatuses, setUploadStatuses] = useState({});

    const navigate = useNavigate();

    const [homeworkTypes, setHomeworkTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const [openDropdown, setOpenDropdown] = useState(false);

    const [isMarking, setIsMarking] = useState(false);
    const [markingMessage, setMarkingMessage] = useState("");

    useEffect(() => {
        // Check if the current path is '/Markassignment'
        if (location.pathname === "/Markassignment") {
            // Reset state here
            setSelectedClass("");
            setassignmentTitle("");
            setMarkingRubrics("");
            setAssignmentDescription("");

            fetch(`http://127.0.0.1:5000/assignment/fetch_types/${teacherUsername}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Failed to fetch types");
                    }
                })
                .then((data) => setHomeworkTypes(data))
                .catch((error) => console.error("Error:", error));

            //setHomeworkTypes([]);
            // Reset other states as needed
        }
    }, [location]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/teacher/${teacherUsername}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch classes");
                }
            })
            .then((data) => setClasses(data))
            .catch((error) => console.error("Error:", error));
    }, [teacherUsername]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/assignment/fetch_types/${teacherUsername}`)
            .then((response) => {
                if (response.ok) {
                    console.log("okokoko");
                    return response.json();
                } else {
                    console.log("nonono");
                    throw new Error("Failed to fetch types");
                }
            })
            .then((data) => {
                console.log("Types:", data);
                setHomeworkTypes(data);
            })

            .catch((error) => console.error("Error:", error));
    }, [teacherUsername]);

    const handleFileUpload = (studentId, assignmentId, file) => {
        // Logic to handle file upload
        // For example, you might want to make an API call to upload the file
        //setUploads({...uploads, [studentId]: file});
        const formData = new FormData();
        formData.append("file", file);
        formData.append("student_id", studentId);
        formData.append("assignment_id", assignmentId);

        console.log(`assignment_id ${assignmentId} student_id ${studentId}`);
        setUploadStatuses((prevStatuses) => ({ ...prevStatuses, [studentId]: "inProgress" }));

        fetch("http://127.0.0.1:5000/submittedWork", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                // If the response indicates success, update the status to 'success'
                const isSuccess = response && response.status === "success"; // Adjust according to your response structure
                setUploadStatuses((prevStatuses) => ({
                    ...prevStatuses,
                    [studentId]: isSuccess ? "success" : "failure", // Set to 'failure' if response does not indicate success
                }));
                console.log(response);
                console.log("OCR Text:", response.text);
            })
            .then((data) => {
                console.log("OCR Text:", data.text);
                // Handle the extracted text as needed
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    const allUploadsSuccessful = () => {
        console.log("Checking if all uploads are successful");
        console.log(uploadStatuses);
        return students.every((student) => uploadStatuses[student._id] === "success");
    };

    const [students, setStudents] = useState([]);

    const handleSelectedClassChange = async (e) => {
        const c = e.target.value;
        setSelectedClass(c);
        console.log(assignmentTitle);

        setassignmentTitle("");
        console.log(assignmentTitle);
        setTitles([]);
        setMarkingRubrics("");
        setAssignmentDescription("");
        setSelectedTypes([]);

        const data = await fetch(`http://127.0.0.1:5000/assignment/${c}`).then((d) => {
            return d.json();
        });

        console.log(data);

        setTitles(data);
    };

    const handleassignmentTitleChange = async (e) => {
        let t = e.target.value;

        if (t === 0) {
            t = e.target.innerText;
        }

        if (!t) {
            setassignmentTitle("");
            setAssignmentDescription("");
            setMarkingRubrics("");
            setSelectedTypes([]);
            return;
        }

        setassignmentTitle(t);

        try {
            // Fetch the type for the assignment title
            const typeResponse = await fetch(`http://127.0.0.1:5000/assignment/fetch_type_by_title/${t}`);
            if (typeResponse.ok) {
                const typeData = await typeResponse.json();

                //setSelectedTypes(typeData.type);
                setSelectedTypes(typeData.type || []);
                console.log(typeData.type);
            } else {
                console.error("Failed to fetch assignment type");
            }
        } catch (e) {
            console.error("Error fetching assignment type:", e);
        }

        try {
            const data = await fetch(`http://127.0.0.1:5000/assignment/fetch_description_by_title/${t}`).then((d) => {
                return d.json();
            });
            if (data && data.description) {
                setAssignmentDescription(data.description);
            } else {
                setassignmentTitle(t);
            }
        } catch (e) {}

        try {
            const data = await fetch(`http://127.0.0.1:5000/assignment/fetch_rubrics_by_title/${t}`).then((d) => {
                return d.json();
            });
            if (data && data.rubrics) {
                setMarkingRubrics(data.rubrics);
            } else {
                setassignmentTitle(t);
            }
        } catch (e) {}
    };

    const handleMarkingRubricsChange = (e) => {
        setMarkingRubrics(e.target.value);
    };

    const handleAssignmentDescriptionChange = (e) => {
        setAssignmentDescription(e.target.value);
    };

    const createassignment = async () => {
        const students = await fetch(`http://127.0.0.1:5000/students/${selectedClass}`).then((d) => {
            return d.json();
        });

        setStudents(students);

        const assignmentData = {
            class: selectedClass,
            title: assignmentTitle,
            type: selectedTypes,
            description: assignmentDescription,
            rubrics: markingRubrics,
        };

        if (titles.includes(assignmentTitle)) {
            const updateResponse = await fetch("http://127.0.0.1:5000/update_assignment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(assignmentData),
            }).then((response) => response.json());

            if (updateResponse.success) {
                setAssignmentId(updateResponse.id);
            } else {
                setAssignmentId(updateResponse.id);
            }
        } else {
            const data = await fetch("http://127.0.0.1:5000/create_assignment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(assignmentData),
            }).then((response) => response.json());

            if (data.id) {
                setAssignmentId(data.id);
                console.log(data.id);
            }
            console.log("assignment created successfully.");
        }
        setIsassignmentCreated(true);
    };

    const startMarking = async () => {
        setIsMarking(true); // Start loading
        setMarkingMessage("Marking in process..."); // Set message

        // Construct the payload
        const payload = {
            assignmentId: assignmentId,
            class: selectedClass,
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/start-marking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            const result = await response.json();
            console.log(result);
            // If you navigate away right after receiving the response,
            // users won't see the success message. Consider navigating away later or updating the message to indicate completion.
        } catch (error) {
            console.error("Failed to start marking:", error);
            setMarkingMessage("Failed to start marking."); // Set failure message
        } finally {
            setIsMarking(false); // End loading
        }

        navigate("/GradesDisplay", { state: { assignmentId: assignmentId } });
    };

    const renderUploadProgress = (status) => {
        let progressComponent;
        switch (status) {
            case "inProgress":
                progressComponent = <LinearProgress />;
                break;
            case "success":
                progressComponent = <LinearProgress variant="determinate" value={100} color="success" />;
                break;
            case "failure":
                progressComponent = <LinearProgress variant="determinate" value={100} color="error" />;
                break;
            default:
                // A transparent LinearProgress to keep the layout consistent
                progressComponent = <LinearProgress variant="determinate" value={0} style={{ visibility: "hidden" }} />;
        }
        return <Box sx={{ width: "100%" }}>{progressComponent}</Box>;
    };

    const handleTypesChange = (event, newValue) => {
        // Ensure that we only store strings in the selectedTypes state
        const newSelectedTypes = newValue.map((type) => (typeof type === "string" ? type : type.title));
        setSelectedTypes(newSelectedTypes);
    };

    const handleOpenDropdown = () => {
        if (!openDropdown) {
            setOpenDropdown(true);
        }
    };

    const handleCloseDropDown = (event, reason) => {
        if (reason === "selectOption") {
            setOpenDropdown(true);
        } else {
            setOpenDropdown(false);
        }
    };

    useEffect(() => {
        window.addEventListener("error", (e) => {
            if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
                const resizeObserverErrDiv = document.getElementById("webpack-dev-server-client-overlay-div");
                const resizeObserverErr = document.getElementById("webpack-dev-server-client-overlay");
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute("style", "display: none");
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute("style", "display: none");
                }
            }
        });
    }, []);

    return (
        <div>
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
                        gap: 2,
                    }}
                >
                    <div className="titleContainer">Mark Homework</div>
                    <TextField
                        select
                        label="Class"
                        value={selectedClass}
                        onChange={handleSelectedClassChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled={isassignmentCreated}
                    >
                        {classes.map((className) => (
                            <MenuItem key={className} value={className}>
                                {className}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Autocomplete
                        freeSolo
                        id="combo-box-demo"
                        options={titles}
                        fullWidth
                        margin="normal"
                        key={selectedClass}
                        onChange={handleassignmentTitleChange}
                        onInputChange={(event, newInputValue) => {
                            // Update your state with the newInputValue
                            setassignmentTitle(newInputValue);
                        }}
                        disabled={isassignmentCreated}
                        renderInput={(params) => <TextField {...params} label="Title" />}
                    />

                    <Autocomplete
                        fullWidth
                        multiple
                        freeSolo
                        id="homework-type-tags"
                        options={homeworkTypes.map((option) => (typeof option === "string" ? option : option.title))}
                        value={selectedTypes}
                        open={openDropdown}
                        onOpen={handleOpenDropdown}
                        onClose={handleCloseDropDown}
                        onChange={(event, newValue) => {
                            setSelectedTypes(newValue);
                        }}
                        disabled={isassignmentCreated}
                        filterOptions={(options, params) => {
                            const filtered = options.filter((option) => {
                                // Ensure that option is a string before calling toLowerCase
                                return typeof option === "string"
                                    ? option.toLowerCase().includes(params.inputValue.toLowerCase())
                                    : false;
                            });

                            // Add an option to add a new type
                            const isExisting = options.some(
                                (option) =>
                                    typeof option === "string" &&
                                    option.toLowerCase() === params.inputValue.toLowerCase()
                            );
                            if (params.inputValue !== "" && !isExisting) {
                                filtered.push(params.inputValue);
                            }

                            return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        getOptionLabel={(option) => {
                            // When creating a new tag, "option" is a string of the new tag's label
                            // For pre-existing tags, "option" is the tag object with a "title" property
                            return typeof option === "string" ? option : option.title;
                        }}
                        renderOption={(props, option, { selected }) => (
                            <li {...props} style={{ backgroundColor: selected ? "#f4f4f4" : "#fff" }}>
                                {selected ? <CheckIcon style={{ marginRight: 8 }} /> : null}
                                {option.title || option}
                            </li>
                        )}
                        renderTags={(tagValue, getTagProps) =>
                            // "tagValue" is an array of all selected tags
                            tagValue.map((option, index) => (
                                <Chip
                                    label={typeof option === "string" ? option : option.title}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        renderInput={(params) => <TextField {...params} label="Homework Types" />}
                    />

                    <TextField
                        label="Homework Description"
                        value={assignmentDescription}
                        onChange={handleAssignmentDescriptionChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled={isassignmentCreated}
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            inputProps: {
                                maxRows: 7,
                                minRows: 3,
                                style: { resize: "vertical" },
                            },
                        }}
                    />

                    <TextField
                        label="Marking Rubrics"
                        value={markingRubrics}
                        onChange={handleMarkingRubricsChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled={isassignmentCreated}
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            inputProps: {
                                maxRows: 7,
                                minRows: 3,
                                style: { resize: "vertical" },
                            },
                        }}
                    />
                    {!isassignmentCreated && (
                        <Button variant="contained" sx={{ mt: 2 }} onClick={createassignment}>
                            Upload Student Submissions
                        </Button>
                    )}
                    {isassignmentCreated && (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    width: "85%",
                                    alignItems: "stretch",
                                    justifyContent: "space-between",
                                    mx: 15,
                                    my: 5,
                                }}
                            >
                                <List sx={{ width: "100%" }}>
                                    {students.map((student, index) => (
                                        <ListItem
                                            key={student._id}
                                            sx={{
                                                backgroundColor: index % 2 ? "action.hover" : "background.paper",
                                                "&:hover": {
                                                    backgroundColor: "action.selected",
                                                },
                                                display: "block",
                                                mb: 1,
                                            }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <ListItemText
                                                    primary={`${student.name} (${student.number})`}
                                                    sx={{ my: 0 }}
                                                />
                                                <Input
                                                    type="file"
                                                    edge="end"
                                                    onChange={(e) =>
                                                        handleFileUpload(student._id, assignmentId, e.target.files[0])
                                                    }
                                                    disabled={uploadStatuses[student._id] === "inProgress"}
                                                    sx={{ display: "block", mb: 1 }}
                                                />
                                            </div>

                                            {renderUploadProgress(uploadStatuses[student._id])}
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={startMarking}
                                    disabled={!allUploadsSuccessful() || isMarking}
                                >
                                    Start Marking
                                </Button>
                                {isMarking && <CircularProgress size={24} sx={{ ml: 2 }} />}
                                <Typography variant="body2" sx={{ ml: 2 }}>
                                    {markingMessage}
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </ResponsiveContainer>
        </div>
    );
}

export default MarkassignmentPage;
