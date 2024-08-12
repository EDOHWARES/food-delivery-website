import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {

  const {getCartTotalAmount, cartItems, token, food_list, url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => {
      return {...prev, [name]: value};
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getCartTotalAmount()+2,
    };

    console.log(token)

    let resp = await axios.post(`${url}/api/order/place`, orderData, {headers: {token}});
    console.log(resp)
    if (resp.data.success) {
      const {session_url} = resp.data;
      window.location.replace(session_url);
    } else {
      alert('Error');
    }

  }

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-field">
          <input required onChange={handleChange} value={data.firstName} name="firstName" type="text" placeholder="First Name" />
          <input required onChange={handleChange} value={data.lastName} name="lastName" type="text" placeholder="Last Name" />
        </div>

        <input required onChange={handleChange} value={data.email} name='email' type="email" placeholder="Email Address" />
        <input required onChange={handleChange} value={data.street} name='street' type="text" placeholder="Street" />

        <div className="multi-field">
          <input required onChange={handleChange} value={data.city} name='city' type="text" placeholder="City" />
          <input required onChange={handleChange} value={data.state} name="state" type="text" placeholder="State" />
        </div>

        <div className="multi-field">
          <input required onChange={handleChange} value={data.zipcode} name='zipcode' type="text" placeholder='Zip Code' />
          <input required onChange={handleChange} value={data.country} name="country" type="text" placeholder='Country' />
        </div>

        <input required onChange={handleChange} value={data.phone} name="phone" type="text" placeholder="Phone" />

      </div>

      <div className="place-order-right">
        <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="cart-total-details-container">
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getCartTotalAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${Object.keys(cartItems).length > 0 ? 2 : 0}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${Object.keys(cartItems).length > 0 ? getCartTotalAmount() + 2 : 0}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT </button>
          </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
