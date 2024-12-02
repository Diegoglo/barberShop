const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentsController');

router.post('/createAppointment', appointmentController.createAppointment);
router.get('/getSchedule', appointmentController.getSchedule);

module.exports = router;