const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/humanize', async (req, res) => {
    const { text } = req.body;
    try {
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama3-70b-8192",
            messages: [
                { role: "system", content: "You are a human writer. Rewrite the text to sound natural and human-like. Use varied sentence structures. Avoid AI patterns." },
                { role: "user", content: text }
            ]
        }, {
            headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}` }
        });
        res.json({ result: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "API Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
