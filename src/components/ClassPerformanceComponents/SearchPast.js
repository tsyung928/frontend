import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";

const SearchPast = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchKeyPress = (event) => {
        if (event.key === "Enter") {
            onSearch(searchTerm);
            event.preventDefault();
        }
    };

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h6">Search Past Markings</Typography>
            <TextField
                fullWidth
                label="Search by homework title, student name, or class"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
                margin="normal"
            />
        </Box>
    );
};

export default SearchPast;
