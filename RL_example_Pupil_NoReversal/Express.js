const express = require('express');
const cors = require('cors');
const { GetLessons } = require('./path/to/GetLessons.js'); // Adjust the path as needed

const app = express();
const PORT = 3000;

// Use CORS for cross-origin allowance if your client is served from a different port or domain
app.use(cors());

app.get('/getLesson', async (req, res) => {
    try {
        // Assuming GetLessons modifies the CSV and updates 'exp'
        await GetLessons(); // Add parameters if needed
        // Send back whatever data is needed, for example, 'exp'
        res.json({ data: exp }); // Adjust according to what you need to send back
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing lessons.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
