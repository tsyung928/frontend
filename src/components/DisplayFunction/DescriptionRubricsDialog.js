import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Tab, Tabs, Box, Typography, IconButton, Chip, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
});

const DescriptionRubricsDialog = ({ open, onClose, description, rubrics, title, type }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const renderTypes = (types) => {
        return (
            <Stack direction="row" spacing={1}>
                {types.map((type, index) => (
                    <Chip key={index} label={type} />
                ))}
            </Stack>
        );
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle>
                    Title : {title}
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="homework details tabs">
                            <Tab label="Description" {...a11yProps(0)} />
                            <Tab label="Rubrics" {...a11yProps(1)} />
                            <Tab label="Type" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabValue} index={0}>
                        {description}
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        {rubrics}
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        {type instanceof Array ? renderTypes(type) : type}
                    </TabPanel>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DescriptionRubricsDialog;
