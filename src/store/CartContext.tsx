import React, {createContext, useContext, useReducer} from 'react';
import {log} from "../log";
import {MealProps} from "../components/MealCard";

type Props = {
    children: React.JSX.Element | Array<React.JSX.Element>
}

enum ACTION_TYPE {
    ADD_ITEM = "ADD_ITEM",
    REMOVE_ITEM = "REMOVE_ITEM",
    CLEAR_CART = "CLEAR_CART"
}

interface PayloadProps {
    item?: MealProps;
    id?: string;
}

interface ActionProps {
    type: ACTION_TYPE;
    payload?: PayloadProps;
}

export interface CartContextProps {
    cart: Array<MealProps>;
    addItem: Function;
    removeItem: Function;
    clearCart: Function;
}

const Context: React.Context<CartContextProps> = createContext<CartContextProps>({} as CartContextProps);

const reducerFunction = (state: MealProps[], action: ActionProps): MealProps[] => {
    const {type} = action;
    const newCart: Array<MealProps> = [...state];
    switch (type) {
        case ACTION_TYPE.ADD_ITEM:
            const exist: MealProps | undefined = newCart.find((item: MealProps): boolean => item.id === action.payload!.item!.id);
            const index: number = newCart.findIndex((item: MealProps): boolean => item.id === action.payload!.item!.id);
            if (!exist)
                return [...state, {...action.payload!.item!, quantity: 1}];
            else {
                newCart[index] = {
                    ...exist,
                    quantity: exist.quantity + 1
                };
                return [...newCart];
            }
        case ACTION_TYPE.REMOVE_ITEM:
            const item: MealProps = newCart.find((item: MealProps): boolean => item.id === action.payload!.id)!;
            const itemIndex: number = newCart.findIndex((item: MealProps): boolean => item.id === action.payload!.id);
            if (item.quantity > 1) {
                newCart[itemIndex] = {
                    ...item,
                    quantity: item.quantity - 1
                };
                return [...newCart];
            } else
                return [...state.filter((item: MealProps): boolean => item.id !== action.payload!.id)];
        case ACTION_TYPE.CLEAR_CART:
            return [];
    }
};


export const CartContext = ({children}: Props): React.JSX.Element => {

    log('<Cart Context is created... />', 1, 'other');

    const [state, dispatch]
        : [MealProps[], React.Dispatch<ActionProps>]
        = useReducer(reducerFunction, []);


    const handleAddItemToCart = (item: MealProps): void => {
        dispatch({
            type: ACTION_TYPE.ADD_ITEM,
            payload: {
                item
            }
        });
    };

    const handleRemoveItemFromCart = (id: string): void => {
        dispatch({
            type: ACTION_TYPE.REMOVE_ITEM,
            payload: {
                id
            }
        });
    };

    const handleResetCart = (): void => {
        dispatch({
            type: ACTION_TYPE.CLEAR_CART
        });
    };

    const contextValue: CartContextProps = {
        cart: state,
        addItem: handleAddItemToCart,
        removeItem: handleRemoveItemFromCart,
        clearCart: handleResetCart
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export const useCartContext = () => useContext(Context);
