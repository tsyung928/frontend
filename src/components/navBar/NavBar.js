import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Box, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ logout }) => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");
    const role = localStorage.getItem("role");
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const nonMobilePages = ["Mark Homework", "Class Performance"].filter((page) => role !== "admin");

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const mobilePages = ["Mark Homework", "Class Performance", "Profile", "Logout"].filter((page) => {
        if (role === "admin") {
            return !["Mark Homework", "Class Performance"].includes(page);
        }
        return true;
    });

    const handleMarkHomeworkClick = () => {
        console.log("Mark Homework clicked");
        if (window.location.pathname === "/markhomework") {
            navigate("/refresh");
            setTimeout(() => navigate("/markhomework"), 0);
        } else {
            navigate("/markhomework");
        }
    };

    const handleLogout = () => {
        logout();

        navigate("/");
    };

    const mobileMenuId = "primary-search-account-menu-mobile";

    return (
        <AppBar position="static">
            <Toolbar>
                {!isMobile && (
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        {nonMobilePages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: "white", display: "block" }}
                                onClick={page === "Mark Homework" ? handleMarkHomeworkClick : null}
                                component={page !== "Mark Homework" ? RouterLink : null}
                                to={`/${page.toLowerCase().replace(/ /g, "")}`}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                )}
                {isMobile && (
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                {!isMobile && (
                    <Box sx={{ flexGrow: 0, display: "flex" }}>
                        {["Profile", "Logout"].map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: "white", display: "block" }}
                                onClick={page === "Logout" ? handleLogout : null}
                                component={page !== "Logout" ? RouterLink : null}
                                to={page !== "Logout" ? `/${page.toLowerCase()}` : null}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                )}
            </Toolbar>
            {isMobile && (
                <Menu
                    anchorEl={mobileMoreAnchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    id={mobileMenuId}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={isMobileMenuOpen}
                    onClose={handleMobileMenuClose}
                >
                    {mobilePages.map((item) => (
                        <MenuItem
                            key={item}
                            onClick={() => {
                                handleMobileMenuClose();
                                if (item === "Logout") {
                                    handleLogout();
                                } else {
                                    navigate(`/${item.toLowerCase().replace(/ /g, "")}`);
                                }
                            }}
                        >
                            <Typography textAlign="center">{item}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </AppBar>
    );
};

export default Navbar;
