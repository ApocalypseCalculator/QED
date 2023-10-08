import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const Home = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    React.useEffect(() => {
        document.title = "About Us | QED";
    }, []);

    return (
        <>
            {/* <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Item>
                            <Typography variant="h2">
                                Wanna learn something?
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Item>
                            <img src="/static/img/learning-1.jpg" width="20%"></img>
                        </Item>
                    </Grid>
                </Grid>
            </Box> */}
            {/* <Box sx={{backgroundColor: "lightpurple"}}> */}
            <div className="jumbotron" style={{ margin: "1.5em", paddingLeft: "1em", paddingTop: "1em", backgroundImage: "url('/static/img/learning-1-blurred.jpg')", height: "1000px", backgroundRepeat: "no-repeat" }}>
                <h2 className="display-4">Wanna learn something?</h2>
                <h1 className="display-1">Meet <strong>QED</strong></h1>
                <h2 className="display-3"><em>It's already been proven.</em></h2>

                {/* <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </p> */}

                {/* <img src="/static/img/learning-1.jpg" width="90%" style={{ margin: "1em" }}></img> */}
                <Button
                    variant="contained"
                    sx={{ marginTop: "2em" }}
                    onClick={() => nav("/register")}
                >Get started now!</Button>
            </div>

            <Box sx={{ flexGrow: 1, margin: "1.5em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item sx={{ padding: "2em" }}>
                            <Typography variant="h2" id="about">
                                Who are we?
                            </Typography>
                            <Typography variant="h6">
                                On this platform, anyone could create a learner and/or a mentor profile. For each subject a mentor wishes to help someone in, they can rate their own skill. Learners will then get a generated list of mentors who match their criteria (e.g. location, proficiency, etc), which they can then choose mentors from and send requests to the mentors. Mentors will have a feed of these requests to work with. Initial arrangements (including possible compensation) can be done through the platform via a text chat, and they can further communicate using text, video, or meet up in person.
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            {/* </Box> */}
        </>
    );
}