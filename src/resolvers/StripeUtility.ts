import dotenv from "dotenv";
import { logger } from "../utils/logger";

dotenv.config();

import Stripe from "stripe";
import Orders from "../models/Orders";

const stripe = new Stripe(process.env.STRIPE_KEY || "", {
  apiVersion: "2020-08-27",
});

const createCustomer = async (email: string, name: string) => {
  logger.info("Creating user of " + email + name);

  const customer = await stripe.customers.create({ email, name });

  return customer;
};

export const charge = async (args: Resolvers.MutationCreateOrderArgs) => {
  const { order } = args;
  const customer = await createCustomer(order.user.email, order.user.name);

  logger.info("Starting transaction ");

  const formattedAdress = `${order.shipping.address}, ${order.shipping.state} ${order.shipping.zip}, ${order.shipping.country}`;

  let formattedDescription = "";

  for (let i = 0; i < order.cart.length; i++) {
    formattedDescription +=
      `${order.cart[i]?.name}, quantity: ${order.cart[
        i
      ]?.quantity.toString()} ${order.cart[i]?.mouse}` + " ";
  }

  try {
    await stripe.paymentIntents.create({
      amount: order.amount,
      description: formattedDescription,
      currency: "USD",
      shipping: { name: order.user.name, address: { line1: formattedAdress } },
      receipt_email: order.user.email,
      payment_method: order.id,
      confirm: true,
      customer: customer.id,
    });

    const orderConfirmation = await Orders.query().insertAndFetch({
      user_id: order.user.id,
      orderTitle: order.description,
    });

    logger.info("Transaction Succeeded");
    return { verified: true, orderConfirmation };
  } catch (e) {
    logger.err("Payment faied", e.message);
    throw new Error("Unable to complete the transaction. Please try again.");
  }
};
