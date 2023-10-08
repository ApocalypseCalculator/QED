import * as React from "react";
import { default as axios } from "axios";

import { User } from "../models";
import jwt_decode from "jwt-decode";
import { AlertColor } from "@mui/material";

export type Session = {
    user: User;
    setUser: (newUser: User) => void;
    token: string;
    setToken: (newToken: string) => void;
    loggedIn: () => boolean;

    message: string;
    setMessage: (newMessage: string) => void;
    type: AlertColor;
    setType: (newType: AlertColor) => void;
    notify: (message: string, type: AlertColor) => void;
}

export const SessionContext = React.createContext<Session>({} as Session);

export const SessionProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
    const [user, setUser] = React.useState({} as User);
    const [token, setToken] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState<AlertColor>("info");

    React.useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            const decodedUser: User = jwt_decode(storedToken);
            setUser(decodedUser);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }, [token]);

    const loggedIn = (): boolean => {
        return !!token;
    }

    const notify = (message: string, type: AlertColor): void => {
        setMessage(message);
        setType(type);
    }

    return (
        <SessionContext.Provider value={{
            user: user,
            setUser: setUser,
            token: token,
            setToken: setToken,
            loggedIn: loggedIn,
            type: type,
            setType: setType,
            message: message,
            setMessage: setMessage,
            notify: notify
        }}>
            {children}
        </SessionContext.Provider>
    )
}