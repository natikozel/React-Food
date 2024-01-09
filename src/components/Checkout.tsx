import {log} from "../log";
import {MealProps} from "./MealCard";
import {Input} from "./UI/Input";

export const Checkout = ({cart, onClose}: any): React.JSX.Element => {

    log('<Checkout /> rendered', 4);

    const cartTotal: number = cart.reduce((accumulator: number, item: MealProps) => accumulator + (item.quantity * +item.price), 0).toFixed(2);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: ${cartTotal}</p>

            <Input label="Full Name" type="text" id="name"/>
            <Input label="E-Mail Address" type="email" id="email"/>
            <Input label="Street" type="text" id="street"/>
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city"/>
            </div>

            {/*{error && <Error title="Failed to submit order" message={error}/>}*/}

            <p className="modal-actions">
                <button className="text-button" type="button" onClick={onClose}>Close</button>
                <button className="button">Submit Order</button>
            </p>
        </form>
    );
};