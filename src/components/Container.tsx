import {Header} from "./Header";
import React from 'react';
import {MealsContainer} from "./MealsContainer";
import {log} from "../log";
import {CartContext} from "../store/CartContext";
import {UserContext} from "../store/UserContext";


export const Container = (): React.JSX.Element => {

    log('<Container /> rendered', 1);

    return (
        <UserContext>
            <CartContext>
                <Header/>
                <MealsContainer/>
            </CartContext>
        </UserContext>
    );
};

