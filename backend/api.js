import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { database } from './database.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

let volunteers = [...database];

// // Middleware to check if a valid token is present
// const checkToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: Missing token' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, 'your-secret-key');
//     req.user = decoded.user;

//     // Check if the route is under /api
//     if (req.path.startsWith('/api')) {
//       // This route requires authentication
//       next();
//     } else {
//       // Routes under /api are protected, but other routes are not
//       return res.status(401).json({ message: 'Unauthorized: Invalid token for this route' });
//     }
//   } catch (error) {
//     return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//   }
// };
// Protected route
app.get('/profile', (req, res) => {
  res.json(req.user);
});

// existing routes
app.get('/api/bog/users', (req, res) => {
  res.json(volunteers);
});

app.post('/api/bog/users', (req, res) => {
  const newVolunteer = req.body;
  newVolunteer.id = String(Date.now());
  volunteers.push(newVolunteer);
  res.json(newVolunteer);
});

app.put('/api/bog/users/:id',  (req, res) => {
  const volunteerId = req.params.id;
  const updatedVolunteer = req.body;

  volunteers = volunteers.map((volunteer) =>
    volunteer.id === volunteerId ? { ...volunteer, ...updatedVolunteer } : volunteer
  );
  res.json(updatedVolunteer);
});

app.delete('/api/bog/users/:id',  (req, res) => {
  const volunteerId = req.params.id;
  volunteers = volunteers.filter((volunteer) => volunteer.id !== volunteerId);
  res.json({ message: 'Volunteer deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
