import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Login = (): JSX.Element => {
    return (
        <>
            <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <div style={{padding: "0.5em"}}>
                                <Typography variant="h5" textAlign="left">
                                    Welcome back!
                                </Typography>
                                <Box
                                    component="form"
                                    flexDirection="column"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    marginTop="1em"
                                >
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "baseline" }}>
                                        <TextField
                                            required
                                            id="username"
                                            label="Username"
                                        />
                                        <TextField
                                            id="password"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                        />
                                        <Button variant="outlined" style={{width: "100px"}}>Login!</Button>
                                    </div>
                                </Box>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}