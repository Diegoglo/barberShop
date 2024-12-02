require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./backEnd/routes/authRoutes'); 
const messageRoutes = require('./backEnd/routes/messageRoutes'); 
const appointmentRoutes = require('./backEnd/routes/appointmentsRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
// app.use('/api', messageRoutes);
app.use('/api', appointmentRoutes);

app.get('/', (req, res) => {
    res.send('¡Hola Mundo desde Express!');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
