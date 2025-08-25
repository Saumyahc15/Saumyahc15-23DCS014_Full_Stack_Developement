const fs = require('fs');
const path = require('path');

// Path to the log file
const logFilePath = path.join(__dirname, '../logs/error.log');

exports.viewLogs = (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ Error reading log file:', err.message);
      return res.status(500).send(`
        <h1>Error</h1>
        <p>Could not read the log file. Please contact the admin.</p>
      `);
    }

    // Display the logs in <pre> to preserve formatting
    res.send(`
      <h1>Server Error Logs</h1>
      <pre>${data}</pre>
    `);
  });
};
