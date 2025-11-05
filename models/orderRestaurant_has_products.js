const db = require('../config/config');
const OrderRestaurantHasProducts = {};

OrderRestaurantHasProducts.create = (id_order, id_product, quantity, result) => {
    const sql = `
        INSERT INTO 
            orders_resturant_has_products(
                id_order,
                id_product,
                quantity,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?);
    `;

    db.query(
        sql,
        [
            id_order,
            id_product,
            quantity,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                console.log('Producto agregado a orden restaurante: order_id=' + id_order + ', product_id=' + id_product);
                result(null, res.insertId);
            }
        }
    );
}

module.exports = OrderRestaurantHasProducts;

