import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    CircularProgress,
    DialogActions,
    Button,
    Box,
    Backdrop,
} from "@mui/material";

const ViewHomework = ({ open, onClose, submissionId, name, number }) => {
    const [submission, setSubmission] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmission = async () => {
            if (!submissionId) return;

            setIsLoading(true);
            try {
                const response = await fetch(
                    `http://127.0.0.1:5000/assignment/get_homework_text_by_submissionId/${submissionId}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSubmission(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (open) {
            fetchSubmission();
        }
    }, [submissionId, open]);
    if (isLoading) {
        return (
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ borderBottom: "1px solid #e0e0e0", mb: 2, backgroundColor: "#f7f7f7" }}>
                {name} ({number})
            </DialogTitle>
            <DialogContent disable={isLoading}>
                {error && <Typography color="error">{error}</Typography>}
                {!isLoading && submission && (
                    <Typography variant="body1" sx={{ p: 2 }}>
                        {submission.homeworkText}
                    </Typography>
                )}
                {!isLoading && !submission && !error && <Typography>No submission to display.</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewHomework;
