import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function ButtonAppBar() {
    const nav: NavigateFunction = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "purple" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                            <MenuBookIcon />
                        </Link>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: "none", color: "yellow" }}>QED</Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/learner" style={{ textDecoration: "none", color: "white" }}>Learner Home</Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/mentor" style={{ textDecoration: "none", color: "white" }}>Mentor Home</Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/news" style={{ textDecoration: "none", color: "white" }}>News</Link>
                    </Typography>
                    <Button color="inherit" onClick={() => nav("/login")}>Login</Button>
                    <Button color="inherit" onClick={() => nav("/register")}>Register</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}