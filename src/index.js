const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST endpoint

app.post('/bfhl', (req, res) => {
    try {
        const { full_name, dob, college_email, college_roll_number, user_input } = req.body;

        // Generate user_id
        const user_id = `${full_name.toLowerCase().replace(' ', '_')}_${dob.split('-').join('')}`;

        // Separate numbers and alphabets
        const numbers = user_input.filter(item => typeof item === 'number');
        const alphabets = user_input.filter(item => typeof item === 'string' && /^[a-zA-Z]$/.test(item));

        // Find the highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
        const highestLowercase = lowercaseAlphabets.sort().pop() || null;

        // Response object
        const response = {
            is_success: true,
            user_id,
            college_email,
            college_roll_number,
            numbers,
            alphabets,
            highest_lowercase: highestLowercase
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ is_success: false, message: "An error occurred." });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
