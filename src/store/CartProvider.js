import CartContext from "./cart-context";
import { useReducer } from "react";

const INITIAL_STATE = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            {
                const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
                const exisitingCardItemIndex = state.items.findIndex(item => item.id === action.payload.id);

                const existingCartItem = state.items[exisitingCardItemIndex];
                let updatedItem;
                let updatedItems;
                if (existingCartItem) {
                    updatedItem = {
                        ...existingCartItem,
                        amount: existingCartItem.amount + action.payload.amount
                    }
                    updatedItems = [...state.items]
                    updatedItems[exisitingCardItemIndex] = updatedItem;
                } else {

                    updatedItem = { ...action.payload }
                    updatedItems = state.items.concat(updatedItem);
                }

                return { items: updatedItems, totalAmount: updatedTotalAmount }
            }

        case 'REMOVE':
            {
                const exisitingCardItemIndex = state.items.findIndex(item => item.id === action.payload);
                const existingCartItem = state.items[exisitingCardItemIndex];

                const updatedTotalAmount = state.totalAmount - existingCartItem.price;
                let updatedItems;
                if (existingCartItem.amount === 1) {
                    updatedItems = state.items.filter(item => item.id !== action.payload);
                } else {
                    const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
                    updatedItems = [...state.items]
                    updatedItems[exisitingCardItemIndex] = updatedItem;
                }


                return { items: updatedItems, totalAmount: updatedTotalAmount }
            }

        case "CLEAR":
            return INITIAL_STATE;

        default:
            return state;
    }
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, INITIAL_STATE);

    const addItemToCartHander = (item) => {
        dispatchCartAction({ type: 'ADD', payload: item });
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', payload: id });
    }

    const removeAllItemsCartHander = () => {
        dispatchCartAction({ type: 'CLEAR', payload: null });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHander,
        removeItem: removeItemFromCartHandler,
        removeAll: removeAllItemsCartHander
    };
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;