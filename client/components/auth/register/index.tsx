import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField, Typography } from "@mui/material";

import { useForm, SubmitHandler } from "react-hook-form";

type RegisterInputs = {
    username: string;
    password: string;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const Register = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterInputs>()
    const onSubmit: SubmitHandler<RegisterInputs> = (data: RegisterInputs) => {
        console.log(data);
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div style={{ padding: "0.5em", backgroundImage: "url('/static/img/learning-1.jpg')", height: "360px" }}>
                                    <Typography variant="h5" textAlign="left">
                                        Create a new account:
                                    </Typography>
                                    <Box
                                        component="div"
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
                                                sx={{ backgroundColor: "white" }}
                                                {...register("username")}
                                            />
                                            <TextField
                                                id="password"
                                                label="Password"
                                                type="password"
                                                autoComplete="current-password"
                                                sx={{ backgroundColor: "white" }}
                                                {...register("password")}
                                            />
                                            <Button
                                                variant="outlined"
                                                type="submit"
                                                style={{ width: "100px" }}
                                                sx={{ backgroundColor: "white" }}
                                            >Register!</Button>
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