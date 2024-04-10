import React, { useState, useEffect } from "react";
import { Typography, Box, Tabs, Tab, TextField, MenuItem } from "@mui/material";
import TabPanel from "./ClassPerformanceComponents/TabPanel";
import AverageGrades from "./ClassPerformanceComponents/AverageGrades";
import TopPerforming from "./ClassPerformanceComponents/TopPerforming";
import LowPerforming from "./ClassPerformanceComponents/LowPerforming";
import SearchPast from "./ClassPerformanceComponents/SearchPast";
import { ResponsiveContainer } from "recharts";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ClassPerformance = () => {
    const [value, setValue] = useState(0);
    const teacherUsername = localStorage.getItem("username");
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/teacher/${teacherUsername}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch classes");
                }
            })
            .then((data) => {
                // Set classes data
                setClasses(data);
                setSelectedClass(data[0]); // Assuming 'classId' is the attribute you want to use
                console.log("Classes:", data);
                // Check if the data array is not empty and if selectedClass is not already set
                // if (data.length > 0 && !selectedClass) {
                //     setSelectedClass(data[0]); // Assuming 'classId' is the attribute you want to use
                // }
            })
            .catch((error) => console.error("Error:", error));
    }, [teacherUsername]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSelectedClassChange = async (event) => {
        console.log("Selected class:", event.target.value);
        setSelectedClass(event.target.value);
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
        <ResponsiveContainer>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "90%",
                    mx: 8,
                    my: 2,
                }}
            >
                <Tabs value={value} onChange={handleChange} aria-label="class performance tabs">
                    <Tab label="Dashbaord" {...a11yProps(0)} />
                    <Tab label="Student List" {...a11yProps(1)} />
                </Tabs>

                <TextField
                    select
                    label="Class"
                    value={selectedClass}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleSelectedClassChange}
                >
                    {classes.map((className) => (
                        <MenuItem key={className} value={className}>
                            {className}
                        </MenuItem>
                    ))}
                </TextField>
                <TabPanel value={value} index={0}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 2, // This adds space between the child elements
                        }}
                    >
                        {/* AverageGrades on the left, we allow it to grow but also have a maximum width */}
                        <Box sx={{ flexGrow: 1, flexBasis: "0", maxWidth: "calc(50% - 2px)" }}>
                            <AverageGrades selectedClass={selectedClass} />
                        </Box>

                        {/* This Box acts as a container for the right side elements */}
                        <Box sx={{ flexGrow: 1, flexBasis: "0", maxWidth: "calc(50% - 2px)" }}>
                            {/* TopPerforming at the top right */}
                            <Box sx={{ flexGrow: 1 }}>
                                <TopPerforming selectedClass={selectedClass} />
                            </Box>

                            {/* LowPerforming at the bottom right */}
                            <Box sx={{ flexGrow: 1, mt: 2 }}>
                                {" "}
                                {/* Adding margin top for spacing */}
                                <LowPerforming selectedClass={selectedClass} />
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SearchPast selectedClass={selectedClass} />
                </TabPanel>
            </Box>
        </ResponsiveContainer>
    );
};

export default ClassPerformance;
