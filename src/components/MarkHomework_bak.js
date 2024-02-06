import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
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
    Input
} from '@mui/material';
import {TabContext, TabPanel} from '@mui/lab';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import {useNavigate} from 'react-router-dom';


// function sendData(data) {
//     return new Promise((resolve, reject) => {
//     fetch('http://127.0.0.1:5000/save-data', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//         .then(response => response.json())
//         .then(data => console.log('Success:', data))
//         .catch((error) => console.error('Error:', error));}
// }
function sendAssignment(data) {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:5000/assignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    resolve();
                } else {
                    reject(new Error('Network response was not ok.'));
                }
            })
            .catch(error => reject(error));
    });
}


function MarkHomeworkPage() {

    const teacherUsername = "AppleMa";
    // State for tabs
    const location = useLocation();
    const [value, setValue] = useState('1');

    // State for "Create New Homework" form
    const [newClass, setNewClass] = useState('');
    const [classes, setClasses] = useState([]);
    const [homeworkTitle, setHomeworkTitle] = useState('');
    const [markingRubrics, setMarkingRubrics] = useState('');
    const [assignmentId, setAssignmentId] = useState(null);

    // State for "Mark Existing Homework" form
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedHomework, setSelectedHomework] = useState('');
    const [homeworkOptions, setHomeworkOptions] = useState([]);
    const [existingMarkingRubrics, setExistingMarkingRubrics] = useState('');

    // State for handling uploaded files
    const [uploads, setUploads] = useState({});

    // States for creating homework
    const [isHomeworkCreated, setIsHomeworkCreated] = useState(false);
    const [homeworkDetails, setHomeworkDetails] = useState({class: '', title: '', rubrics: ''})
    //const [students, setStudents] = useState([]);

    //States for navigation
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the current path is '/MarkHomework'
        if (location.pathname === '/MarkHomework') {
            // Reset state here
            setNewClass('');
            setHomeworkTitle('');
            setMarkingRubrics('');
            // Reset other states as needed
        }
    }, [location]);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Handlers for "Create New Homework"
    const handleNewClassChange = (event) => {
        setNewClass(event.target.value);
    };
    const handleHomeworkTitleChange = (event) => {
        setHomeworkTitle(event.target.value);
    };
    const handleMarkingRubricsChange = (event) => {
        setMarkingRubrics(event.target.value);
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/teacher/${teacherUsername}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch classes');
                }
            })
            .then(data => setClasses(data))
            .catch(error => console.error('Error:', error));
    }, [teacherUsername]);



    // Handlers for "Mark Existing Homework"
    // const handleClassChange = (event) => {
    //     const newClass = event.target.value;
    //     setSelectedClass(newClass);
    //     setSelectedHomework('');
    //     setExistingMarkingRubrics('');
    //     // Load homework options based on selected class
    //     // TODO: Fetch homework titles from an API or service
    //     const newHomeworkOptions = newClass === '10' ? ['Essay', 'Project'] : ['Homework 1', 'Homework 2'];
    //     setHomeworkOptions(newHomeworkOptions);
    // };
    const handleClassChange = (event) => {
        const newClass = event.target.value;
        console.log(newClass)
        setSelectedClass(newClass);
        setSelectedHomework('');
        setExistingMarkingRubrics('');

        // Fetch homework titles based on selected class
        fetch(`http://127.0.0.1:5000/assignment/${newClass}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch homework title');
                }
            })
            .then(data => setHomeworkOptions(data))
            .catch(error => console.error('Error:', error));

    };

    const handleExistingHomeworkChange = (event) => {
        const newHomeworkTitle = event.target.value;
        setSelectedHomework(newHomeworkTitle);

        // Assuming that homework title is unique and can be used to fetch rubrics
        // Fetch marking rubrics based on selected homework
        fetch(`http://127.0.0.1:5000/assignment/homework-title/${newHomeworkTitle}`)
            .then(response => response.json())
            .then(data => {
                const markingRubrics = data.rubrics; // Assuming 'rubrics' is the field in your response
                setExistingMarkingRubrics(markingRubrics);
            })
            .catch(error => console.error('Error fetching marking rubrics:', error));
    };

    // Handler for updating existing marking rubrics after they have been loaded
    const handleExistingMarkingRubricsChange = (event) => {
        setExistingMarkingRubrics(event.target.value);
    };


    // const updateRubrics = async () => {
    //     // Implement your update logic here
    //     // Add your own API call or backend interaction here
    //     console.log("Rubrics Updated");
    //
    //     setValue('1')
    //
    //     setNewClass(selectedClass)
    //     setHomeworkTitle(selectedHomework)
    //     setMarkingRubrics(existingMarkingRubrics)
    //
    //     createHomework()
    //};
    const updateRubrics = async () => {
        // Construct the payload for the update
        const payload = {
            class: selectedClass,
            homeworkTitle: selectedHomework,
            rubrics: existingMarkingRubrics
        };

        // Make the API call to the backend to update the rubrics
        try {
            const response = await fetch('http://127.0.0.1:5000/assignment/update-rubrics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Rubrics Updated:", data.message);

            // Reset states or perform additional actions as needed
            setValue('1');
            setNewClass(selectedClass);
            setHomeworkTitle(selectedHomework);
            setMarkingRubrics(existingMarkingRubrics);


            // You may want to call createHomework() here if needed
            createHomework()

        } catch (error) {
            console.error('Error updating rubrics:', error);
        }
    };

    const deleteHomework = async () => {
        // Implement your delete logic here
        // Add your own API call or backend interaction here
        console.log("Homework Deleted");
    };

    useEffect(() => {
        if (newClass) {
            fetch(`http://127.0.0.1:5000/students/${newClass}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Log to confirm the structure of data
                    setStudents(data);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [newClass]); // Re-run the effect when newClass changes

    const createHomework = () => {
        // Logic to create the Homework
        // For example, making an API call to create the Homework and then fetch the list of students
        setIsHomeworkCreated(true);
        if (newClass) {
            fetch(`http://127.0.0.1:5000/students/${newClass}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Log to confirm the structure of data
                    setStudents(data);
                })
                .catch(error => console.error('Error:', error));
        }

        const homeworkData = {
            class: newClass,
            title: homeworkTitle, // Replace with actual state variable if different
            rubrics: markingRubrics // Replace with actual state variable if different
        };

        // Send the data to the backend
        fetch('http://127.0.0.1:5000/create_homework', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(homeworkData)
        })
            .then(response => response.json())
            .then(data => {
                if(data.id) {
                    setAssignmentId(data.id);  // Store the assignment ID in state
                    console.log("Homework Created with ID:", data.id);
                } else {
                    // Handle any issues, such as not receiving an ID
                    console.error("Failed to create homework or receive an ID.");
                }
                setIsHomeworkCreated(true);
            })
            .catch(error => {
                console.error('Error:', error); // Handle error
            });

        console.log("Homework Created");
    };



    const handleFileUpload = (studentId, assignmentId, file) => {
        // Logic to handle file upload
        // For example, you might want to make an API call to upload the file
        //setUploads({...uploads, [studentId]: file});
        const formData = new FormData();
        formData.append('file', file);
        formData.append('student_id', studentId);
        formData.append('assignment_id', assignmentId);

        console.log(`assignment_id ${assignmentId} student_id ${studentId}`)

        fetch('http://127.0.0.1:5000/submittedWork', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('OCR Text:', data.text);
                // Handle the extracted text as needed
            })
            .catch(error => {
                console.error('Error:', error);
            });

    };

    const handleBack = () => {
        setIsHomeworkCreated(false);
    };
    const [students, setStudents] = useState([]);

    // Function to handle the "Start Marking" button click
    const startMarking = () => {
        // Here you would normally fetch the grades and comments from an API
        // For now, we're using the dummy data already set in the state


        sendAssignment({ homeworkTitle: homeworkTitle, rubrics: markingRubrics })
            .then(() => {
                navigate('/gradesdisplay', {
                    state: {
                        students: students, // The students data
                        classInfo: newClass, // The selected class
                        homeworkTitle: homeworkTitle // The homework title
                    }
                })
            })
            .catch(error => console.error('Error:', error));
        // Navigate to the Grades Display Page
    };


    return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="homework tabs">
                        <Tab label="Create New Homework" value="1"/>
                        <Tab label="Mark Existing Homework" value="2"/>
                    </Tabs>
                </Box>
                <TabPanel value="1">
                    {isHomeworkCreated ? (
                        <Box>
                            <TextField
                                label="Class"
                                value={newClass}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.09)', // Dim background
                                    cursor: 'not-allowed', // "Not allowed" cursor
                                    '& .MuiInputBase-input': {
                                        cursor: 'not-allowed', // "Not allowed" cursor for the input field
                                    }
                                }}
                            />
                            <TextField
                                label="Homework Title"
                                value={homeworkTitle}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.09)', // Dim background
                                    cursor: 'not-allowed', // "Not allowed" cursor
                                    '& .MuiInputBase-input': {
                                        cursor: 'not-allowed', // "Not allowed" cursor for the input field
                                    }
                                }}
                            />
                            <TextField
                                label="Marking Rubrics"
                                value={markingRubrics}
                                onChange={handleMarkingRubricsChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                    inputComponent: TextareaAutosize,
                                    inputProps: {
                                        minRows: 3,
                                        style: {resize: 'vertical'},
                                    },
                                }}
                                sx={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.09)', // Dim background
                                    cursor: 'not-allowed', // "Not allowed" cursor
                                    '& .MuiInputBase-input': {
                                        cursor: 'not-allowed', // "Not allowed" cursor for the input field
                                    }
                                }}
                            />

                            <List>
                                {students.map((student) => (
                                    <ListItem key={student._id}>
                                        <ListItemText primary={`${student.name} (${student.number})`} />
                                        <Input type="file" onChange={(e) => handleFileUpload(student._id, assignmentId, e.target.files[0])} />
                                    </ListItem>
                                ))}
                            </List>



                            <Button variant="contained" sx={{mt: 2}} onClick={startMarking}>Start Marking</Button>
                            <Button variant="outlined" sx={{mt: 2, ml: 2}} onClick={handleBack}>Back</Button>
                        </Box>
                    ) : (
                        <Box>
                            <TextField
                                select
                                label="Class"
                                value={newClass}
                                onChange={handleNewClassChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            >
                                {classes.map((className) => (
                                    <MenuItem key={className} value={className}>
                                        {className}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Homework Title"
                                value={homeworkTitle}
                                onChange={handleHomeworkTitleChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Marking Rubrics"
                                value={markingRubrics}
                                onChange={handleMarkingRubricsChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    inputComponent: TextareaAutosize,
                                    inputProps: {
                                        minRows: 3,
                                        style: {resize: 'vertical'},
                                    },
                                }}
                            />
                            <Button variant="contained" sx={{mt: 2}} onClick={createHomework}>Create Homework</Button>
                        </Box>
                    )}


                </TabPanel>
                <TabPanel value="2">
                    {/* Mark Existing Homework Content */}
                    <TextField
                        select
                        label="Class"
                        value={selectedClass}
                        onChange={handleClassChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    >
                        {classes.map((className) => (
                            <MenuItem key={className} value={className}>
                                {className}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Homework Title"
                        value={selectedHomework}
                        onChange={handleExistingHomeworkChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled={!selectedClass} // Disable until a class is selected
                    >
                        {homeworkOptions.map((homework) => (
                            <MenuItem key={homework} value={homework}>
                                {homework}
                            </MenuItem>
                        ))}
                    </TextField>
                    {selectedHomework && (
                        <>
                            <TextField
                                label="Marking Rubrics"
                                value={existingMarkingRubrics}
                                onChange={handleExistingMarkingRubricsChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    inputComponent: TextareaAutosize,
                                    inputProps: {
                                        minRows: 3,
                                        style: {resize: 'vertical'},
                                    },
                                }}
                            />

                            <Button variant="contained" sx={{mt: 2}} onClick={updateRubrics}>Update Rubrics</Button>
                            <Button variant="outlined" sx={{mt: 2, ml: 2}} color="error" onClick={deleteHomework}>Delete
                                Homework</Button>
                        </>
                    )}
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default MarkHomeworkPage;
