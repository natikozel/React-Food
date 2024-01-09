import {CartItem} from "./CartItem";
import {log} from "../log";
import {MealProps} from "./MealCard";
import React from "react";
import {useUserContext} from "../store/UserContext";

export const Cart = ({cart, onClose, onCheckout}: any): React.JSX.Element => {
    log('<Cart /> rendered', 3);

    const total: string = cart.reduce((accumulator: number, item: MealProps) => accumulator + (item.quantity * +item.price), 0).toFixed(2);


    return (
        <>
            <h2>Your Cart</h2>
            <ul>
                {cart.map((item: any) =>
                    <CartItem key={item.id} meal={item}/>
                )}
            </ul>

            <p className="cart-total">${total}</p>
            <p className="modal-actions">
                <button onClick={onClose} className="text-button">Close</button>
                <button onClick={onCheckout} className="button">Go to Checkout</button>
            </p>
        </>
    );
};