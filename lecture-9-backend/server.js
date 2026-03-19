/* Task 4 Answer:
We need a backend because frontend JavaScript is visible to the user, making it 
insecure for sensitive data like passwords. Additionally, a backend allows us to 
connect to databases to store data permanently and perform heavy tasks that 
would otherwise slow down the user's browser.
*/


const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

// Task 2 Endpoint
app.get("/api/message", (req, res) => {
  res.json({
    message: "My first API works!",
    course: "Browser Programming",
    year: 2026
  });
});

// Task 3 Endpoint
app.get("/api/student", (req, res) => {
  res.json({
    name: "Sanduni Edirisinghe",
    role: "Student"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});