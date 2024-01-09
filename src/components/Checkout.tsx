import {log} from "../log";
import {MealProps} from "./MealCard";
import {Input} from "./UI/Input";
import {ErrorUI} from "./ErrorUI";
import {usePost} from "../myhooks/usePost";

export interface OrderProps {

}

export const Checkout = ({cart, onClose, resetCart}: any): React.JSX.Element => {

    log('<Checkout /> rendered', 4);


    const {sendRequest, data, error, isLoading} = usePost('http://localhost:4000/orders', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const cartTotal: number = cart.reduce((accumulator: number, item: MealProps) => accumulator + (item.quantity * +item.price), 0).toFixed(2);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const fd = new FormData(e.target);
        const newOrder = {
            items: cart,
            customer: Object.fromEntries(fd.entries())
        };
        sendRequest(newOrder);
        resetCart();
    };

    let actions = (
        <>
            <button className="text-button" type="button" onClick={onClose}>Close</button>
            <button className="button">Submit Order</button>
        </>
    );
    if (isLoading)
        actions = <span>Sending order data...</span>;

    if (data && !error) {
        return (
            <>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>
                    We will get back to you with more details via email within the next
                    few minutes.
                </p>
                <p className="modal-actions">
                    <button onClick={onClose}>Okay</button>
                </p>
            </>
        );
    }


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

            {error && <ErrorUI title="Failed to submit order" err={error}/>}

            <p className="modal-actions">
                {actions}
            </p>
        </form>
    );
};