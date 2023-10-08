import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, AlertColor, Autocomplete, Button, Slider, Snackbar, TextField, Typography } from "@mui/material";

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import { MentorProfileUpdate } from "./update";
import { learnableTopics } from "../../../util/misc/topics";
import { MentorProfile, MentorProfileInputs, Teachable } from "../../../util/models";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Session, SessionContext } from "../../../util/session";
import Routes from "../../../util/routes/routes";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const MentorUpdate = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);

    const [profile, setProfile] = React.useState<MentorProfile>({} as MentorProfile);
    const [fetched, setFetched] = React.useState(false);
    const [interestedTopics, setInterestedTopics] = React.useState<Array<Teachable>>([]);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState<AlertColor>("info");

    React.useEffect(() => {
        document.title = "Update Mentor Profile | QED";
        axios.get(`${Routes.TEACHER.GET}?self=true`).then((res) => {
            setProfile(res.data);
            setInterestedTopics(res.data.topics);
            console.log("Success get mentor:", res.data);
            setFetched(true);
        }).catch((err) => {
            console.error("Error get mentor:", err);
            setFetched(true);
        });
    }, []);

    const alert = (message: string, type: AlertColor): void => {
        setMessage(message);
        setType(type);
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<MentorProfileInputs>()
    const onSubmit: SubmitHandler<MentorProfileInputs> = (data: MentorProfileInputs) => {
        axios.put(Routes.TEACHER.PUT, {
            bio: data.bio,
            topics: interestedTopics
        }).then((res) => {
            setProfile(res.data);
            console.log("Success put teacher:", res.data);
            session.notify("Successfully saved your profile!", "success");
            nav("/mentor");
        }).catch((err) => {
            console.error("Error put teacher:", err);
            session.notify("An error occurred while saving your profile", "error");
        });
        setInterestedTopics([...interestedTopics]);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setMessage("");
    };

    function valuetext(value: number) {
        return `${value}`;
    }

    const Rating = ({ topic, idx }: { topic: Teachable, idx: number }): JSX.Element => {
        return (
            <div
                style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
            >
                <Typography variant="h6" sx={{}}><strong>{topic.name}</strong>:</Typography>
                <Slider
                    aria-label="Rating"
                    defaultValue={topic.skill}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    sx={{ ml: "1em", mr: "1em", width: "60%" }}
                    onChange={(_, newValue): void => {
                        interestedTopics[idx].skill = newValue as number;
                    }}
                />
            </div>
        );
    }

    return fetched ? (
        <>
            <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Item sx={{ padding: "2em" }}>
                            <Typography variant="h3"><LocalLibraryIcon sx={{ fontSize: "50px", paddingBottom: "8px" }} />Mentor Home</Typography>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <MentorProfileUpdate register={register} profile={profile} />

                                <hr />

                                <Box sx={{ backgroundColor: "#c3d5ff", marginTop: "1em", padding: "1em" }}>
                                    <Typography variant="h5">Topics Interested in <strong>Teaching</strong>:</Typography>
                                    <Autocomplete
                                        multiple
                                        id="topics-interested"
                                        options={learnableTopics}
                                        getOptionLabel={(option) => option}
                                        defaultValue={"topics" in profile ? profile.topics.map((topic: Teachable): string => {
                                            return topic.name;
                                        }) : []}
                                        filterSelectedOptions
                                        sx={{ backgroundColor: "white", mt: "0.5em" }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label=""
                                                placeholder="I want to teach..."
                                            />
                                        )}
                                        onChange={(_, newTopics: Array<string>) => {
                                            let newTeachables: Array<Teachable> = newTopics.map((topic: string): Teachable => {
                                                return { name: topic, skill: 1 } as Teachable;
                                            });
                                            interestedTopics.forEach((oldTopic: Teachable) => {
                                                newTeachables.forEach((newTopic: Teachable, idx: number) => {
                                                    if (oldTopic === newTopic) {
                                                        newTeachables[idx].skill = oldTopic.skill;
                                                    }
                                                });
                                            });
                                            setInterestedTopics(newTeachables);
                                            console.log("New teachables:", newTeachables)
                                        }}
                                    />
                                    <Typography variant="h5" sx={{ mt: "1em" }}>Please rate your proficiency in each topic:</Typography>

                                    {interestedTopics.map((topic: Teachable, idx: number): JSX.Element => {
                                        return <Rating topic={topic} idx={idx} key={idx} />
                                    })}
                                </Box>

                                <Button
                                    variant="outlined"
                                    type="submit"
                                    sx={{ backgroundColor: "white", mt: "1.5em" }}
                                >Submit Profile!</Button>

                                <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity={type} sx={{ mt: "1.5em", width: '100%' }}>{message}</Alert>
                                </Snackbar>
                            </form>

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
                </Grid>
            </Box>
        </>
    ) : <></>;
}