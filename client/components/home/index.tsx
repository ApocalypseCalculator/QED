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
                            <Typography variant="h2">
                                Who are we?
                            </Typography>
                            <Typography variant="h6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus ornare suspendisse sed nisi lacus sed. Ipsum a arcu cursus vitae congue mauris rhoncus. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Leo a diam sollicitudin tempor id eu nisl nunc. Nisi porta lorem mollis aliquam ut. Aliquet bibendum enim facilisis gravida. Lobortis scelerisque fermentum dui faucibus. Turpis in eu mi bibendum neque egestas congue quisque egestas. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Dignissim sodales ut eu sem integer vitae. Sed arcu non odio euismod lacinia at quis risus sed. Eu volutpat odio facilisis mauris sit. Iaculis eu non diam phasellus vestibulum lorem.
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            {/* </Box> */}
        </>
    );
}