import React from "react";
import UsersFilteringProvider from "providers/users-filtering-provider";
import { Route } from "react-router-dom";
import { Map } from "./components/map/Map"
import { Form } from "./components/form/Form"

export const MusiciansFinder = () => {

    return (
        <UsersFilteringProvider>
            <Route exact path="/map">
                <Map />
            </Route>
            <Route exact path="/form">
                <Form />
            </Route>
        </UsersFilteringProvider>
    )
}