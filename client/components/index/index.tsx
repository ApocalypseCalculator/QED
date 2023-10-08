import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../home";
import ButtonAppBar from "./navbar";
import { ThemeProvider } from "@mui/material";
import { textTheme } from "../../util/misc/theme";
import { Register } from "../auth/register";
import { Login } from "../auth/login";
import { LearnerHome } from "../auth/learner";

const _App = (): React.JSX.Element => {
    return (
        <ThemeProvider theme={textTheme}>
            <ButtonAppBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/learner" element={<LearnerHome />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </ThemeProvider>
    );
}

const App = (): React.JSX.Element => {
    return (
        <BrowserRouter>
            <_App />
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
