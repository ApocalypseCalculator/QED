import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, Autocomplete, Button, TextField, Typography } from "@mui/material";

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import { LearnerProfileUpdate } from "./profile/update";
import { learnableTopics } from "../../../util/misc/topics";
import { MentorProfile } from "../../../util/models";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const LearnerHome = (): JSX.Element => {
    const [searchResults, setSearchResults] = React.useState<Array<MentorProfile>>([]);

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Item sx={{ padding: "2em" }}>
                            <Typography variant="h3"><LocalLibraryIcon sx={{ fontSize: "50px", paddingBottom: "8px" }} />Learner Home</Typography>
                            <LearnerProfileUpdate />

                            <hr />

                            <Box sx={{ backgroundColor: "#c3d5ff", marginTop: "1em", padding: "1em" }}>
                                <Typography variant="h5">Topics Interested in Learning:</Typography>
                                <Autocomplete
                                    multiple
                                    id="topics-interested"
                                    options={learnableTopics}
                                    getOptionLabel={(option) => option}
                                    defaultValue={[]}
                                    filterSelectedOptions
                                    sx={{ backgroundColor: "white", mt: "0.5em" }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label=""
                                            placeholder="Topics I Am Interested In..."
                                        />
                                    )}
                                />
                                <Button variant="contained" sx={{ mt: "0.75em", mb: "0.75em" }} onClick={(ev) => {
                                    ev.preventDefault();

                                }}>Save</Button>

                                <Alert severity="success">This is a success message!</Alert>
                            </Box>

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
                    <Grid item xs={12} sm={4}>
                        <Item sx={{ padding: "2em" }}>
                            <Typography variant="h5">Ongoing Mentorships:</Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>

        </>
    );
}