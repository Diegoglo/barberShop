const pool = require('../../db'); // Ajusta la ruta según sea necesario


exports.createAppointment = async (req, res) => {
  const { date, hour } = req.body;

  // Asegúrate de que date y hour no sean nulos o undefined
  console.log('Datos recibidos para agendar cita:', date, hour);

  if (!date || !hour) {
    return res.status(400).json({ message: 'Fecha y hora son requeridos' });
  }

  try {
    // Obtener el día de la semana basado en la fecha recibida
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    const dayOfWeek = currentDate.toLocaleString('es-ES', { weekday: 'long' });
    const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    const removeAccents = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    const DayOfWeek = removeAccents(capitalizedDayOfWeek);

    // Asegurarse de que la hora tenga el formato correcto con segundos
    const formattedHour = hour + ':00'; // Agrega los segundos manualmente (HH:mm:ss)
    // console.log('Formato final del día y hora:', DayOfWeek, formattedHour);

    // Comprobar disponibilidad antes de crear la cita
    const availableCheck = await pool.query(
      'SELECT * FROM schedule WHERE day = $1 AND hour = $2 AND available = true',
      [DayOfWeek, formattedHour]
    );
    // Si no hay filas disponibles, retorna un error
    if (availableCheck.rows.length === 0) {
      return res.status(400).json({ message: 'La hora no está disponible.' });
    }

    // Insertar la cita en la base de datos
    const result = await pool.query(
      'INSERT INTO appointments (date, time) VALUES ($1, $2) RETURNING *',
      [date, formattedHour] // Usa la hora con el formato HH:mm:ss
    );

    // Actualizar la disponibilidad en el horario
    await pool.query(
      'UPDATE schedule SET available = false WHERE day = $1 AND hour = $2',
      [DayOfWeek, formattedHour] // Usa la hora con el formato HH:mm:ss
    );

    res.status(201).json({ message: 'Cita agendada con éxito', appointment: result.rows[0] });
  } catch (err) {
    console.error('Error al agendar cita:', err.message);
    res.status(500).send('Error en el servidor');
  }
};





exports.getSchedule = async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM schedule');
      // console.log(result.rows); // Verifica lo que obtienes de la base de datos
      res.status(200).json(result.rows);
  } catch (err) {
      console.error('Error al obtener horarios:', err.message);
      res.status(500).send('Error en el servidor');
  }
};


