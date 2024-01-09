import React, { useState } from 'react';
import { Box, Tab, Tabs, TextField, MenuItem, Button, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';


function MarkHomeworkPage() {
    // State for tabs
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

    const createHomework = async () => {
        // Implement your create logic here
        // Add your own API call or backend interaction here
        console.log("Homework Created");
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
                    {/* Create New Homework Content */}
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
