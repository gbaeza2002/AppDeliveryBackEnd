const { Payment } = require('mercadopago');
const Order = require('../models/order');
const OrderHasProduct = require('../models/order_has_products');
const { mercadopagoClient } = require('../server');

// Crear instancia de Payment con el cliente configurado
const paymentClient = new Payment(mercadopagoClient);

module.exports = {
    async createPayment(req, res) {
        let payment = req.body;
        console.log('PAYMENT', payment);

        const payment_data = {
            token: payment.token,
            issuer_id: payment.issuer_id,
            payment_method_id: payment.payment_method_id,
            transaction_amount: payment.transaction_amount,
            installments: parseInt(payment.installments),
            payer: {
                email: payment.payer.email,
                identification: {
                    type: payment.payer.identification.type,
                    number: payment.payer.identification.number,
                }
            }
        }

        console.log("datos", payment_data)
        const data = await paymentClient.create({ body: payment_data }).catch((err) => {
            console.log('ERROR DE MERCADOPAGO', err);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al procesar el pago',
                error: err
            });
        });

        if (data) {
            // En la nueva API, la respuesta puede estar en data directamente o en data.response
            const paymentResponse = data.response || data;
            console.log('Los datos del cliente son correctos', paymentResponse);

            const order = payment.order;

            Order.create(order, async (err, id) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con la creación de la orden',
                        error: err
                    })
                }

                for (const product of order.products) {
                    await OrderHasProduct.create(
                        id,
                        product.id,
                        product.quantity,
                        (err, id) => {
                            if (err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Hubo un error al agregar productos a la orden',
                                    error: err
                                })
                            }
                        }
                    )
                }

                return res.status(201).json({
                    success: true,
                    message: 'La orden se creo correctamente',
                    data: paymentResponse
                })
            })
        } else {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con algun dato en la peticion',
            })
        }
    }
}