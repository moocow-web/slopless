import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';

const app = express();
const USER_FILE_PATH = './users.json';
const REQUESTS_FILE_PATH = './requests.json';

app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const fileData = await fs.readFile(USER_FILE_PATH, 'utf-8');
    res.status(200).json(JSON.parse(fileData));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users file' });
  }
});


app.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }


    const fileData = await fs.readFile(FILE_PATH, 'utf-8');
    const users = JSON.parse(fileData);

    const newUser = {
      id: Date.now(), 
      name: name
    };
    users.push(newUser);

    await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User saved!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

app.post('/request', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Request name is required' });
    }
    if (!description) {
      return res.status(400).json({ error: 'Request description is required' });
    }

    const fileData = await fs.readFile(REQUESTS_FILE_PATH, 'utf-8');
    const requests = JSON.parse(fileData);

    const newRequest = {
      id: Date.now(),
      name: name,
      description: description
    };
    requests.push(newRequest);

    await fs.writeFile(REQUESTS_FILE_PATH, JSON.stringify(requests, null, 2));

    res.status(201).json({ message: 'Request saved!', request: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save request' });
  }
});
app.get('/requests', async (req, res) => {
  try {
    const fileData = await fs.readFile(REQUESTS_FILE_PATH, 'utf-8');
    res.status(200).json(JSON.parse(fileData));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read requests file' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
