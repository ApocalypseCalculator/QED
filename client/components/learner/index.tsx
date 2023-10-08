import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, AlertColor, Autocomplete, Button, Snackbar, TextField, Typography } from "@mui/material";

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Session, SessionContext } from "../../util/session";
import { MentorResult } from "./mentorResult";
import { MentorProfile } from "../../util/models";
import Routes from "../../util/routes/routes";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const LearnerHome = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const [mentorResults, setMentorResults] = React.useState<Array<MentorProfile>>([]);

    React.useEffect(() => {
        if (!session.loggedIn()) nav("/login");
        document.title = "Learner Home | QED";

        axios.get(Routes.TEACHER.SEARCH).then((res) => {
            console.log("Success search teachers:", res.data);
            setMentorResults(res.data);
        }).catch((err) => {
            console.error("Error search teachers:", err);
        })
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Item sx={{ padding: "2em" }}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Typography variant="h3"><LocalLibraryIcon sx={{ fontSize: "50px", paddingBottom: "8px" }} />
                                    Learner Home
                                </Typography>
                                <Button variant="outlined" onClick={(ev) => {
                                    ev.preventDefault();
                                    nav("/learner/update");
                                }}>Edit Learner Profile</Button>
                            </div>

                            {mentorResults.length > 0 ?
                                <Typography variant="h6">We've fetched some potential mentors for you!</Typography> :
                                <Typography variant="h6">No available mentors yet, check back in a bit!</Typography>}

                            {mentorResults.map((profile: MentorProfile, idx: number): JSX.Element => {
                                return <MentorResult profile={profile} key={idx} ongoing={false} />;
                            })}
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Item sx={{ padding: "2em" }}>
                            {mentorResults.length > 0 ? <Typography variant="h5">Ongoing Mentorships:</Typography> :
                                <Typography variant="h5">No Ongoing Mentorships Yet.</Typography>}
                            {mentorResults.map((profile: MentorProfile, idx: number): JSX.Element => {
                                return <MentorResult profile={profile} key={idx} ongoing={true} />;
                            })}
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}