import Stripe from 'stripe';
import * as Yup from 'yup';
const stripe = new Stripe('sk_test_51Q8QakASflsYel5c6StSqhlVXo1lLB7uBZRKMD9Atm9GUT7pKZMr6v5O93w8B8bw1EMjU65YHyYSwImI7MF8T4Dk00OIjtgQ6W');

const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        return current.price * current.quantity + acc;
    }, 0)
    return total
}

class CreatePaymentIntentController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup.array()
                .of(
                    Yup.object({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                        price: Yup.number().required(),
                    })
                )
                .required(),
        })

        try {
            await schema.validate(request.body, { abortEarly: false }) // Use validate para async
        } catch (error) {
            return response.status(400).json({ error: error.errors })
        }
        const { products } = request.body
        const amount = calculateOrderAmount(products)

        //payment

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'brl',
            automatic_payment_methods: {
                enabled: true,
            },
        })

        response.json({
            clientSecret: paymentIntent.client_secret,
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        })
    }

}

export default new CreatePaymentIntentController()
