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
import {Autocomplete} from '@mui/lab';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import {useNavigate} from 'react-router-dom';
import {ResponsiveContainer} from "recharts";


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


function MarkassignmentPage() {

    const teacherUsername = "AppleMa";
    // State for tabs
    const location = useLocation();

    // State for "Create New assignment" form
    const [classes, setClasses] = useState([]);
    const [titles, setTitles] = useState([]);
    const [selectedClass, setSelectedClass] = useState('')
    const [assignmentTitle, setassignmentTitle] = useState('');
    const [markingRubrics, setMarkingRubrics] = useState('');
    const [assignmentId, setAssignmentId] = useState(null);

    // States for creating assignment
    const [isassignmentCreated, setIsassignmentCreated] = useState(false);

    //States for navigation
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the current path is '/Markassignment'
        if (location.pathname === '/Markassignment') {
            // Reset state here
            setSelectedClass('');
            setassignmentTitle('');
            setMarkingRubrics('');
            // Reset other states as needed
        }
    }, [location]);

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

    const handleBeforeUnload = (event) => {
        event.preventDefault();
        handleBack(); // Call the same function used for the Back button
        return event.returnValue = "Are you sure you want to exit?";
    };
    const handleBack = () => {
        setIsassignmentCreated(false);
        const dataToDelete = {
            class: selectedClass,
            assignment_title: assignmentTitle,
        };
        fetch('http://127.0.0.1:5000/delete_assignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToDelete),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                // Perform any additional cleanup or state updates here
            })
            .catch(error => console.error('Error:', error));

    };



    const [students, setStudents] = useState([]);

    const handleSelectedClassChange = async (e) => {
        const c = e.target.value
        setSelectedClass(c)

        setassignmentTitle('')
        setMarkingRubrics('')

        const data = await fetch(`http://127.0.0.1:5000/assignment/${c}`).then((d) => {
            return d.json()
        })

        console.log(data)

        setTitles(data)
    }

    const handleassignmentTitleChange = async (e) => {
        let t = e.target.value

        if (t === 0) {
            t = e.target.innerText
        }

        if (!t) {
            return
        }

        console.log(t)

        setassignmentTitle(t)
        setMarkingRubrics('')

        try {
            const data = await fetch(`http://127.0.0.1:5000/assignment/assignment-title/${t}`).then((d) => {
                return d.json()
            })
            if (data && data.rubrics) {
                setMarkingRubrics(data.rubrics)
            } else{
                setassignmentTitle(t)
            }

        } catch (e) {
        }
    }

    const handleMarkingRubricsChange = (e) => {
        setMarkingRubrics(e.target.value)
    }

    const createassignment = async () => {

        const students = await fetch(`http://127.0.0.1:5000/students/${selectedClass}`).then((d) => {
            return d.json()
        })

        setStudents(students)

        const assignmentData = {
            class: selectedClass,
            title: assignmentTitle, // Replace with actual state variable if different
            rubrics: markingRubrics // Replace with actual state variable if different
        };

        if (titles.includes(assignmentTitle)) {
            // Update the existing assignment rubrics
            const updateResponse = await fetch('http://127.0.0.1:5000/update_assignment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(assignmentData)
            }).then(response => response.json());



            if (updateResponse.success) {
                setAssignmentId(updateResponse.id)
                console.log('assignment updated successfully.');
            } else {
                console.error('Failed to update assignment.');
            }
        } else {
            const data = await fetch('http://127.0.0.1:5000/create_assignment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(assignmentData)
            }).then(response => response.json())


            if (data.id) {
                setAssignmentId(data.id)
            }
        }
        setIsassignmentCreated(true)
    }

    const startMarking = async () => {
        // Construct the payload
        const payload = {
            class: selectedClass,
            title: assignmentTitle,
            rubrics: markingRubrics
        };
        try {
            const response = await fetch('http://127.0.0.1:5000/start_marking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const result = await response.json();
            // Process and display the comments and grades returned from the API
            // This may involve updating state or navigating to a results page
            console.log(result);

            // You might want to update the state with the received results here
            // setGradesAndComments(result);

        } catch (error) {
            console.error('Failed to start marking:', error);
        }

    }
    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [selectedClass, assignmentTitle]); // Add dependencies if needed


    return (
        <ResponsiveContainer sx={{width: '100%', typography: 'body1', display: 'flex', height: 'full'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
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
                    onChange={handleassignmentTitleChange}
                    onInputChange={(event, newInputValue) => {
                        // Update your state with the newInputValue
                        setassignmentTitle(newInputValue);
                    }}
                    disabled={isassignmentCreated}
                    renderInput={(params) => <TextField {...params} label="Title"/>}
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
                            minRows: 3,
                            style: {resize: 'vertical'},
                        },
                    }}
                />
                {!isassignmentCreated &&
                    <Button variant="contained" sx={{mt: 2}} onClick={createassignment}>Upload Student Submissions</Button>}
                {
                    isassignmentCreated && (
                        <>
                            <List>
                                {students.map((student) => (
                                    <ListItem key={student._id}>
                                        <ListItemText primary={`${student.name} (${student.number})`}/>
                                        <Input type="file"
                                               onChange={(e) => handleFileUpload(student._id, assignmentId, e.target.files[0])}/>
                                    </ListItem>
                                ))}
                            </List>

                            <Box sx={{display: 'flex'}}>
                                <Button variant="contained" sx={{mt: 2}} onClick={startMarking}>Start Marking</Button>
                                <Button variant="outlined" sx={{mt: 2, ml: 2}} onClick={handleBack}>Back</Button>
                            </Box>
                        </>
                    )
                }
            </Box>
        </ResponsiveContainer>
    );
}

export default MarkassignmentPage;
