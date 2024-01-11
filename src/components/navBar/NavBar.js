import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Box, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMarkHomeworkClick = () => {
        // This will force a re-render of the MarkHomework component
        console.log('Mark Homework clicked');
        if (window.location.pathname === '/markhomework') {
            navigate('/refresh');
            setTimeout(() => navigate('/markhomework'), 0);
        } else {
            navigate('/markhomework');
        }
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {['Mark Homework', 'Class Performance', 'Profile', 'Logout'].map((item) => (
                <MenuItem key={item} onClick={handleMobileMenuClose} component={RouterLink} to={`/${item.toLowerCase().replace(/ /g, '')}`}>
                    <Typography textAlign="center">{item}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                {!isMobile && (
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {['Mark Homework', 'Class Performance'].map((page) => {

                            return (
                                <Button
                                    key={page}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={page === 'Mark Homework' ? handleMarkHomeworkClick : null}
                                    component={page !== 'Mark Homework' ? RouterLink : null}
                                    to={`/${page.toLowerCase().replace(/ /g, '')}`}
                                >
                                    {page}
                                </Button>
                            );
                        })}
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
                    <Box sx={{ flexGrow: 0, display: 'flex' }}>
                        {['Profile', 'Logout'].map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                component={RouterLink}
                                to={`/${page.toLowerCase()}`}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                )}
            </Toolbar>
            {isMobile && renderMobileMenu}
        </AppBar>
    );
};

export default Navbar;
