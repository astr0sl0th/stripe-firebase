# Stripe For Firebase Cloud Functions

## User Guide

First of all add your project to the `.firebase.rc` file.

```
{
  "projects": {
    "default": "your-project"
  }
}
```

Next you need to create a config file inside the config folder. This project uses the [config](https://www.npmjs.com/package/config) package to manage your secrets.
 
 `mkdir -p ./functions/src/config && touch ./functions/src/config/default.yml`

Add your stripe secret key to default.yml

```
stripe:
  secretKey: sk_test_123456
```

Now install the dependencies be either running `yarn` or `npm i` if using npm you might want to remove the `yarn.lock` file and use a `package-lock.json`

## Running locally

To test the stipe endpoints locally using your test credentials you can run `yarn serve` in `./functions` this will emulate the endpoint you would get from your cloud function once deployed.

__Make sure you follow the stripe schema when posting data to the endpoint, request.body expects the same as what stripe is using. See [create customer](https://stripe.com/docs/api/customers/create?lang=node) as an example.__

## Deploying

You can deploy 'as is' or make some modifications to suit your business.
 