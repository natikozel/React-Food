import React from "react";
import {MealProps} from "./MealCard";
import {useCartContext} from "../store/CartContext";

export interface CartItemProps {
    meal: MealProps;
}


export const CartItem = ({meal}: CartItemProps): React.JSX.Element => {

    const {addItem, removeItem} = useCartContext();
    const handleAmount = (e: any): void => {
        if (e.target.name === 'plus') {
            addItem(meal);
        } else {
            removeItem(meal.id);
        }
    };

return (
    <li className="cart-item">
        <p>{`${meal.name} - ${meal.quantity} x $${meal.price}`}</p>
        <div className="cart-item-actions">
            <button onClick={handleAmount} name={"plus"}>+</button>
            {meal.quantity}
            <button onClick={handleAmount} name={"minus"}>-</button>
        </div>
    </li>
);
}
;