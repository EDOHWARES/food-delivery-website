import React from 'react';
import './Orders.css';
import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import { useEffect } from 'react';
import {assets} from '../../assets/assets'

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    const resp = await axios.get(`${url}/api/order/list`);

    if (resp.data.success) {
      setOrders(resp.data.data);
    } else {
      toast.error(resp.data.message);
    };
  };

  const handleStatus = async (e, orderId) => {
    const resp = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: e.target.value
    });

    if (resp.data.success) {
      await fetchAllOrder()
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.map((order, index) => {
            return (
              <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt="parcel icon" />
                <div>
                  <p className='order-item-food'>
                    {
                      order.items.map((item, index) => {
                        if (index == order.items.length - 1) {
                          return item.name+' x '+item.quantity;
                        } else {
                          return item.name+' x '+item.quantity+', '
                        }
                      })
                    }
                  </p>

                  <p className="order-item-name">
                    {order.address.firstName+' '+order.address.lastName}
                  </p>

                  <div className='order-item-address'>
                    <p>
                      {order.address.street + ', '}
                    </p>
                    <p>
                      {order.address.city + ', ' + order.address.state+', '+ order.address.country+', '+order.address.zipcode}
                    </p>
                  </div>

                  <p className='order-item-phone'>{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>${order.amount}</p>

                <select onChange={(e) => handleStatus(e, order._id)} value={order.staus}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders
