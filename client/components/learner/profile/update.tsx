import * as React from "react";

import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material"
import { LearnerProfile, LearnerProfileInputs } from "../../../util/models"
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { AccountCircle, Face } from "@mui/icons-material";

import FaceIcon from '@mui/icons-material/Face';

export const LearnerProfileUpdate = ({ register, profile }: { register: UseFormRegister<LearnerProfileInputs>, profile: LearnerProfile }): JSX.Element => {
    return (
        <Box sx={{ backgroundColor: "#ebebeb", marginTop: "1em", padding: "1em" }}>
            <Typography variant="h5">Update your <strong>learner</strong> profile:</Typography>

            <Box
                flexDirection="column"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                marginTop="1em"
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "baseline" }}>
                    <TextField
                        placeholder="A little bit about me..."
                        defaultValue={(profile && ("bio" in profile)) ? profile.bio : ""}
                        multiline
                        minRows={5}
                        label={<>Bio <FaceIcon /></>}
                        sx={{ backgroundColor: "white" }}
                        {...register("bio")}
                    />
                </div>
            </Box>
        </Box>
    )
}