import logo from '../assets/logo.jpg';
import {MealProps} from "./MealCard";
import {log} from "../log";
import {CartContextProps} from "../store/CartContext";
import {Cart} from "./Cart";
import React from "react";
import {ModalWindow} from "./ModalWindow";
import {useCartContext} from "../store/CartContext";
import {useUserContext} from "../store/UserContext";
import {Checkout} from "./Checkout";

export const Header = (): React.JSX.Element => {
    log('<Header /> rendered', 2);

    const {cart, clearCart}: CartContextProps = useCartContext();
    const {state, showCart, hideModal, showCheckout} = useUserContext();
    const itemsInCart: number = cart.reduce((total: number, item: MealProps) => total + item.quantity, 0);

    let currentModal: React.JSX.Element | null;
    let cssClasses: string = 'modal cart';

    if (state === 'cart') {
        currentModal = <Cart cart={cart} onClose={hideModal} onCheckout={showCheckout}/>;
        cssClasses = 'modal cart';
    } else if (state === 'checkout') {
        currentModal = <Checkout cart={cart} onClose={hideModal} resetCart={clearCart} onCheckout={showCheckout}/>;
        cssClasses = 'modal';
    } else {
        currentModal = null;
        cssClasses = '';
    }

    return (
        <>
            <ModalWindow
                onClose={hideModal}
                cssClasses={cssClasses}
                open={state !== ''}>
                {currentModal}
            </ModalWindow>
            <header id="main-header">
                <div id="title">
                    <img src={logo} alt="A restaurant"></img>
                    <h1>ReactFood</h1>
                </div>
                <nav>
                    <button onClick={showCart} className="text-button">Cart ({itemsInCart})</button>
                </nav>
            </header>
        </>
    );
};