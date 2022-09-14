/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import Navbar from "react-bootstrap/Navbar";


import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import Sweep from "./Sweep.png"
/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props 
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-dark">
            <div class="container">
                  <a class="navbar-brand" href="#">
                  <img src={Sweep} alt="Sweep" width="40" height="24"></img>
                  Your hotel management tool
                  </a>
                 </div>
                
                { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
                
            </nav>
           
            {props.children}
        </>
    );
};
