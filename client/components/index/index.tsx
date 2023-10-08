import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../home";
import ButtonAppBar from "./navbar";
import { Alert, Snackbar, ThemeProvider } from "@mui/material";
import { textTheme } from "../../util/misc/theme";
import { Register } from "../auth/register";
import { Login } from "../auth/login";
import { LearnerUpdate } from "../learner/profile";
import { LearnerHome } from "../learner";
import { MentorHome } from "../mentor";
import { MentorUpdate } from "../mentor/profile";
import { Session, SessionContext, SessionProvider } from "../../util/session";
import { LoginRequired } from "../../util/misc/loginRequired";

const _App = (): React.JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        session.setMessage("");
    };
    return (
        <ThemeProvider theme={textTheme}>
            <ButtonAppBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/learner" element={<LoginRequired><LearnerHome /></LoginRequired>} />
                <Route path="/learner/update" element={<LoginRequired><LearnerUpdate /></LoginRequired>} />

                <Route path="/mentor" element={<LoginRequired><MentorHome /></LoginRequired>} />
                <Route path="/mentor/update" element={<LoginRequired><MentorUpdate /></LoginRequired>} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Snackbar open={!!session.message} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={session.type} sx={{ mt: "1.5em", width: '100%' }}>{session.message}</Alert>
            </Snackbar>
        </ThemeProvider>
    );
}

const App = (): React.JSX.Element => {
    return (
        <SessionProvider>
            <BrowserRouter>
                <_App />
            </BrowserRouter>
        </SessionProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
