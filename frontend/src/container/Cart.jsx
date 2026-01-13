import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import wishEmptyImg from "../img/image.png";

function Cart() {
  const navigate = useNavigate();

  // Cart items state
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("Please login to continue");
        navigate("/login");
        return;
      }
      try {
        console.log("Cart fetched:");
        const res = await axios.get("http://localhost:5000/api/cart",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Cart fetched:", res.data.items);
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  // Update quantity
  const updateQty = async (id, qty) => {
    try {
      const res = await axios.put("http://localhost:5000/api/cart/update", { productId: id, qty });
      console.log("Updated quantity response:", res.data.items);
      setCartItems(res.data.items);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const increaseQty = (id, currentQty) => {
    updateQty(id, currentQty + 1);
  };

  const decreaseQty = (id, currentQty) => {
    if (currentQty > 1) updateQty(id, currentQty - 1);
  };

  // Remove item
  const deleteItem = async (id) => {
    console.log(id, "id");

    try {
      const res = await axios.delete(`http://localhost:5000/api/cart/remove/${id}`);
      console.log("Delete response:", res.data.items);
      setCartItems(res.data.items);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };
  const getImageUrl = (img) => {
    if (!img) return wishEmptyImg; // fallback
    if (img.startsWith("http")) return img;
    return `http://localhost:5000${img}`;
  };

  // Totals
  const subTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = subTotal * 0.1;
  const deliveryFee = 50;
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
                {cartItems.map((item) => (
                  <div key={item.id} className="z_cart_row">
                    <div className="z_cart_product">
                      <img
                        src={getImageUrl(item.product.images[0])}
                        alt={item.product.title}
                        className="d_product-img"
                        onClick={() => navigate(`/product/${item.product._id}`)}
                      />
                      {/* <img src={item.product.images[0]} alt={item.name} /> */}
                      <div>
                        <h6>{item.product.title}</h6>
                        <p>Set : Colour {item.colors}</p>
                      </div>
                    </div>

                    <div className="z_cart_qty">
                      <button
                        className="qty_btn minus"
                        onClick={() => decreaseQty(item.product._id, item.quantity)}
                      >
                        −
                      </button>

                      <span className="qty_value">{item.quantity}</span>

                      <button
                        className="qty_btn plus"
                        onClick={() => increaseQty(item.product._id, item.quantity)}
                      >
                        +
                      </button>
                    </div>

                    <div className="z_cart_price">${item.product.price * item.quantity}</div>

                    <button
                      className="z_cart_delete"
                      onClick={() => deleteItem(item.product._id)}
                    >
                      <RiDeleteBin6Fill
                        size={22}
                        style={{ color: "rgb(218 65 65)" }}
                      />
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
                <select className="z_cart_coupon_select">
                  <option value="">Select discount voucher</option>
                  <option value="NEW10">NEW10 - 10% OFF</option>
                  <option value="SAVE20">SAVE20 - 20% OFF</option>
                  <option value="FREESHIP">FREESHIP - Free Shipping</option>
                </select>

                <button className="z_cart_coupon_btn">Apply</button>
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
