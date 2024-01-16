import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Tab, Tabs, TextField, MenuItem, Button, Typography, List, ListItem, ListItemText, Input } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useNavigate } from 'react-router-dom';

function MarkHomeworkPage() {
    // State for tabs
    const location = useLocation();
    const [value, setValue] = useState('1');

    // State for "Create New Homework" form
    const [newClass, setNewClass] = useState('');
    const [homeworkTitle, setHomeworkTitle] = useState('');
    const [markingRubrics, setMarkingRubrics] = useState('');

    // State for "Mark Existing Homework" form
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedHomework, setSelectedHomework] = useState('');
    const [homeworkOptions, setHomeworkOptions] = useState([]);
    const [existingMarkingRubrics, setExistingMarkingRubrics] = useState('');

    // State for handling uploaded files
    const [uploads, setUploads] = useState({});

    // States for creating homework
    const [isHomeworkCreated, setIsHomeworkCreated] = useState(false);
    const [homeworkDetails, setHomeworkDetails] = useState({ class: '', title: '', rubrics: '' })
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

    // Handlers for "Mark Existing Homework"
    const handleClassChange = (event) => {
        const newClass = event.target.value;
        setSelectedClass(newClass);
        setSelectedHomework('');
        setExistingMarkingRubrics('');
        // Load homework options based on selected class
        // TODO: Fetch homework titles from an API or service
        const newHomeworkOptions = newClass === '10' ? ['Essay', 'Project'] : ['Homework 1', 'Homework 2'];
        setHomeworkOptions(newHomeworkOptions);
    };

    const handleExistingHomeworkChange = (event) => {
        const newHomework = event.target.value;
        setSelectedHomework(newHomework);
        // TODO: Fetch marking rubrics from an API or service
        const newMarkingRubrics = newHomework === 'Essay' ? 'Criteria for essay grading' : 'Criteria for project grading';
        setExistingMarkingRubrics(newMarkingRubrics);
    };

    // Handler for updating existing marking rubrics after they have been loaded
    const handleExistingMarkingRubricsChange = (event) => {
        setExistingMarkingRubrics(event.target.value);
    };


    const updateRubrics = async () => {
        // Implement your update logic here
        // Add your own API call or backend interaction here
        console.log("Rubrics Updated");
    };

    const deleteHomework = async () => {
        // Implement your delete logic here
        // Add your own API call or backend interaction here
        console.log("Homework Deleted");
    };

    const createHomework = () => {
        // Logic to create the Homework
        // For example, making an API call to create the Homework and then fetch the list of students
        setIsHomeworkCreated(true);
        console.log("Homework Created");

        // Mock data for students
        const mockStudents = [
            //{ id: 1, name: 'Student 1', number: '1001' },
            //{ id: 2, name: 'Student 2', number: '1002' },
            { id: 1, name: 'Student 1', number: '1001', grade: 'A', comments: 'Excellent!' },
            { id: 2, name: 'Student 2', number: '1002', grade: 'B', comments: 'Good effort, but needs improvement on structure.' },
            // ... more students
        ];

        setStudents(mockStudents);
    };


    const handleFileUpload = (studentId, file) => {
        // Logic to handle file upload
        // For example, you might want to make an API call to upload the file

        setUploads({ ...uploads, [studentId]: file });
    };

    const handleBack = () => {
        setIsHomeworkCreated(false);
    };

    const [students, setStudents] = useState([
        // Dummy initial student data
        { id: 1, name: 'Student 1', number: '1001', grade: 'A', comments: 'Excellent work!' },
        { id: 2, name: 'Student 2', number: '1002', grade: 'B', comments: 'Good effort, but needs improvement on structure.' },
        // ... other students
    ]);

    // Function to handle the "Start Marking" button click
    const startMarking = () => {
        // Here you would normally fetch the grades and comments from an API
        // For now, we're using the dummy data already set in the state

        // Navigate to the Grades Display Page
        navigate('/gradesdisplay', { state: { students } });
    };


    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="homework tabs">
                        <Tab label="Create New Homework" value="1" />
                        <Tab label="Mark Existing Homework" value="2" />
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
                                        style: { resize: 'vertical' },
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
                                    <ListItem key={student.id}>
                                        <ListItemText primary={`${student.name} (${student.number})`} />
                                        <Input type="file" onChange={(e) => handleFileUpload(student.id, e.target.files[0])} />
                                    </ListItem>
                                ))}
                            </List>
                            <Button variant="contained" sx={{ mt: 2}} onClick={startMarking}>Start Marking</Button>
                            <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={handleBack}>Back</Button>
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
                                <MenuItem value="10">Class 10</MenuItem>
                                <MenuItem value="20">Class 20</MenuItem>
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
                                        style: { resize: 'vertical' },
                                    },
                                }}
                            />
                            <Button variant="contained" sx={{ mt: 2 }} onClick={createHomework}>Create Homework</Button>
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
                        <MenuItem value="10">Class 10</MenuItem>
                        <MenuItem value="20">Class 20</MenuItem>
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
                                        style: { resize: 'vertical' },
                                    },
                                }}
                            />

                            <Button variant="contained" sx={{ mt: 2 }}  onClick={updateRubrics}>Update Rubrics</Button>
                            <Button variant="outlined" sx={{ mt: 2, ml: 2 }} color="error" onClick={deleteHomework}>Delete Homework</Button>
                        </>
                    )}
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default MarkHomeworkPage;
