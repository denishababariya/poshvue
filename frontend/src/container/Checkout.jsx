import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "";
const HAS_STRIPE = !!STRIPE_PUBLISHABLE_KEY;
const stripePromise = HAS_STRIPE ? loadStripe(STRIPE_PUBLISHABLE_KEY) : Promise.resolve(null);

function CheckoutForm({ cartItems, subTotal, discount, deliveryFee, total }) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingValues, setPendingValues] = useState(null);

  const billingValidationSchema = Yup.object({
    fullName: Yup.string().min(2, "Name too short").required("Full name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
    address: Yup.string().min(10, "Address too short").required("Address is required"),
  });

  const actuallySubmitPayment = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("Please login to continue");
        navigate("/login");
        setLoading(false);
        return;
      }

      // Payment MUST be done before order creation
      if (!HAS_STRIPE) {
        alert("Online payment is required before placing the order. Payment gateway is not configured.");
        setLoading(false);
        return;
      }
      if (!stripe || !elements) {
        alert("Payment form is not ready yet. Please wait a moment and try again.");
        setLoading(false);
        return;
      }

      let paymentIntentId = null;

      if (HAS_STRIPE && stripe && elements) {
        // 1) Create payment intent on backend
        const piRes = await axios.post(
          "http://localhost:5000/api/payment/create-intent",
          { amount: total, currency: "usd" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const clientSecret = piRes.data.clientSecret;
        const cardElement = elements.getElement(CardElement);

        // 2) Confirm card payment with Stripe (no redirect, inline form)
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: values.fullName,
              email: values.email,
              phone: values.phone,
            },
          },
        });

        if (error) {
          console.error("Stripe payment error:", error);
          alert(error.message || "Payment failed");
          setLoading(false);
          return;
        }

        if (paymentIntent.status !== "succeeded") {
          alert("Payment not completed. Status: " + paymentIntent.status);
          setLoading(false);
          return;
        }

        paymentIntentId = paymentIntent.id;
      }

      // 3) Create order in backend (ONLY after successful payment) and trigger Shiprocket inside backend
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size || null,
        color: item.color || null,
      }));

      const orderRes = await axios.post(
        "http://localhost:5000/api/commerce/orders",
        {
          customerName: values.fullName,
          customerEmail: values.email,
          customerPhone: values.phone,
          address: values.address,
          items: orderItems,
          total,
          status: "paid",
          paymentIntentId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Order created:", orderRes.data.item);
      alert("Payment successful and order placed!");
      // Clear cart on backend, then go to track-order page
      try {
        await axios.delete("http://localhost:5000/api/cart/clear", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (clearErr) {
        console.error("Error clearing cart after order:", clearErr);
      }
      navigate("/TrackOrder");
    } catch (err) {
      console.error("Checkout error:", err);
      alert(err.response?.data?.message || "Something went wrong during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        phone: "",
        address: "",
      }}
      validationSchema={billingValidationSchema}
      onSubmit={(values) => {
        // First open confirmation modal; only after confirm we do payment + order
        setPendingValues(values);
        setShowConfirm(true);
      }}
    >
      {() => (
        <Form className="z_chck_form">
          <div className="z_chck_form_group">
            <label>Full Name</label>
            <Field type="text" name="fullName" />
            <ErrorMessage name="fullName" component="small" className="text-danger" />
          </div>

          <div className="z_chck_form_group">
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="small" className="text-danger" />
          </div>

          <div className="z_chck_form_group">
            <label>Phone</label>
            <Field type="tel" name="phone" />
            <ErrorMessage name="phone" component="small" className="text-danger" />
          </div>

          <div className="z_chck_form_group">
            <label>Address</label>
            <Field type="text" name="address" />
            <ErrorMessage name="address" component="small" className="text-danger" />
          </div>

          {HAS_STRIPE && (
            <div className="z_chck_form_group mt-3">
              <label>Card Details</label>
              <div className="z_chck_card_element">
                <CardElement options={{ hidePostalCode: true }} />
              </div>
            </div>
          )}

          <button type="submit" className="z_chck_pay_btn mt-3" disabled={loading || !HAS_STRIPE || !stripe}>
            {loading ? "Processing..." : "Pay & Place Order"}
          </button>

          {showConfirm && (
            <>
              {/* Bootstrap-style modal */}
              <div
                className="modal fade show d-block z_chck_glass_modal_wrapper"
                tabIndex="-1"
                role="dialog"
              >
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content z_glass_modal">
                    <div className="modal-header">
                      <h5 className="z_auth_title mb-0">Confirm your order</h5>
                      <button
  type="button"
  className="btn-close btn-close-white"
  aria-label="Close"
  onClick={() => setShowConfirm(false)}
>
</button>

                      {/* <button
                        className="z_modal_close text-light"
                        onClick={() => setShowConfirm(false)}
                      >
                        ✕
                      </button> */}
                    </div>
                    <div className="modal-body">
                      <p>Are you sure you want to pay and place this order?</p>

                      <p>
                        <strong>Total: ${total.toFixed(2)} USD</strong>
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-light"
                        onClick={() => setShowConfirm(false)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={async () => {
                          if (pendingValues) {
                            setShowConfirm(false);
                            await actuallySubmitPayment(pendingValues);
                          }
                        }}
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Confirm & Pay"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Optional Bootstrap backdrop helper */}
              <div className="modal-backdrop fade show" />
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(state?.cartItems || []);
  const [subTotal, setSubTotal] = useState(state?.subTotal || 0);
  const [discount, setDiscount] = useState(state?.discount || 0);
  const [deliveryFee, setDeliveryFee] = useState(state?.deliveryFee || 0);
  const [total, setTotal] = useState(state?.total || 0);

  // Ensure product data is always available, even if user refreshes /Checkout
  useEffect(() => {
    // If state already provided valid items, use them
    if (state?.cartItems && state.cartItems.length > 0) return;

    const fetchCart = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("Please login to continue");
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const items = res.data.items || [];
        setCartItems(items);

        const st = items.reduce(
          (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
          0
        );
        const disc = st * 0.1;
        const delivery = 50;
        const tot = st - disc + delivery;

        setSubTotal(st);
        setDiscount(disc);
        setDeliveryFee(delivery);
        setTotal(tot);
      } catch (err) {
        console.error("Error fetching cart for checkout:", err);
        alert("Failed to load cart for checkout");
        navigate("/Cart");
      }
    };

    fetchCart();
  }, [state, navigate]);

  return (
    <section className="z_chck_section">
      <div className="z_chck_container">
        <h2 className="z_chck_heading">Checkout</h2>

        <div className="z_chck_main">
          {/* ================= Billing Details ================= */}
          <div className="z_chck_billing">
            <h3>Billing & Payment</h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                cartItems={cartItems}
                subTotal={subTotal}
                discount={discount}
                deliveryFee={deliveryFee}
                total={total}
              />
            </Elements>
          </div>

          {/* ================= Order Summary ================= */}
          <div className="z_chck_summary">
            <h3>Order Summary</h3>

            {cartItems.map((item) => (
              <div
                key={`${item.product._id}-${item.size || "nosize"}-${item.color || "nocolor"}`}
                className="z_chck_summary_item"
              >
                <span>
                  {item.product.title} x {item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
