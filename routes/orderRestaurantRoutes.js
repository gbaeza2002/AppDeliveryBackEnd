const orderRestaurantController = require('../controllers/OrderRestaurantController');
const passport = require('passport');

module.exports = (app) => {
    // GET - Obtener todas las órdenes del restaurante
    app.get('/api/orders-restaurant', passport.authenticate('jwt', { session: false }), orderRestaurantController.findAll);
    
    // GET - Obtener orden por ID
    app.get('/api/orders-restaurant/:id', passport.authenticate('jwt', { session: false }), orderRestaurantController.findById);
    
    // GET - Obtener órdenes por estado
    app.get('/api/orders-restaurant/findByStatus/:status', passport.authenticate('jwt', { session: false }), orderRestaurantController.findByStatus);
    
    // GET - Obtener órdenes por número de mesa
    app.get('/api/orders-restaurant/findByNumberMesa/:number_mesa', passport.authenticate('jwt', { session: false }), orderRestaurantController.findByNumberMesa);
    
    // POST - Crear nueva orden del restaurante
    app.post('/api/orders-restaurant/create', passport.authenticate('jwt', { session: false }), orderRestaurantController.create);
    
    // PUT - Actualizar orden a PREPARACION
    app.put('/api/orders-restaurant/updateToPreparacion', passport.authenticate('jwt', { session: false }), orderRestaurantController.updateToPreparacion);
    
    // PUT - Actualizar orden a LISTO
    app.put('/api/orders-restaurant/updateToListo', passport.authenticate('jwt', { session: false }), orderRestaurantController.updateToListo);
    
    // PUT - Actualizar orden a PAGADO
    app.put('/api/orders-restaurant/updateToPagado', passport.authenticate('jwt', { session: false }), orderRestaurantController.updateToPagado);
    
    // PUT - Actualizar orden (número de mesa)
    app.put('/api/orders-restaurant/:id', passport.authenticate('jwt', { session: false }), orderRestaurantController.update);
    
    // DELETE - Eliminar orden del restaurante
    app.delete('/api/orders-restaurant/:id', passport.authenticate('jwt', { session: false }), orderRestaurantController.delete);
}

