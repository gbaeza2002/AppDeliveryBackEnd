const db = require('../config/config');
const OrderRestaurant = {};

OrderRestaurant.findByStatus = (status, result) => {
    const sql = `
    select 
        convert(ORD.id, char) as id,
        ORD.number_mesa,
        ORD.status,
        ORD.timestamp,
        COALESCE(
            json_arrayagg(
                CASE 
                    WHEN P.id IS NOT NULL THEN
                        json_object(
                            'id', convert(P.id, char),
                            'name', P.name,
                            'description', P.description,
                            'image1', P.image1,
                            'image2', P.image2,
                            'image3', P.image3,
                            'price', P.price,
                            'quantity', OHP.quantity
                        )
                    ELSE NULL
                END
            ),
            JSON_ARRAY()
        ) as products
    from
        orders_resturant as ORD
    left join
        orders_resturant_has_products as OHP
    on
        OHP.id_order = ORD.id
    left join
        products as P
    on
        P.id = OHP.id_product
    where 
        ORD.status = ?
    group by
        ORD.id, ORD.number_mesa, ORD.status, ORD.timestamp;
    `;

    db.query(
        sql,
        status,
        (err, data) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                console.log('Ordenes de restaurante encontradas: ' + data.length);
                console.log('Datos de órdenes:', JSON.stringify(data, null, 2));
                result(null, data);
            }
        });
}

OrderRestaurant.findByNumberMesa = (number_mesa, result) => {
    const sql = `
    select 
        convert(ORD.id, char) as id,
        ORD.number_mesa,
        ORD.status,
        ORD.timestamp,
        json_arrayagg(
            json_object(
                'id', convert(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity
            )
        ) as products
    from
        orders_resturant as ORD
    left join
        orders_resturant_has_products as OHP
    on
        OHP.id_order = ORD.id
    left join
        products as P
    on
        P.id = OHP.id_product
    where 
        ORD.number_mesa = ?
    group by
        ORD.id;
    `;

    db.query(
        sql,
        number_mesa,
        (err, data) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                console.log('Ordenes de restaurante encontradas: ' + data.length);
                result(null, data);
            }
        });
}

OrderRestaurant.findById = (id, result) => {
    const sql = `
    select 
        convert(ORD.id, char) as id,
        ORD.number_mesa,
        ORD.status,
        ORD.timestamp,
        json_arrayagg(
            json_object(
                'id', convert(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity
            )
        ) as products
    from
        orders_resturant as ORD
    left join
        orders_resturant_has_products as OHP
    on
        OHP.id_order = ORD.id
    left join
        products as P
    on
        P.id = OHP.id_product
    where 
        ORD.id = ?
    group by
        ORD.id;
    `;

    db.query(
        sql,
        id,
        (err, data) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                console.log('Orden de restaurante encontrada');
                result(null, data[0]);
            }
        });
}

OrderRestaurant.findAll = (result) => {
    const sql = `
    select 
        convert(ORD.id, char) as id,
        ORD.number_mesa,
        ORD.status,
        ORD.timestamp,
        json_arrayagg(
            json_object(
                'id', convert(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity
            )
        ) as products
    from
        orders_resturant as ORD
    left join
        orders_resturant_has_products as OHP
    on
        OHP.id_order = ORD.id
    left join
        products as P
    on
        P.id = OHP.id_product
    group by
        ORD.id
    order by
        ORD.created_at DESC;
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                console.log('Ordenes de restaurante encontradas: ' + data.length);
                result(null, data);
            }
        });
}

OrderRestaurant.create = (order, result) => {
    const sql = `
        insert into 
            orders_resturant(
                number_mesa,
                status,
                timestamp,
                created_at,
                updated_at
            )
        values(?, ?, ?, ?, ?);
    `;

    db.query(
        sql,
        [
            order.number_mesa,
            'RECIBIDO', // 1. RECIBIDO, 2. PREPARACION, 3. LISTO, 4. PAGADO
            Date.now(),
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                console.log('ID de la nueva orden de restaurante: ' + res.insertId);
                result(null, res.insertId);
            }
        }
    );
}

OrderRestaurant.updateToPreparacion = (id_order, result) => {
    const sql = `
        update 
            orders_resturant
        set 
            status = ?,
            updated_at = ?
        where 
            id = ?
    `;

    db.query(
        sql,
        [
            'PREPARACION', // 2. PREPARACION
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    );
}

OrderRestaurant.updateToListo = (id_order, result) => {
    const sql = `
        update 
            orders_resturant
        set 
            status = ?,
            updated_at = ?
        where 
            id = ?
    `;

    db.query(
        sql,
        [
            'LISTO', // 3. LISTO
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    );
}

OrderRestaurant.updateToPagado = (id_order, result) => {
    const sql = `
        update 
            orders_resturant
        set 
            status = ?,
            updated_at = ?
        where 
            id = ?
    `;

    db.query(
        sql,
        [
            'PAGADO', // 4. PAGADO
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    );
}

OrderRestaurant.update = (id_order, order, result) => {
    const sql = `
        update 
            orders_resturant
        set 
            number_mesa = ?,
            updated_at = ?
        where 
            id = ?
    `;

    db.query(
        sql,
        [
            order.number_mesa,
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    );
}

OrderRestaurant.delete = (id_order, result) => {
    const sql = `
        delete from 
            orders_resturant
        where 
            id = ?
    `;

    db.query(
        sql,
        id_order,
        (err, res) => {
            if (err) {
                console.log('Error:' + err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    );
}

module.exports = OrderRestaurant;

