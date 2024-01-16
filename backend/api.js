import express from 'express';
import { database } from './database.js';
import cors from "cors";
import bodyParser from 'body-parser';


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

let volunteers = [...database];

app.get('/api/bog/users', (req, res) => {
  res.json(volunteers);
});

app.post('/api/bog/users', (req, res) => {
  const newVolunteer = req.body;
  newVolunteer.id = String(Date.now());
  volunteers.push(newVolunteer);
  res.json(newVolunteer);
});

app.put('/api/bog/users/:id', (req, res) => {
  const volunteerId = req.params.id;
  const updatedVolunteer = req.body;

  volunteers = volunteers.map(volunteer =>
      volunteer.id === volunteerId ? { ...volunteer, ...updatedVolunteer } : volunteer
    );
  res.json(updatedVolunteer);
});

app.delete('/api/bog/users/:id', (req, res) => {
  const volunteerId = req.params.id;
  volunteers = volunteers.filter(volunteer => volunteer.id !== volunteerId);
  res.json({message : 'Volunteer deleted successfully'});
});

// app.get('/api/bog/users/:id', (req, res) => {
//     const user = database.filter((user) => user.id === req.params.id)[0]
//     res.json(user).status(200)
// });


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
