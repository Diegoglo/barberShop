

const pool = require('../../db'); // Asegúrate de importar tu configuración de pool de PostgreSQL

exports.getMessages = (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado');
    }
    res.status(200).json(mensajes);
};


exports.postMessage = async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Verificar que no falten campos
  if (!nombre || !email || !mensaje) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  try {
    // Insertar el mensaje en la base de datos
    const result = await pool.query(
      'INSERT INTO contactos (nombre, correo, mensaje) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, mensaje]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// exports.postHour=(req, res) => {
//     const { date, time } = req.body;
//     // Lógica para manejar la fecha y hora recibida
//     console.log(`Fecha recibida: ${date}`);
//     console.log(`Hora recibida: ${time}`);
  
//     // Puedes responder con un mensaje de éxito
//     res.status(200).json({ message: 'Datos recibidos correctamente' });
// };

// exports.getAppointment = (req, res) => {
//     try {
//         // Validar si se requieren parámetros específicos
//         const { day, hour } = req.query;

//         // Si se proporciona un día específico, filtramos las citas para ese día
//         if (day && hour) {
//             // Verifica si el día y la hora están disponibles
//             if (appointments[day] && appointments[day][hour] !== undefined) {
//                 res.status(200).json({ available: appointments[day][hour] });
//             } else {
//                 res.status(404).json({ message: 'Día o hora no encontrados' });
//             }
//         } else {
//             // Si no se proporcionan parámetros, devuelve el horario completo
//             res.status(200).json(appointments);
//         }
//     } catch (error) {
//         console.error('Error al obtener las citas:', error);
//         res.status(500).json({ message: 'Error interno del servidor' });
//     }
// };
// exports.getAppointment = (req, res) => {
//     try {
//         // Validar si se requieren parámetros específicos
//         const { day, hour } = req.query;

//         // Si se proporciona un día específico, filtramos las citas para ese día
//         if (day && hour) {
//             // Verifica si el día y la hora están disponibles
//             if (appointments[day] && appointments[day][hour] !== undefined) {
//                 res.status(200).json({ available: appointments[day][hour] });
//             } else {
//                 res.status(404).json({ message: 'Día o hora no encontrados' });
//             }
//         } else {
//             // Si no se proporcionan parámetros, devuelve el horario completo
//             res.status(200).json(appointments);
//         }
//     } catch (error) {
//         console.error('Error al obtener las citas:', error);
//         res.status(500).json({ message: 'Error interno del servidor' });
//     }
// };

// exports.reserveAppointment = (req, res) => {
//     const { day, time } = req.body;
    
//     // Validar si el día y la hora están disponibles
//     if (appointments[day] && appointments[day][time] !== undefined) {
//         if (appointments[day][time]) {
//             // Marcar la hora como no disponible
//             appointments[day][time] = false;
//             res.status(200).json({ message: 'Cita agendada correctamente' });
//         } else {
//             res.status(400).json({ message: 'La hora ya está ocupada' });
//         }
//     } else {
//         res.status(404).json({ message: 'Día o hora no encontrados' });
//     }
// };
