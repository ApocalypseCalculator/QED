import { Box, Button, Typography } from "@mui/material";
import * as React from "react";

import { MentorProfile, Teachable } from "../../../util/models";
import { default as axios } from "axios";
import Routes from "../../../util/routes/routes";

const getProficiency = (profile: MentorProfile, topic: string): number => {
    let result = 0;
    profile.topics.forEach((curTopic: Teachable) => {
        if (topic === curTopic.name) {
            result = curTopic.skill;
        }
    });
    return result;
}

export const MentorResult = ({ profile, ongoing }: { profile: MentorProfile, ongoing: boolean }): JSX.Element => {
    return (!ongoing !== ("ongoing" in profile)) ? (
        <Box sx={{ backgroundColor: "lightgray", margin: "1em", padding: "1em" }}>
            <Typography variant="h5"><strong>{`${profile.firstname} ${profile.lastname}`}</strong></Typography>
            {profile.topics.map((topic: Teachable, idx: number): JSX.Element => {
                return <Typography variant="h6" key={idx}>Proficiency at teaching {topic.name}: <strong>{topic.skill}/10</strong></Typography>;
            })}
            <Typography variant="body1">User biography: {profile.bio}</Typography>
            {(!ongoing) && <Button variant="contained" sx={{ mt: "0.75rem" }} onClick={(ev) => {
                ev.preventDefault();
                axios.post(Routes.TEACHER.REQUEST, {
                    target: profile.userid,
                    topic: profile.recommended
                }).then((res) => {
                    console.log("Successfully requested:", res.data);
                }).catch((err) => {
                    console.error("Error requesting:", err);
                });
            }}>Request Mentorship!</Button>}
            {/* {ongoing && <Typography variant="body1">Start date: {new Date(profile.ongoing.starttime).toDateString()}</Typography>} */}
        </Box>
    ) : <></>;
}