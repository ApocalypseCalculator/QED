import { default as axios } from "axios";

import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { LearnerProfile, Mentorship } from "../../../util/models";
import Routes from "../../../util/routes/routes";

export const StudentResult = ({ mentorship, ongoing }: { mentorship: Mentorship, ongoing: boolean }): JSX.Element => {
    return (ongoing !== (mentorship.starttime === 0)) ? (
        <Box sx={{ backgroundColor: "lightgray", margin: "1em", padding: "1em" }}>
            <Typography variant="h5">{`${mentorship.target.firstname} ${mentorship.target.lastname}`}</Typography>
            <Typography variant="h6">Wants to learn: <strong>{mentorship.topic}</strong></Typography>
            {/* <Typography variant="body1">User biography: {mentorship.target.bio}</Typography> */}
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Button variant="contained" sx={{ mt: "0.75rem" }} onClick={(ev) => {
                    ev.preventDefault();
                    axios.post(Routes.TEACHER.HANDLEREQ, {
                        target: mentorship.target.userid,
                    }).then((res) => {
                        console.log("Successfully responded:", res.data);
                    }).catch((err) => {
                        console.error("Error responding:", err);
                    });
                }}>Accept and Begin Mentorship!</Button>
                <Button variant="outlined" sx={{ mt: "0.75rem" }} onClick={(ev) => {
                    ev.preventDefault();
                    axios.post(Routes.TEACHER.HANDLEREQ, {
                        target: mentorship.target.userid,
                    }).then((res) => {
                        console.log("Successfully responded:", res.data);
                    }).catch((err) => {
                        console.error("Error responding:", err);
                    });
                }}>Reject Request</Button>
            </div>
        </Box>
    ) : <></>;
}