const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',          // Usuario de PostgreSQL
  host: 'localhost',         // Host local
  database: 'barbershop',   // Nombre de la base de datos que creaste
  password: 'diexsp82565170', // tu contraseña
  port: 5432,                // Puerto por defecto de PostgreSQL
});

module.exports = pool;