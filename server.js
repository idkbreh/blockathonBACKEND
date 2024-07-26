const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'params missing !' });
  }

  try {
    const chatGptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer APIKEY` 
        }
      }
    );

    const message = chatGptResponse.data.choices[0].message.content;
    console.log(message)
    res.json({ message });
  } catch (error) {
    console.error('chatgpt api error :', error);
    res.status(500).json({ error: 'chatgpt error ' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
