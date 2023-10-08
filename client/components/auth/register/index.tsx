import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, InputAdornment, TextField, Typography } from "@mui/material";

import { useForm, SubmitHandler } from "react-hook-form";
import { AccountCircle } from "@mui/icons-material";

import PlaceIcon from '@mui/icons-material/Place';
import BadgeIcon from '@mui/icons-material/Badge';
import LockIcon from '@mui/icons-material/Lock';
import { RegisterInputs } from "../../../util/models";
import { Session, SessionContext } from "../../../util/session";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Routes from "../../../util/routes/routes";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const Register = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const nav: NavigateFunction = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterInputs>();
    const onSubmit: SubmitHandler<RegisterInputs> = (data: RegisterInputs) => {
        axios.post(Routes.AUTH.REGISTER, {
            ...data
        }).then((res) => {
            console.log("Success register:", res.data);
            nav('/login');
        }).catch((err) => {
            session.notify(`Error: ${err.response.data.error}`, "error");
        });
    }

    React.useEffect(() => {
        if (session.loggedIn()) nav('/learner');
        else document.title = "Login | QED";
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div style={{ padding: "0.5em", backgroundImage: "url('/static/img/learning-1.jpg')", height: "fit-content" }}>
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
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BadgeIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextField
                                                id="password"
                                                label="Password"
                                                type="password"
                                                autoComplete="current-password"
                                                sx={{ backgroundColor: "white" }}
                                                {...register("password")}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                <TextField
                                                    required
                                                    id="firstname"
                                                    label="First Name"
                                                    sx={{ backgroundColor: "white" }}
                                                    {...register("firstname")}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AccountCircle />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <TextField
                                                    required
                                                    id="lastname"
                                                    label="Last Name"
                                                    sx={{ backgroundColor: "white" }}
                                                    {...register("lastname")}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AccountCircle />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </div>
                                            <TextField
                                                required
                                                id="age"
                                                type="number"
                                                label="Age"
                                                sx={{ backgroundColor: "white" }}
                                                {...register("age")}
                                            />
                                            <TextField
                                                id="age"
                                                label="Location"
                                                sx={{ backgroundColor: "white" }}
                                                {...register("location")}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PlaceIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
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