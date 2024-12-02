const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../../db'); // Asegúrate de importar tu configuración de pool de PostgreSQL
const usuarios = require('../models/userModel');
const secretKey = process.env.SECRET_KEY;

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Buscar al usuario en la base de datos
      const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
  
      if (result.rows.length === 0) {
        return res.status(401).send('Credenciales inválidas');
      }
  
      const usuario = result.rows[0];
  
      // Comparar la contraseña encriptada
      const passwordValid = bcrypt.compareSync(password, usuario.password);
  
      if (!passwordValid) {
        return res.status(401).send('Credenciales inválidas');
      }
  
      // Generar un token JWT
      const token = jwt.sign({ email: usuario.correo, role: usuario.role }, secretKey, { expiresIn: '1h' });
  
      console.log("Logueado correctamente");
      res.status(200).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
};

exports.register = async (req, res) => {
    const { name, email, age, gender, password } = req.body;
  
    // Verificar que no falten campos
    if (!name || !email || !age || !gender || !password) {
      return res.status(400).send('Todos los campos son obligatorios');
    }
  
    try {
      // Verificar si el correo ya está registrado
      const existingUser = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).send('El correo electrónico ya está registrado');
      }
  
      // Encriptar contraseña
      const hashedPassword = bcrypt.hashSync(password, 8);
  
      // Insertar nuevo usuario
      const result = await pool.query(
        'INSERT INTO usuarios (nombre, edad, sexo, correo, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, age, gender, email, hashedPassword]
      );
  
      res.status(201).json({ message: 'Usuario registrado exitosamente', user: result.rows[0] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
  };
