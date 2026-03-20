function getMessage() {
  const output = document.getElementById("output");
  output.innerHTML = "<em>Loading...</em>";

  fetch("http://localhost:3000/api/message")
    .then(response => response.json())
    .then(data => {
      output.innerHTML = `
        <div style="color: green; font-weight: bold; margin-bottom: 10px;">✅ Success!</div>
        <p><strong>Message:</strong> ${data.message}</p>
        <p><strong>Course:</strong> ${data.course} (${data.year})</p>
      `;
    })
    .catch(error => {
      output.innerHTML = "<p style='color:red;'>❌ Error: Backend not running!</p>";
    });
}

function getStudent() {
  const output = document.getElementById("output");
  output.innerHTML = "<em>Loading Student Profile...</em>";

  fetch("http://localhost:3000/api/student")
    .then(response => response.json())
    .then(data => {
      // These names (data.status, data.location) must match the server exactly
      output.innerHTML = `
        <div style="color: blue; font-weight: bold; margin-bottom: 10px;">🎓 Student Profile:</div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Location:</strong> ${data.location}, ${data.university}</p>
      `;
    })
    .catch(error => {
      output.innerHTML = "<p style='color:red;'>❌ Error: Could not reach server.</p>";
    });
}