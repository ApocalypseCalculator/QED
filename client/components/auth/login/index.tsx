import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField, Typography } from "@mui/material";

import { useForm, SubmitHandler } from "react-hook-form";

type LoginInputs = {
    username: string;
    password: string;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Login = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginInputs>()
    const onSubmit: SubmitHandler<LoginInputs> = (data: LoginInputs) => {
        console.log(data);
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div style={{padding: "0.5em"}}>
                                    <Typography variant="h5" textAlign="left">
                                        Welcome back!
                                    </Typography>
                                    <Box
                                        flexDirection="column"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        marginTop="1em"
                                    >
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "baseline" }}>
                                            <TextField
                                                required
                                                id="username"
                                                label="Username"
                                                {...register("username")}
                                            />
                                            <TextField
                                                id="password"
                                                label="Password"
                                                type="password"
                                                autoComplete="current-password"
                                                {...register("password")}
                                            />
                                            <Button 
                                                variant="outlined" 
                                                type="submit"
                                                style={{width: "100px"}}
                                            >Login!</Button>
                                        </div>
                                    </Box>
                                </div>
                            </form>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}