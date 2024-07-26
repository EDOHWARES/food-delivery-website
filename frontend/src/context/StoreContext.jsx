import { createContext, useEffect, useState } from "react";
import {food_list} from '../assets/assets';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]:1}));
        } else {
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
    };

    const getCartTotalAmount = () => {
        let totalAmount = 0;

        for(const item in cartItems) {
            if (cartItems[item] > 0) {
                let foundItem = food_list.find((food) => food._id == item )
                totalAmount += foundItem.price * cartItems[item];
            }
        };

        return totalAmount;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotalAmount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
};

export default StoreContextProvider;