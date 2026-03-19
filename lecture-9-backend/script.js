function getMessage() {
  const output = document.getElementById("output");
  
  // 1. Add Loading Text
  output.innerHTML = "<em>Loading message from server...</em>";

  fetch("http://localhost:3000/api/message")
    .then(response => {
      // Check if the server actually sent a 'success' response
      if (!response.ok) {
        throw new Error("Server is not responding correctly");
      }
      return response.json();
    })
    .then(data => {
      // 2. Format the Date (Bonus)
      // data.time comes as a long string like 2026-03-19T12:57...
      // We convert it to a readable Finnish/European format
      const rawDate = new Date(data.time);
      const formattedTime = rawDate.toLocaleTimeString('en-GB'); // e.g., 14:30:05
      const formattedDate = rawDate.toLocaleDateString('en-GB'); // e.g., 19/03/2026

      // 3. Update the UI with formatted data
      output.innerHTML = `
        <div style="color: green; font-weight: bold;">✅ Success!</div>
        <strong>Message:</strong> ${data.message} <br>
        <strong>Course:</strong> ${data.course} <br>
        <strong>Year:</strong> ${data.year} <br>
        <hr>
        <small>Fetched on ${formattedDate} at ${formattedTime}</small>
      `;
    })
    .catch(error => {
      // 4. Add Error Message (Bonus)
      console.error("Fetch error:", error);
      output.innerHTML = `
        <div style="color: red; font-weight: bold;">❌ Error:</div>
        <p>Could not connect to the backend. Is your terminal running 'node server.js'?</p>
      `;
    });
}

// Keep your getStudent function as it was, or apply similar logic!