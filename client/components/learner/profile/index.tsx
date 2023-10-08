import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, AlertColor, Autocomplete, Button, Snackbar, TextField, Typography } from "@mui/material";

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import { LearnerProfileUpdate } from "./update";
import { learnableTopics } from "../../../util/misc/topics";
import { LearnerProfile, LearnerProfileInputs } from "../../../util/models";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Session, SessionContext } from "../../../util/session";
import Routes from "../../../util/routes/routes";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const LearnerUpdate = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);

    const [interestedTopics, setInterestedTopics] = React.useState<Array<String>>([]);
    const [profile, setProfile] = React.useState<LearnerProfile>({} as LearnerProfile);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState<AlertColor>("info");
    const [fetched, setFetched] = React.useState(false);

    React.useEffect(() => {
        if (!session.loggedIn()) {
            nav("/login"); return;
        }
        document.title = "Update Learner Profile | QED";
        axios.get(`${Routes.STUDENT.GET}?self=true`).then((res) => {
            setProfile(res.data);
            setInterestedTopics(res.data.topics);
            console.log("Success get student:", res.data);
            setFetched(true);
        }).catch((err) => {
            console.error("Error get student:", err);
            setFetched(true);
        });
    }, []);

    const alert = (message: string, type: AlertColor): void => {
        setMessage(message);
        setType(type);
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LearnerProfileInputs>()
    const onSubmit: SubmitHandler<LearnerProfileInputs> = (data: LearnerProfileInputs) => {
        axios.put(Routes.STUDENT.PUT, {
            bio: data.bio,
            topics: interestedTopics
        }).then((res) => {
            console.log("Student put success:", res.data);

            nav("/learner");
            session.notify("Successfully saved your profile!", "success");
        }).catch((err) => {
            session.notify(`Error: ${err.response.data.error}`, "error");
        });
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setMessage("");
    };

    return fetched ? (
        <>
            <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Item sx={{ padding: "2em" }}>
                            <Typography variant="h3"><LocalLibraryIcon sx={{ fontSize: "50px", paddingBottom: "8px" }} />Learner Home</Typography>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <LearnerProfileUpdate register={register} profile={profile} />

                                <hr />

                                <Box sx={{ backgroundColor: "#c3d5ff", marginTop: "1em", padding: "1em" }}>
                                    <Typography variant="h5">Topics Interested in <strong>Learning</strong>:</Typography>
                                    <Autocomplete
                                        multiple
                                        id="topics-interested"
                                        options={learnableTopics}
                                        getOptionLabel={(option) => option}
                                        defaultValue={profile.topics}
                                        filterSelectedOptions
                                        sx={{ backgroundColor: "white", mt: "0.5em" }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label=""
                                                placeholder="I want to learn..."
                                            />
                                        )}
                                        onChange={(_, value) => {
                                            setInterestedTopics(value);
                                        }}
                                    />
                                </Box>

                                <Button
                                    variant="outlined"
                                    type="submit"
                                    sx={{ backgroundColor: "white", mt: "1.5em" }}
                                >Submit Profile!</Button>

                                <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity={type} sx={{ mt: "1.5em", width: '100%' }}>{message}</Alert>
                                </Snackbar>
                            </form>

                            {/* {searchResults.length === 0 ?
                            <>
                                <hr />
                                <Box sx={{ backgroundColor: "#ffe1e5", marginTop: "1em", padding: "1em" }}>
                                    <Typography variant="h5">Here are some mentors we've fetched for you!</Typography>
                                </Box>
                            </> :
                            <></>} */}
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    ) : <></>;
}