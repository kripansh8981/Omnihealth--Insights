const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const transporter = require('../utils/mailer'); // Adjusted path
// Import the mailer

// @route   POST /api/appointment
// @desc    Book an appointment with Smart Auto-Scheduling and send confirmation email
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { hospitalName, doctorName, patientName, age, gender, appointmentDate, email } = req.body;

    // Check if all required fields are present
    if (!hospitalName || !doctorName || !patientName || !appointmentDate || !email) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Function to generate 15-minute slots from 9:00 AM to 3:45 PM
    const generateSlots = () => {
      const slots = [];
      let hour = 9;
      let minute = 0;
      while (hour < 16) {
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const time = `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${suffix}`;
        slots.push(time);
        minute += 15;
        if (minute === 60) {
          minute = 0;
          hour += 1;
        }
      }
      return slots;
    };

    // Generate all possible slots for the day
    const allSlots = generateSlots();

    // Find all appointments for this doctor on the selected date
    const appointments = await Appointment.find({
      hospitalName,
      doctorName,
      appointmentDate: {
        $gte: new Date(new Date(appointmentDate).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(appointmentDate).setHours(23, 59, 59, 999)),
      },
    });

    // Map all taken slots for this doctor on the selected date
    const takenSlots = appointments.map(appt => appt.slot);

    // Find an available slot (first one not taken)
    const availableSlot = allSlots.find(slot => !takenSlots.includes(slot));

    // If no slots are available, return a 409 Conflict error
    if (!availableSlot) {
      return res.status(409).json({ message: 'No available slots left for this doctor on this date.' });
    }

    // Generate a token number for the appointment
    const token = appointments.length + 1;

    // Create a new appointment object
    const newAppointment = new Appointment({
      hospitalName,
      doctorName,
      patientName,
      age,
      gender,
      appointmentDate,
      slot: availableSlot, // Set the available slot
      slotTime: availableSlot, // Set the slot time for the receipt
      token,
      email, // Save the email
    });

    // Save the new appointment in the database
    await newAppointment.save();

    // Send confirmation email to the user
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email (configured in mailer.js)
      to: email, // Receiver email
      subject: 'Appointment Confirmation',
      text: `
        Your appointment has been successfully booked!

        Hospital: ${hospitalName}
        Doctor: ${doctorName}
        Patient: ${patientName}
        Age: ${age}
        Gender: ${gender}
        Appointment Date: ${appointmentDate}
        Slot: ${availableSlot}
        Token: ${token}

        Thank you for choosing our services. We look forward to seeing you!
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send email', error: error.message });
      }
      console.log('Email sent: ' + info.response);
    });

    // Return the success message and the new appointment details
    res.status(201).json({
      message: 'Appointment booked successfully!',
      appointment: newAppointment,
    });
  } catch (err) {
    console.error('Error booking appointment:', err);
    res.status(500).json({ message: 'Failed to book appointment', error: err.message });
  }
});

// @route   GET /api/appointment
// @desc    Get all appointments or filter by hospital
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { hospitalName } = req.query;
    const query = {};

    // If the hospital name is provided, filter appointments by hospital
    if (hospitalName) {
      query.hospitalName = hospitalName;
    }

    // Fetch appointments from the database based on the query
    const appointments = await Appointment.find(query);

    // Return the list of appointments as JSON
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Failed to fetch appointments', error: err.message });
  }
});

// @route   DELETE /api/appointment/:id
// @desc    Cancel an appointment
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment canceled successfully' });
  } catch (err) {
    console.error('Error canceling appointment:', err);
    res.status(500).json({ message: 'Failed to cancel appointment', error: err.message });
  }
});

module.exports = router;





