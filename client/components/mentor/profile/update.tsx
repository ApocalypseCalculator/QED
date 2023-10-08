import * as React from "react";

import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material"
import { LearnerProfileInputs, MentorProfile } from "../../../util/models"
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { AccountCircle, Face } from "@mui/icons-material";

import TodayIcon from '@mui/icons-material/Today';
import PlaceIcon from '@mui/icons-material/Place';
import FaceIcon from '@mui/icons-material/Face';

export const MentorProfileUpdate = ({ register, profile }: { register: UseFormRegister<LearnerProfileInputs>, profile: MentorProfile }): JSX.Element => {
    return (
        <Box sx={{ backgroundColor: "#ebebeb", marginTop: "1em", padding: "1em" }}>
            <Typography variant="h5">Update your <strong>mentor</strong> profile:</Typography>

            <Box
                flexDirection="column"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                marginTop="1em"
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "baseline" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <TextField
                            placeholder="A little bit about me..."
                            defaultValue={profile.bio}
                            multiline
                            minRows={5}
                            label={<>Bio <FaceIcon /></>}
                            sx={{ backgroundColor: "white" }}
                            {...register("bio")}
                        />
                    </div>
                </div>
            </Box>
        </Box>
    )
}