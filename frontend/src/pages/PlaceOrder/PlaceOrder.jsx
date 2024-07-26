import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {

  const {getCartTotalAmount, cartItems} = useContext(StoreContext);

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-field">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />

        <div className="multi-field">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>

        <div className="multi-field">
          <input type="text" placeholder='Zip Code' />
          <input type="text" placeholder='Country' />
        </div>

        <input type="text" placeholder="Phone" />

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
            <button>PROCEED TO PAYMENT </button>
          </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
