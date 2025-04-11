const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const { get } = require("./session"); 
const qrCode = require('./qr');
const pair = require('./pair');

const app = express();
const __path = process.cwd();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__path, 'public')));

// Set pair.html as the main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__path, '/public/pair.html'));
});

// Session route
app.get('/session', async (req, res) => {
    const q = req.query.q;

    if (!q) {
        return res.status(400).json({
            status: false,
            message: 'Query parameter "q" is required.'
        });
    }

    const splitQuery = q.split(';')[1];

    try {
        const result = await get(splitQuery);
        res.json({
            status: true,
            result: result.content
        });
    } catch (error) {
        console.error('Error in /session:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error.',
            error: error.message
        });
    }
});

// Routes
app.use('/qr-code', qrCode);
app.use('/code', pair);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
