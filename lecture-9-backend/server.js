const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Route for the main message
app.get('/api/message', (req, res) => {
  res.json({
    message: "Hello from the Node.js backend!",
    course: "Browser Programming",
    year: 2026,
    time: new Date()
  });
});

// Route for Student Info
// Note: We use lowercase 'status', 'university', and 'location'
app.get('/api/student', (req, res) => {
  res.json({
    name: "Sanduni Edirisinghe",
    status: "Student",
    university: "Savonia UAS",
    location: "Kuopio"
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/* Task 4 Answer:
We need a backend because frontend JavaScript is visible to the user, 
making it insecure for sensitive data like passwords. Additionally, 
a backend allows us to connect to databases to store data permanently 
and perform heavy tasks that would otherwise slow down the user's browser.
*/