import {log} from "../log";
import React, {memo} from 'react';
import {useCartContext} from "../store/CartContext";

export interface MealProps {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
    quantity: number;
}

export interface MealComponentProps {
    meal: MealProps;
}

export const MealCard = memo(({ meal}: MealComponentProps) => {
    log('<MealCard /> rendered', 3);

    const {addItem} = useCartContext()

    const handleCart = () => {
        addItem(meal)
    }

    return (
        <li className="meal-item">
            <article>
                <img src={'http://localhost:4000/' + meal.image} alt={meal.name}></img>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">${meal.price}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <button className="button" onClick={handleCart}>Add to Cart</button>
                </p>
            </article>
        </li>
    );
});