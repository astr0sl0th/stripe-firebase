import { IStripeError } from 'stripe';
import { Response } from 'firebase-functions';

export const handleError = (response: Response, err: IStripeError) => {
  const genericError = {
    message: 'Sorry we are having issues processing your request'
  };

  switch (err.type) {
    case 'StripeCardError':
      // A declined card error
      response.status(400).send(genericError);
      break;
    case 'StripeRateLimitError':
      // Too many requests made to the API too quickly
      response.status(500).send(genericError);
      break;
    case 'StripeInvalidRequestError':
      // Invalid parameters were supplied to Stripe's API
      response.status(500).send({ message: err.message, code: err.code });
      break;
    case 'StripeAPIError':
      // An error occurred internally with Stripe's API
      response.status(500).send({ message: err.message, code: err.code });
      break;
    case 'StripeConnectionError':
      // Some kind of error occurred during the HTTPS communication
      response.status(500).send({ message: err.message, code: err.code });
      break;
    case 'StripeAuthenticationError':
      // You probably used an incorrect API key
      response.status(500).send({ message: err.message, code: err.code });
      break;
    default:
      // Handle any other types of unexpected errors
      break;
  }
};
