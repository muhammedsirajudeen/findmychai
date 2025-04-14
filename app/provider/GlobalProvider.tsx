'use client'
import React from "react";
import { User } from "../model/User";
import GlobalContext from "./GlobalContext";
export default function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <GlobalContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </GlobalContext.Provider>
    );
}