const express = require('express');
const router = express.Router();

// Mock contact form submission
router.post('/', (req, res) => {
  const contactData = req.body;
  res.status(200).json({ message: 'Contact form received', data: contactData });
});

module.exports = router;
