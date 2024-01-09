import {MealCard, MealProps} from "./MealCard";
import {FetchProps, useFetch} from "../myhooks/useFetch";
import {fetchAvailableMeals} from "../http";
import {log} from "../log";
import {ErrorUI} from "./ErrorUI";
import {memo} from "react";

export interface MealsContainerProps {
    onAdd: Function;
}

export const MealsContainer = memo(() => {
    log('<MealsContainer /> rendered', 2);

    const {data, isFetching, error}: FetchProps = useFetch(fetchAvailableMeals, [] as Array<MealProps>);
    return (
        <div id="meals">
            {error && <ErrorUI err={error!}/>}
            {!error && isFetching && !data.length ?
                <p>Fetching Data...</p>
                :
                data.map((meal: MealProps) =>
                    <MealCard key={meal.id} meal={meal}/>
                )}
        </div>
    );
});