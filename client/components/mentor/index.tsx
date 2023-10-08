import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from "@mui/material";

import SchoolIcon from '@mui/icons-material/School';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LearnerProfile, Mentorship } from "../../util/models";
import { StudentResult } from "./studentResult";
import Routes from "../../util/routes/routes";
import { Session, SessionContext } from "../../util/session";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const MentorHome = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const [interestedStudents, setInterestedStudents] = React.useState<Array<Mentorship>>([]);

    React.useEffect(() => {
        axios.get(`${Routes.TEACHER.GET}?self=true`).then((res) => {
            console.log("Success get teacher:", res.data);
            setInterestedStudents(res.data.ongoing);
        }).catch((err) => {
            session.notify(`Error: ${err.response.data.error}`, "error");
        });
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Item sx={{ padding: "2em" }}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Typography variant="h3"><SchoolIcon sx={{ fontSize: "50px", paddingBottom: "8px" }} />
                                    Mentor Home
                                </Typography>
                                <Button variant="outlined" onClick={(ev) => {
                                    ev.preventDefault();
                                    nav("/mentor/update");
                                }}>Edit Mentor Profile</Button>
                            </div>

                            {interestedStudents.length > 0 ?
                                <Typography variant="h6">These students have expressed interest in learning from you!</Typography>
                                :
                                <Typography variant="h6">Still waiting for student responders. Check back in a bit!</Typography>}

                            {interestedStudents.map((mentorship: Mentorship): JSX.Element => {
                                return <StudentResult mentorship={mentorship} ongoing={false} />;
                            })}
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Item sx={{ padding: "2em" }}>
                            <Typography variant="h5">No Ongoing Mentorships Yet.</Typography>
                            {/* <Typography variant="h5">Ongoing Mentorships:</Typography> */}
                            {interestedStudents.map((mentorship: Mentorship): JSX.Element => {
                                return <StudentResult mentorship={mentorship} ongoing={true} />;
                            })}
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}