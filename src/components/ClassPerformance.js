// import React, { useState } from "react";
// import {
//     Typography,
//     Tab,
//     Tabs,
//     Box,
//     TextField,
//     Autocomplete,
//     Paper,
//     List,
//     ListItem,
//     ListItemText,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
// } from "@mui/material";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import TabPanel from "./ClassPerformanceComponents/TabPanel";

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         "aria-controls": `simple-tabpanel-${index}`,
//     };
// }

// const SearchPastMarkings = ({ onSearch }) => {
//     const [searchTerm, setSearchTerm] = useState("");

//     return (
//         <Box sx={{ my: 4 }}>
//             <Typography variant="h6">Search Past Markings</Typography>
//             <TextField
//                 fullWidth
//                 label="Search by homework title, student name, or class"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={(e) => {
//                     if (e.key === "Enter") {
//                         onSearch(searchTerm);
//                         e.preventDefault();
//                     }
//                 }}
//                 margin="normal"
//             />
//         </Box>
//     );
// };

// const dummyAssignmentData = [
//     { name: "Assignment 1", averageGrade: 70 },
//     { name: "Assignment 2", averageGrade: 85 },
//     { name: "Assignment 3", averageGrade: 75 },
//     // ...add more assignments
// ];

// const topStudents = [
//     { name: "Student A", score: 95 },
//     { name: "Student B", score: 90 },
//     // ...add more top students
// ];

// const lowStudents = [
//     { name: "Student X", score: 50 },
//     { name: "Student Y", score: 55 },
//     // ...add more low performing students
// ];

// const ClassPerformance = () => {
//     const [value, setValue] = useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//     const [selectedClass, setSelectedClass] = useState("");
//     const dummyTypes = ["Essay", "Multiple Choice", "Project", "Oral Presentation"];

//     const [assignmentTypes, setAssignmentTypes] = useState(dummyTypes);
//     const [selectedType, setSelectedType] = useState(dummyTypes[0]);

//     const handleTypeChange = (event) => {
//         setSelectedType(event.target.value);
//         // Handle the chart update based on the selected type
//         // This is where you would integrate real API call later on
//     };

//     // Fetch average grades for selected class from API and update dummyAssignmentData
//     // fetchAverageGrades(selectedClass).then(data => setAssignmentData(data));

//     // Fetch top and low performing students for selected class from API
//     // fetchPerformance(selectedClass).then(data => { setTopStudents(data.top); setLowStudents(data.low); });

//     const handleSearch = (searchTerm) => {
//         // Perform search based on searchTerm
//         // Call an API function like fetchSearchResults(searchTerm)
//         console.log(`Search for: ${searchTerm}`);
//         // Update state based on search results
//     };

//     return (
//         <Box sx={{ width: "100%" }}>
//             <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//                 <Tabs value={value} onChange={handleChange} aria-label="class performance tabs">
//                     <Tab label="Class Performance" {...a11yProps(0)} />
//                     <Tab label="Top Performing Students" {...a11yProps(1)} />
//                     <Tab label="Students Needing Improvement" {...a11yProps(2)} />
//                     <Tab label="Search Past Markings" {...a11yProps(3)} />
//                 </Tabs>
//             </Box>
//             <TabPanel value={value} index={0}>
//                 <Typography variant="h4" gutterBottom>
//                     Class Performance
//                 </Typography>
//                 <Autocomplete
//                     options={["Class 1A", "Class 1B", "Class 2A", "Class 2B"]} // Replace with real class data from API
//                     renderInput={(params) => <TextField {...params} label="Select Class" />}
//                     value={selectedClass}
//                     onChange={(event, newValue) => {
//                         setSelectedClass(newValue);
//                         // Call API to fetch data for selected class
//                     }}
//                     fullWidth
//                     style={{ marginBottom: "20px" }}
//                 />
//                 <Paper elevation={3} sx={{ p: 2 }}>
//                     <Typography variant="h6" gutterBottom>
//                         Average Grades of Past Assignments
//                     </Typography>
//                     <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
//                         <InputLabel id="assignment-type-select-label">Assignment Type</InputLabel>
//                         <Select
//                             labelId="assignment-type-select-label"
//                             id="assignment-type-select"
//                             value={selectedType}
//                             label="Assignment Type"
//                             onChange={handleTypeChange}
//                         >
//                             {assignmentTypes.map((type, index) => (
//                                 <MenuItem key={index} value={type}>
//                                     {type}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     {/* BarChart to visualize average grades for each assignment */}
//                     <BarChart width={600} height={300} data={dummyAssignmentData} type={selectedType}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="averageGrade" fill="#82ca9d" />
//                     </BarChart>
//                     <Typography variant="body2">{/* Add comments where necessary for API integration */}</Typography>
//                 </Paper>
//             </TabPanel>

//             <TabPanel value={value} index={1}>
//                 {/* Top performing students list here */}
//                 <Paper elevation={3} sx={{ p: 2, my: 2 }}>
//                     <Typography variant="h6" gutterBottom>
//                         Top Performing Students
//                     </Typography>
//                     <List>
//                         {topStudents.map((student, index) => (
//                             <ListItem key={index}>
//                                 <ListItemText primary={student.name} secondary={`Score: ${student.score}`} />
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Paper>
//             </TabPanel>
//             <TabPanel value={value} index={2}>
//                 {/* Students needing improvement list here */}
//                 <Paper elevation={3} sx={{ p: 2, my: 2 }}>
//                     <Typography variant="h6" gutterBottom>
//                         Students Needing Improvement
//                     </Typography>
//                     <List>
//                         {lowStudents.map((student, index) => (
//                             <ListItem key={index}>
//                                 <ListItemText primary={student.name} secondary={`Score: ${student.score}`} />
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Paper>
//             </TabPanel>
//             <TabPanel value={value} index={3}>
//                 {/* Search past markings here */}
//                 <SearchPastMarkings onSearch={handleSearch} />
//             </TabPanel>
//         </Box>
//     );
// };

// export default ClassPerformance;

import React, { useState } from "react";
import { Typography, Box, Tabs, Tab } from "@mui/material";
import TabPanel from "./ClassPerformanceComponents/TabPanel";
import AverageGrades from "./ClassPerformanceComponents/AverageGrades";
import TopPerforming from "./ClassPerformanceComponents/TopPerforming";
import LowPerforming from "./ClassPerformanceComponents/LowPerforming";
import SearchPast from "./ClassPerformanceComponents/SearchPast";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ClassPerformance = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Placeholders for data that would come from an API call
    const dummyTopPerformingStudents = [
        { name: "Student A", score: 90 },
        { name: "Student B", score: 80 },
        // ...more students
    ];

    const dummyLowPerformingStudents = [
        { name: "Student X", score: 50 },
        { name: "Student Y", score: 55 },
        // ...more students
    ];

    // This function will handle the search logic
    const handleSearch = (searchTerm) => {
        // Perform search and update state with results
        console.log(`Search for: ${searchTerm}`);
        // Call API or search function here
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="class performance tabs">
                    <Tab label="Class Performance" {...a11yProps(0)} />
                    <Tab label="Top Performing Students" {...a11yProps(1)} />
                    <Tab label="Students Needing Improvement" {...a11yProps(2)} />
                    <Tab label="Search Past Markings" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AverageGrades />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TopPerforming topPerformingStudents={dummyTopPerformingStudents} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <LowPerforming lowPerformingStudents={dummyLowPerformingStudents} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <SearchPast onSearch={handleSearch} />
            </TabPanel>
        </Box>
    );
};

export default ClassPerformance;
