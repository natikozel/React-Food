import {MealProps} from "./components/MealCard";
import {log} from "./log";
import {OrderProps} from "./components/Checkout";

export const fetchAvailableMeals = async () => {
    log('<HTTP Fetch happening... />', 2, 'other');

    const response: Response = await fetch('http://localhost:4000/meals');

    if (!response.ok)
        throw new Error('Failed to fetch available meals');

    const data: Array<MealProps> = await response.json();
    return data;
};