import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import PubNub from "pubnub";
import data from "./data.js";


const pubnub = new PubNub({
  publishKey: "pub-c-dd3b5703-eb03-43f7-bbf2-a58261067c8f",
  subscribeKey: "sub-c-86ec8e7a-ac60-48f6-bbb5-62eb95d3f71d",
  uuid: "tchuilej7253",
});

const CartContainer = () => {
  const { clearCart } = useGlobalContext();
  const [cartItem, setCartItems] = useState([]);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [w_item, setW_item] = useState([])
  const ClearCart = () => setCartItems([])

  useEffect(() => {
    pubnub.subscribe({
      channels: ["Quentinchannel"],
    });

    pubnub.addListener({
      message: (message) => {
        console.log("Message received:", message);
        console.log(message.message);
        setScannedProduct(message.message);
      },
    });
    return () => {
      pubnub.removeListener();
      pubnub.unsubscribeAll();
    };
  }, []);
  useEffect(() => {
   if( scannedProduct ){
    console.log(scannedProduct.weight);
    if (scannedProduct.weight<0) {
      const matchingProduct = data.find(
        (product) => product.id === scannedProduct.id
      );
      if (matchingProduct) {
        // Find the index of the product in the cart
        const productIndex = cartItem.findIndex(
          (item) => item.id === matchingProduct.id
        );

        if (productIndex !== -1) {
          // If the product is in the cart, update its quantity
          const updatedCartItems = cartItem.map((item, index) => {
            if (index === productIndex) {
              return { ...item, amount: item.amount + 1 };
            }
            return item;
          });
          setCartItems(updatedCartItems);
        } else {
          // If the product is not in the cart, add it
          setCartItems([...cartItem, { ...matchingProduct, inCart: true }]);
        }
        // Reset scannedProduct to null after adding/updating the item
        setScannedProduct(null);
      }
    }
    else if (scannedProduct.weight>0){
      const matchingProduct = data.find(
        (product) => product.id === scannedProduct.id
      );
      if (matchingProduct) {
        // Find the index of the product in the cart
        const productIndex = cartItem.findIndex(
          (item) => item.id === matchingProduct.id
        );
        setCartItems([...cartItem, { ...matchingProduct, price: parseFloat((matchingProduct.price * scannedProduct.weight).toFixed(2)) }]);
        setScannedProduct(null);
    }
   }
   }
 }, [scannedProduct, cartItem]);
  useEffect(() => {
    const newTotal = cartItem.reduce(
      (acc, item) => acc + item.amount * item.price,
      0
    );
    const newAmount = cartItem.reduce((acc, item) => acc + item.amount, 0);

    setTotal(newTotal);
    setAmount(newAmount);
  }, [cartItem]);
  if (cartItem.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="shop">
      <div className="cart">
        {/* cart header */}
        <header>
          <h2>Shopping Cart</h2>
        </header>
        {/* cart items */}
        <div>
          {cartItem.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </div>
        {/* cart footer */}
        <footer>
          <hr />
          <button className="btn clear-btn" onClick={ClearCart}>
            clear cart
          </button>
        </footer>
      </div>
      <div className="cart">
        <header>
          <h2>Order Summary</h2>
        </header>
        <div className="items">
          <div>
            <h4>Number Of Items</h4>
          </div>
          <div className="num">
            <h4>{amount}</h4>
          </div>
        </div>
        <footer>
          <hr />
          <div className="cart-total">
            <h4>
              total <span>${total}</span>
            </h4>
          </div>
          <Link to="/Payment">
            <button className="btn clear-btn" onClick={clearCart}>
              Check Out
            </button>
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default CartContainer;
