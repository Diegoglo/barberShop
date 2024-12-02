const bcrypt = require('bcryptjs');

const usuarios = [
    { email: 'diego.5alzamora@gmail.com', password: bcrypt.hashSync('82565170', 8), role: 'admin' },
    { email: 'user@example.com', password: bcrypt.hashSync('userpassword', 8), role: 'user' }
];

module.exports = usuarios;
