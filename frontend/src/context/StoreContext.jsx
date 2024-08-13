import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    const url = 'http://localhost:4000';
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]:1}));
        } else {
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        };

        if (token) {
            await axios.post(`${url}/api/cart/add`, {itemId}, {headers: {token}});
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}));

        if (token) {
            await axios.post(`${url}/api/cart/remove`, {itemId}, {headers: {token}});
        }
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
    };

    const fetchFoodList = async () => {
        setLoading(true);
        const resp = await axios.get(`${url}/api/food/list`);
        setFoodList(resp.data.data);
        setLoading(false);
    };

    const loadCartData = async (token) => {
        const resp = await axios.get(`${url}/api/cart/get`, {headers: {token}});
        setCartItems(resp.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
            };
        };
        
        loadData();
    }, []);

    const contextValue = {
        token,
        setToken,
        loading,
        url,
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