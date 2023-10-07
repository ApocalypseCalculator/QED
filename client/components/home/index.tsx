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
    textAlign: 'center',
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
            <div className="jumbotron" style={{padding: "1em"}}>
                <h2 className="display-4">Wanna learn something?</h2>
                <h1 className="display-1">Meet <strong>QED</strong></h1>
                <h2 className="display-3">It's already been proven.</h2>

                {/* <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </p> */}

                <img src="/static/img/learning-1.jpg" width="100%"></img>
                <Button 
                    variant="contained" 
                    sx={{marginTop: "2em", marginBottom: "2em"}} 
                    onClick={() => nav("/register")}
                >Get started now!</Button>
            </div>
            {/* </Box> */}
        </>
    );
}