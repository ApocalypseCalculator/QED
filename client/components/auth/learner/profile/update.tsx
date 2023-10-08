import * as React from "react";

import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material"
import { LearnerProfileInputs } from "../../../../util/models"
import { useForm, SubmitHandler } from "react-hook-form";
import { AccountCircle, Face } from "@mui/icons-material";

import TodayIcon from '@mui/icons-material/Today';
import PlaceIcon from '@mui/icons-material/Place';
import FaceIcon from '@mui/icons-material/Face';

export const LearnerProfileUpdate = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LearnerProfileInputs>()
    const onSubmit: SubmitHandler<LearnerProfileInputs> = (data: LearnerProfileInputs) => {
        console.log(data);
    }

    return (
        <Box sx={{ backgroundColor: "#ebebeb", marginTop: "1em", padding: "1em" }}>
            <Typography variant="h5">Update your <strong>learner</strong> profile:</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                                required
                                id="firstname"
                                label="First Name"
                                sx={{ backgroundColor: "white" }}
                                {...register("firstname")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                required
                                id="lastname"
                                label="Last Name"
                                sx={{ backgroundColor: "white" }}
                                {...register("lastname")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <TextField
                            required
                            id="age"
                            label="Age"
                            sx={{ backgroundColor: "white" }}
                            {...register("age")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TodayIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id="age"
                            label="Location"
                            sx={{ backgroundColor: "white" }}
                            {...register("location")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PlaceIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            placeholder="A little bit about me..."
                            multiline
                            minRows={5}
                            label={<>Bio <FaceIcon /></>}
                            sx={{ backgroundColor: "white" }}
                            {...register("bio")}
                        />
                        <Button
                            variant="outlined"
                            type="submit"
                            sx={{ backgroundColor: "white" }}
                        >Submit Profile!</Button>
                    </div>
                </Box>
            </form>
        </Box>
    )
}