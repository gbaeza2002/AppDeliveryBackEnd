const userController = require('../controllers/userController')
const passport = require('passport')

module.exports = (app, upload) => {
    /**
     * @swagger
     * /api/users/create:
     *   post:
     *     summary: Registrar un nuevo usuario sin imagen
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       201:
     *         description: Usuario registrado exitosamente
     */
    app.post('/api/users/create', userController.register);

    /**
     * @swagger
     * /api/users/createWithImage:
     *   post:
     *     summary: Registrar un nuevo usuario con imagen
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *               image:
     *                 type: string
     *                 format: binary
     *     responses:
     *       201:
     *         description: Usuario registrado exitosamente con imagen
     */
    app.post('/api/users/createWithImage', upload.array('image', 1), userController.registerWithImage);

    /**
     * @swagger
     * /api/users/login:
     *   post:
     *     summary: Iniciar sesión
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login exitoso
     *       401:
     *         description: Credenciales inválidas
     */
    app.post('/api/users/login', userController.login);

    /**
     * @swagger
     * /api/users/update:
     *   put:
     *     summary: Actualizar información del usuario con imagen
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               image:
     *                 type: string
     *                 format: binary
     *     responses:
     *       200:
     *         description: Usuario actualizado exitosamente
     *       401:
     *         description: No autorizado
     */
    app.put('/api/users/update', passport.authenticate('jwt', { session:false }), upload.array('image', 1), userController.updateWithImage);

    /**
     * @swagger
     * /api/users/updateWithOutImage:
     *   put:
     *     summary: Actualizar información del usuario sin cambiar imagen
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *     responses:
     *       200:
     *         description: Usuario actualizado exitosamente
     *       401:
     *         description: No autorizado
     */
    app.put('/api/users/updateWithOutImage', passport.authenticate('jwt', { session:false }), userController.updateWithOutImage);

    /**
     * @swagger
     * /api/users/findeDeliveryMen:
     *   get:
     *     summary: Obtener lista de repartidores
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de repartidores obtenida exitosamente
     */
    app.get('/api/users/findDeliveryMen', passport.authenticate('jwt', { session:false }), userController.findeDeliveryMen);

    /**
     * @swagger
     * /api/users/getAll:
     *   get:
     *     summary: Obtener todos los usuarios
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de usuarios obtenida exitosamente
     */
    app.get('/api/users/getAll', passport.authenticate('jwt', { session: false }), userController.getAll);

    /**
     * @swagger
     * /api/users/createWithRole:
     *   post:
     *     summary: Crear un nuevo usuario con rol asignado
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               user:
     *                 type: string
     *               id_rol:
     *                 type: string
     *               image:
     *                 type: string
     *                 format: binary
     *     responses:
     *       201:
     *         description: Usuario creado exitosamente
     */
    app.post('/api/users/createWithRole', passport.authenticate('jwt', { session: false }), upload.array('image', 1), userController.createWithRole);

    /**
     * @swagger
     * /api/users/getAllRoles:
     *   get:
     *     summary: Obtener todos los roles disponibles
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de roles obtenida exitosamente
     */
    app.get('/api/users/getAllRoles', passport.authenticate('jwt', { session: false }), userController.getAllRoles);
}
