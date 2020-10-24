import dotenv from "dotenv";
import { logger } from "../utils/logger";

dotenv.config();

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY || "", {
	apiVersion: "2020-08-27",
});

const createCustomer = async (email: string, name: string) => {
	logger.info("Creating user of " + email + name);

	const customer = await stripe.customers.create();

	return customer;
};

export const charge = async (user: { email: string; name: string }, order: any) => {
	const customer = await createCustomer(user.email, user.name);

	logger.info("Starting transaction ");

	try {
		const payment = await stripe.paymentIntents.create({
			amount: order.price,
			description: order.productName,
			currency: "USD",
			shipping: order.shipping,
			receipt_email: order.user.email,
			payment_method: order.paymentId,
			confirm: true,
			customer: customer.id,
		});

		logger.info("Transaction Succeeded");
		return true;
	} catch (e) {
		logger.err("Payment faied", e.message);
		throw new Error("Unable to complete the transaction. Please try again.");
	}
};
