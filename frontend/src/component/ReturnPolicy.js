import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "../styles/h_style.css";

const ReturnPolicy = () => {
	return (
		<div className="terms-page bg-light">
			<div className="container py-5">

				{/* Breadcrumb */}
				<Breadcrumb className="align-items-center mb-4 terms-breadcrumb">
					<Breadcrumb.Item href="/" className="fw-medium text-dark">
						Home
					</Breadcrumb.Item>
					<span className="mx-2 text-muted">/</span>
					<Breadcrumb.Item active className="fw-medium text-dark">
						Return Policy
					</Breadcrumb.Item>
				</Breadcrumb>

				{/* Header */}
				<div className="terms-header mb-4">
					<h2 className="fw-bold">Return, Refund & Cancellation Policy</h2>
					<p className="text-muted mb-0">
						Please read the following policy carefully before placing an order.
					</p>
				</div>

				{/* Content */}
				<div className="terms-card py-4">
					<div className="terms-content">

						<h5 className="terms-title">Policy Regarding Refunds on Customized or Altered Items</h5>
						<p>
							Customized, stitched, altered, or made-to-order products are created
							specifically based on customer preferences. Hence, these items are
							<strong> not eligible for return, refund, or exchange</strong>.
						</p>

						<h5 className="terms-title">Dispatch Confirmation Email</h5>
						<p>
							Once your order is placed, you will receive an order confirmation email.
							After dispatch, shipment confirmation and tracking details will be
							shared via email or SMS.
						</p>

						<h5 className="terms-title">Pre-Shipment Cancellations</h5>
						<p>
							Cancellation requests are accepted only before dispatch.
							Ready-to-ship orders can be cancelled within <strong>24 hours</strong>
							of order placement. Once shipped, cancellation requests will not be accepted.
						</p>

						<h5 className="terms-title">Returns After Order Delivered</h5>
						<p>
							Returns are accepted only if the product received is damaged,
							defective, or incorrect. Requests must be raised within
							<strong> 48 hours of delivery</strong> along with clear images or an unboxing video.
						</p>

						<h5 className="terms-title">Conditions for Accepting Returns</h5>
						<p>
							The product must be unused, unwashed, and returned in original condition
							with tags intact. Products showing signs of wear, stains, perfume,
							or damage will not qualify for return or refund.
						</p>

						<h5 className="terms-title">Return Pickup & Quality Check</h5>
						<p>
							All returned items undergo a quality inspection once received.
							Refunds or exchanges are approved only after successful verification
							of the product condition.
						</p>

						<h5 className="terms-title">Refund Processing Timeline</h5>
						<p>
							Once the return is approved, refunds are processed within
							<strong> 7–10 business days</strong>. Processing time may vary depending
							on the payment method used.
						</p>

						<h5 className="terms-title">Refund Mode</h5>
						<p>
							<ul className="terms-list">
								<li>Credit / Debit Card: 10–14 business days</li>
								<li>UPI / Net Banking / Wallets: 7–10 business days</li>
								<li>Cash on Delivery (COD): Refunded as Store Credit</li>
							</ul>
						</p>

						<h5 className="terms-title">Store Credit</h5>
						<p>
							Store Credit issued can only be used for future purchases and
							cannot be transferred or redeemed for cash.
							Validity details will be shared at the time of issuance.
						</p>

						<h5 className="terms-title">International Orders</h5>
						<p>
							International orders are strictly non-returnable and non-exchangeable.
							Custom duties, taxes, and shipping charges are non-refundable.
						</p>

						<h5 className="terms-title">Shipping Delays</h5>
						<p>
							Delivery delays caused due to natural calamities, weather conditions,
							public holidays, or courier partner issues are beyond our control and
							do not qualify for cancellation or refund.
						</p>

						<h5 className="terms-title">Post-Inspection Resolution</h5>
						<p>
							After inspection, our customer care team may offer one of the following:
							refund, exchange, store credit, or replacement depending on the case.
						</p>

						<h5 className="terms-title">Customer Responsibility</h5>
						<p>
							It is the customer’s responsibility to provide accurate delivery
							details. Failed deliveries due to incorrect information may result
							in additional charges.
						</p>

						<h5 className="terms-title">Policy Updates</h5>
						<p className="mb-0">
							We reserve the right to modify or update this policy at any time
							without prior notice. Changes will be effective immediately upon
							posting on this page.
						</p>

					</div>
				</div>

			</div>
		</div>
	);
};

export default ReturnPolicy;
