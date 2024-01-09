import React, {createContext, useContext, useState} from 'react';
import {log} from "../log";

type Props = {
    children: React.JSX.Element | Array<React.JSX.Element>
}

export interface UserStateContext {
    state: string
    showCart: () => void,
    showCheckout: () => void,
    hideModal: () => void,
}

const Context: React.Context<UserStateContext> = createContext<UserStateContext>({} as UserStateContext);


export const UserContext = ({children}: Props): React.JSX.Element => {

    log('<User Context is created... />', 1, 'other');

    const [userState, setUserState]
        : [string, React.Dispatch<React.SetStateAction<string>>]
        = useState<string>('');

    const showCartModal = () => {
        setUserState('cart')
    };

    const showCheckOutModal = () => {
        setUserState('checkout')
    };


    const hideModal = () => {
        setUserState('')
    };


    const contextValue: UserStateContext = {
        state: userState,
        showCart: showCartModal,
        showCheckout: showCheckOutModal,
        hideModal
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export const useUserContext = () => useContext(Context);
