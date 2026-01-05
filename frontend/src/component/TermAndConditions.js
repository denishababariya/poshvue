import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "../styles/h_style.css";

const TermAndConditions = () => {
	return (
		<div className="terms-page bg-light">
			<div className="container py-5">

				{/* Breadcrumb */}
				<Breadcrumb className="align-items-center mb-4 terms-breadcrumb">
					<Breadcrumb.Item href="/" className="fw-medium text-dark">
						Home
					</Breadcrumb.Item>

					<span className="mx-2 text-muted d-flex align-items-center">/</span>

					<Breadcrumb.Item active className="fw-medium text-dark">
						Terms & Conditions
					</Breadcrumb.Item>
				</Breadcrumb>

				{/* Header */}
				<div className="terms-header mb-4">
					<h2 className="fw-bold">Terms & Conditions</h2>
					<p className="text-muted mb-0">
						Please read these terms carefully before using our website.
					</p>
				</div>

				{/* Content Card */}
				<ul className="terms-list py-3 py-md-4">
					<li>
						Products purchased from Poshvue can be returned or exchanged
						within 7 days of delivery, provided they are unused, unwashed,
						and in original condition with tags intact.
					</li>

					<li>
						Customers should carefully review product descriptions,
						specifications, pricing, and images before ordering. Minor
						variations in color may occur due to screen differences.
					</li>

					<li>
						Poshvue reserves the right to ship a similar or equivalent
						product if the original item is unavailable.
					</li>

					<li>
						Delivery timelines are estimates only. Delays or early
						deliveries do not qualify for compensation or refunds.
					</li>

					<li>
						Responsibility for the product ends once it is successfully
						delivered to the provided address.
					</li>

					<li>
						For clarification regarding these terms, customers must
						contact Poshvue support and await written confirmation.
					</li>

					<li>
						All products and services are provided on an “as-is” basis
						without warranties of any kind.
					</li>

					<li>
						Poshvue does not guarantee uninterrupted or error-free access
						to the website.
					</li>

					<li>
						Orders once placed cannot usually be cancelled. Approved
						cancellations may incur transaction or gateway charges.
					</li>

					<li>
						Customer data is used strictly for order processing, delivery,
						support, and promotions as per our Privacy Policy.
					</li>
				</ul>
			</div>
		</div>
	);
};

export default TermAndConditions;
