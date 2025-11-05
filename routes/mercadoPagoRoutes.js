const mercadoController = require('../controllers/mercadoPagoController');
const passport = require('passport');

module.exports = (app) => {
    app.post('/api/payment/create', passport.authenticate('jwt', { session: false }), mercadoController.createPayment);
}