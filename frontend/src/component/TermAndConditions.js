import React from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import { LiaAngleRightSolid } from "react-icons/lia";
import "../styles/h_style.css";

const TermAndConditions = () => {
	return (
		<div className="bg-white">
			<Container className="py-4">

				{/* Breadcrumb */}
				<Breadcrumb className="align-items-center mb-3">
					<Breadcrumb.Item
						href="/"
						className="fw-medium"
						style={{ color: "#000 ", textDecoration: "none" }}
					>
						Home
					</Breadcrumb.Item>

					<span className="mx-2 text-muted d-flex align-items-center">
						<LiaAngleRightSolid size={14} />
					</span>

					<Breadcrumb.Item active className="fw-medium text-black">
						Terms & Conditions
					</Breadcrumb.Item>
				</Breadcrumb>

				{/* Title */}
				<h1 className="fw-semibold mb-2">Terms & Conditions</h1>
				<hr className="mb-3" />

				{/* Content */}
				<div style={{ maxWidth: "950px" }} className="terms-and-condition-content">
					<ul className="lh-lg text-secondary ps-3">
						<li className="mb-3">
							Products purchased from Poshvue can be returned or exchanged within
							7 days of delivery, provided they are unused, unwashed, and in their
							original condition with tags intact.
						</li>

						<li className="mb-3">
							Customers are advised to carefully read all product descriptions,
							specifications, prices, and images before placing an order. While
							Poshvue strives to display accurate information, slight variations
							in color or appearance may occur due to photography or screen
							resolution differences.
						</li>

						<li className="mb-3">
							Poshvue reserves the right to ship a similar or equivalent product
							in cases where the originally ordered item is unavailable due to
							unforeseen circumstances.
						</li>

						<li className="mb-3">
							Delivery timelines mentioned on the website are estimated. Any delay
							or early delivery shall not entitle the customer to compensation,
							refunds, or damages of any kind.
						</li>

						<li className="mb-3">
							Poshvue ensures reasonable care while delivering orders to the
							address provided by the customer. However, responsibility for the
							product ceases once it is successfully delivered.
						</li>

						<li className="mb-3">
							In case of any confusion or clarification regarding these Terms &
							Conditions, customers are requested to contact Poshvue support and
							wait for a written response before proceeding with any transaction.
						</li>

						<li className="mb-3">
							All products and services offered by Poshvue are provided on an
							“as-is” basis without any warranties, either express or implied,
							including but not limited to quality, suitability, or availability.
						</li>

						<li className="mb-3">
							Poshvue does not guarantee that the website will be uninterrupted,
							error-free, or free from viruses or other harmful components at all
							times.
						</li>

						<li className="mb-3">
							Orders once placed cannot usually be cancelled. If a cancellation is
							approved in exceptional cases, applicable transaction charges,
							payment gateway fees, or currency conversion charges may be deducted.
						</li>

						<li className="mb-3">
							Customer information collected by Poshvue is used strictly for order
							processing, delivery, customer support, and promotional communication,
							in accordance with our Privacy Policy.
						</li>
					</ul>

				</div>
			</Container>
		</div>
	);
};

export default TermAndConditions;
