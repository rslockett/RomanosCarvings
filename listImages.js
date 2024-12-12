const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'assets/images');

// Read the directory and filter for .jpg files
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }
    const jpgFiles = files.filter(file => file.endsWith('.jpg'));
    console.log(JSON.stringify(jpgFiles)); // Output the list as JSON
});