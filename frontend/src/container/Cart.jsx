import React, { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";



function Cart() {
    const navigate = useNavigate();

    // Cart items state
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Furniture Set",
            color: "Coffee",
            qty: 4,
            price: 437,
            img: "https://i.pinimg.com/736x/30/91/38/309138f530b79565f13a43fa0647ed46.jpg"
        },
        {
            id: 2,
            name: "Vintage Dining Set",
            color: "Brown",
            qty: 2,
            price: 945,
            img: "https://i.pinimg.com/736x/5a/34/90/5a3490e0873e9c85a55bfc75ed1c04ef.jpg"
        }
    ]);


    // Increase quantity
    const increaseQty = (id) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
    };

    // Decrease quantity
    const decreaseQty = (id) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 } : item));
    };

    // Delete item
    const deleteItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Calculate subtotal
    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // Example discount 10%
    const discount = subTotal * 0.1;

    // Delivery fee
    const deliveryFee = 50;

    // Grand total
    const total = subTotal - discount + deliveryFee;

    return (
        <section className="z_cart_section">
            <div className="a_header_container">
                <h2 className="z_cart_heading">Shopping Cart</h2>

                <div className="row z_cart_main">

                    {/* LEFT CART TABLE */}
                    <div className="col-lg-8 col-md-12">
                        <div className="z_cart_table_wrapper">
                            <div className="z_cart_table">
                                {/* HEADER */}
                                <div className="z_cart_table_head">
                                    <span>Product Code</span>
                                    <span>Quantity</span>
                                    <span>Total</span>
                                    <span>Action</span>
                                </div>

                                {/* ITEMS */}
                                {cartItems.map(item => (
                                    <div key={item.id} className="z_cart_row">
                                        <div className="z_cart_product">
                                            <img src={item.img} alt={item.name} />
                                            <div>
                                                <h6>{item.name}</h6>
                                                <p>Set : Colour {item.color}</p>
                                            </div>
                                        </div>

                                        <div className="z_cart_qty">
                                            <button onClick={() => decreaseQty(item.id)}>-</button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => increaseQty(item.id)}>+</button>
                                        </div>

                                        <div className="z_cart_price">${item.price * item.qty}</div>

                                        <button className="z_cart_delete" onClick={() => deleteItem(item.id)}>
                                            <RiDeleteBin6Fill size={22} style={{ color: "rgb(218 65 65)" }} />
                                        </button>
                                    </div>
                                ))}

                                {/* UPDATE BUTTON */}
                                <button className="z_cart_update">Update Cart</button>
                            </div>
                        </div>
                    </div>


                    {/* RIGHT SUMMARY */}
                    <div className="col-lg-4 col-md-12">
                        <div className="z_cart_summary">
                            <h5>Order Summary</h5>

                            <div className="z_cart_coupon">
                                <input type="text" placeholder="Discount voucher" />
                                <button>Apply</button>
                            </div>

                            <div className="z_cart_summary_row">
                                <span>Sub Total</span>
                                <span>${subTotal.toFixed(2)} USD</span>
                            </div>

                            <div className="z_cart_summary_row">
                                <span>Discount (10%)</span>
                                <span>- ${discount.toFixed(2)} USD</span>
                            </div>

                            <div className="z_cart_summary_row">
                                <span>Delivery fee</span>
                                <span>${deliveryFee.toFixed(2)} USD</span>
                            </div>

                            <div className="z_cart_summary_row z_cart_grand">
                                <span>Total</span>
                                <span>${total.toFixed(2)} USD</span>
                            </div>

                            <p className="z_cart_note">
                                90 Day Limited Warranty against manufacturer's defects
                            </p>

                            <button
                                className="z_cart_checkout"
                                onClick={() =>
                                    navigate("/checkout", {
                                        state: {
                                            cartItems,
                                            subTotal,
                                            discount,
                                            deliveryFee,
                                            total,
                                        },
                                    })
                                }
                            >
                                Checkout Now
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Cart;
