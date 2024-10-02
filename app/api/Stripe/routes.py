# import stripe
#
# from flask import Blueprint, jsonify, json, request
#
# stripe_routes = Blueprint('stripe_routes', __name__)
#
# def calculate_order_amount(items):
#     # Replace this constant with a calculation of the order's amount
#     # Calculate the order total on the server to prevent
#     # people from directly manipulating the amount on the client
#     return 1400
#
#
# @stripe_routes.route('/create-payment-intent', methods=['POST'])
# def create_payment():
#     try:
#         data = json.loads(request.data)
#         # Create a PaymentIntent with the order amount and currency
#         intent = stripe.PaymentIntent.create(
#             amount=calculate_order_amount(data['items']),
#             currency='usd',
#             # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
#             automatic_payment_methods={
#                 'enabled': True,
#             },
#         )
#         return jsonify({
#             'clientSecret': intent['client_secret'],
#             # [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
#             'dpmCheckerLink': 'https://dashboard.stripe.com/settings/payment_methods/review?transaction_id={}'.format(intent['id']),
#         })
#     except Exception as e:
#         return jsonify(error=str(e)), 403