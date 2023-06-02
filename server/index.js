const express = require('express');
const path = require('path');
const utils = require('./utils');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json())
// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle API endpoint to generate and send the e-certificate
app.post('/api/generate-certificate', (req, res) => {
  // Extract name and email from the request body
  const { name, email } = req.body;

  // Generate the e-certificate
  const generatedCertificate = utils.generateCertificate(name);

  // Send the e-certificate as a PDF attachment to the provided email
  utils.sendCertificate(email, generatedCertificate);

  res.status(201).json("E-Certificate sent successfully to your email!");
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
