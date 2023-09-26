
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
