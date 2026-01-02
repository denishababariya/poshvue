import React from "react";
import { useLocation } from "react-router-dom";

function Checkout() {
  const { state } = useLocation();

  const {
    cartItems = [],
    subTotal = 0,
    discount = 0,
    deliveryFee = 0,
    total = 0,
  } = state || {};

  return (
    <section className="z_chck_section">
      <div className="z_chck_container">
        <h2 className="z_chck_heading">Checkout</h2>

        <div className="z_chck_main">

          {/* Billing Details */}
          <div className="z_chck_billing">
            <h3>Billing Details</h3>
            <form className="z_chck_form">
              <div className="z_chck_form_group">
                <label>Full Name</label>
                <input type="text" />
              </div>
              <div className="z_chck_form_group">
                <label>Email</label>
                <input type="email" />
              </div>
              <div className="z_chck_form_group">
                <label>Phone</label>
                <input type="tel" />
              </div>
              <div className="z_chck_form_group">
                <label>Address</label>
                <input type="text" />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="z_chck_summary">
            <h3>Order Summary</h3>

            {cartItems.map((item) => (
              <div key={item.id} className="z_chck_summary_item">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>${item.price * item.qty}</span>
              </div>
            ))}

            <div className="z_chck_summary_item">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>

            <div className="z_chck_summary_item">
              <span>Discount</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>

            <div className="z_chck_summary_item">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            <div className="z_chck_summary_total">
              <span>Total</span>
              <span>${total.toFixed(2)} USD</span>
            </div>

            <button className="z_chck_pay_btn">Pay Now</button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Checkout;