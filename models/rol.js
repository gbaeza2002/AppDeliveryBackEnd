const db = require('../config/config')

const Rol = {};

Rol.create = (id_user, id_rol, result) => {
    const sql = `
        INSERT INTO
            user_has_roles(
                id_user,
                id_rol,
                created_at,
                updated_at
            )
        VALUES(?,?,?,?)
    `;
    db.query(
        sql,
        [id_user, id_rol, new Date(), new Date()],
        (err, res) => {
            if(err){
                console.log('Error:'+ err)
                result(err, null)
            }else{
                //console.log('id rol-user Obtain:', res.insertId)
                result(null, res.insertId)
            }
        }
    )
}

Rol.getAll = (result) => {
    const sql = `
        SELECT 
            id,
            name,
            image,
            route
        FROM 
            roles
        ORDER BY 
            name
    `;
    
    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:' + err)
                result(err, null)
            } else {
                result(null, data)
            }
        }
    )
}

module.exports = Rol;