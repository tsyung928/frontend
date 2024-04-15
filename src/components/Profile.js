import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Card, CardContent, Snackbar } from "@mui/material";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [classes, setClasses] = useState([]); // Assume this will be an array of strings
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        if (storedUsername) {
            setUsername(storedUsername);
        }

        if (storedRole) {
            setRole(storedRole);
            console.log("Role:", storedRole);
            // If the role is teacher, fetch the classes they teach
            if (storedRole === "teacher") {
                // Replace with your API call to fetch classes
                fetch(`http://127.0.0.1:5000/teacher/${storedUsername}`)
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("Failed to fetch classes");
                        }
                    })
                    .then((data) => setClasses(data))
                    .catch((error) => console.error("Error:", error));
            }
        }
    }, []);
    const validateCurrentPassword = (currentPassword) => {
        console.log("Validating current password:", currentPassword);
        fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: currentPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    console.log("Password validated successfully");
                    setCurrentPasswordError("");
                } else {
                    console.log("Invalid password");
                    setCurrentPasswordError("Please enter your current password!");
                }
            });
    };

    const handleChangePassword = async () => {
        validateCurrentPassword(currentPassword);

        if (confirmPassword.trim() === "" && confirmPassword.trim() === "" && newPassword.trim() === "") {
            setPasswordMatchError("Please confirm your new password!");
            setPasswordError("Please enter a new password!");
            return;
        }

        if (newPassword.trim() === "") {
            setPasswordError("Please enter a new password!");
            return;
        }

        if (confirmPassword.trim() === "") {
            setPasswordMatchError("Please confirm your new password!");
            return;
        }

        if (!newPassword.trim() || newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setCurrentPasswordError("Passwords do not match!");
            setPasswordMatchError("Passwords do not match!");
            return;
        }

        if (newPassword === currentPassword) {
            setPasswordError("New password must be different from the current password.");
            return;
        }

        setPasswordError("");
        setPasswordMatchError("");

        try {
            const response = await fetch(`http://127.0.0.1:5000/profile/update_password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    newPassword: newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Could not update password");
            }

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Card sx={{ minWidth: 275, maxWidth: 500 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: "center" }}>
                        Profile
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.primary">
                        Username: {username}
                    </Typography>

                    {role === "teacher" && (
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Classes Teaching: {classes.join(", ")}
                        </Typography>
                    )}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Current Password"
                        type="password"
                        error={!!currentPasswordError}
                        helperText={currentPasswordError}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="New Password"
                        type="password"
                        error={!!passwordError}
                        helperText={passwordError}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm New Password"
                        type="password"
                        error={!!passwordMatchError}
                        helperText={passwordMatchError}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleChangePassword}>
                            Change Password
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Password changed successfully"
                action={
                    <Button color="info" size="small" onClick={handleCloseSnackbar}>
                        CLOSE
                    </Button>
                }
            />
        </Box>
    );
};
export default Profile;
