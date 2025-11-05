const OrderRestaurant = require('../models/orderRestaurant');
const OrderRestaurantHasProduct = require('../models/orderRestaurant_has_products');

module.exports = {

    findAll(req, res) {
        OrderRestaurant.findAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al obtener las ordenes del restaurante',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    findById(req, res) {
        const id = req.params.id;

        OrderRestaurant.findById(id, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al obtener la orden del restaurante',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    findByStatus(req, res) {
        const status = req.params.status;

        OrderRestaurant.findByStatus(status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al obtener las ordenes del restaurante',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    findByNumberMesa(req, res) {
        const number_mesa = req.params.number_mesa;

        OrderRestaurant.findByNumberMesa(number_mesa, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al obtener las ordenes del restaurante',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    async create(req, res) {
        const order = req.body;

        OrderRestaurant.create(order, async (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la creación de la orden del restaurante',
                    error: err
                })
            }

            // Crear productos asociados a la orden
            if (order.products && order.products.length > 0) {
                let productErrors = [];
                
                // Usar Promise.all para esperar todas las inserciones
                const productPromises = order.products.map((product) => {
                    return new Promise((resolve) => {
                        OrderRestaurantHasProduct.create(
                            parseInt(id),
                            parseInt(product.id),
                            parseInt(product.quantity),
                            (err, result) => {
                                if (err) {
                                    console.error('Error al insertar producto:', err);
                                    productErrors.push({
                                        productId: product.id,
                                        error: err.message
                                    });
                                }
                                resolve();
                            }
                        );
                    });
                });

                // Esperar a que todas las inserciones terminen
                await Promise.all(productPromises);

                // Si hubo errores al insertar productos, responder con error
                if (productErrors.length > 0) {
                    // Eliminar la orden creada si falló la inserción de productos
                    OrderRestaurant.delete(id, () => {});
                    
                    return res.status(501).json({
                        success: false,
                        message: 'La orden se creó pero hubo errores al agregar algunos productos',
                        errors: productErrors
                    });
                }
            }

            return res.status(201).json({
                success: true,
                message: 'La orden del restaurante se creo correctamente',
                data: `${id}`
            })
        })
    },

    async updateToPreparacion(req, res) {
        const order = req.body;

        OrderRestaurant.updateToPreparacion(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar el estado de la orden del restaurante',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden del restaurante se actualizó correctamente a PREPARACION',
                data: `${id_order}`
            });
        })
    },

    async updateToListo(req, res) {
        const order = req.body;

        OrderRestaurant.updateToListo(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar el estado de la orden del restaurante',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden del restaurante se actualizó correctamente a LISTO',
                data: `${id_order}`
            });
        })
    },

    async updateToPagado(req, res) {
        const order = req.body;

        OrderRestaurant.updateToPagado(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar el estado de la orden del restaurante',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden del restaurante se actualizó correctamente a PAGADO',
                data: `${id_order}`
            });
        })
    },

    async update(req, res) {
        const id = req.params.id;
        const order = req.body;

        OrderRestaurant.update(id, order, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar la orden del restaurante',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden del restaurante se actualizó correctamente',
                data: `${id_order}`
            });
        })
    },

    async delete(req, res) {
        const id = req.params.id;

        OrderRestaurant.delete(id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al eliminar la orden del restaurante',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden del restaurante se eliminó correctamente',
                data: `${id_order}`
            });
        })
    }
}

