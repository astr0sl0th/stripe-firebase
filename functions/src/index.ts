import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Stripe from 'stripe';
import * as config from 'config';

import { handleError } from './helpers/error';

const stripe = new Stripe(config.get('stripe.secretKey'));

export const createCustomer = functions.https.onRequest(
  async (request, response) => {
    try {
      const newCustomer = await stripe.customers.create(request.body);
      const document = await admin
        .firestore()
        .collection('stripe')
        .add(newCustomer);
      return response.send({
        message: 'Your new account has been created!',
        documentId: document.id,
        stripeId: newCustomer.id
      });
    } catch (error) {
      handleError(response, error);
      return;
    }
  }
);

export const createCharge = functions.https.onRequest(
  async (request, response) => {
    try {
      const newCharge = await stripe.charges.create(request.body);
      const capturedCharged = await stripe.charges.capture(newCharge.id);

      return response.send({
        message: 'Your card has been charged successfully',
        chargeId: capturedCharged.id
      });
    } catch (error) {
      handleError(response, error);
      return;
    }
  }
);
