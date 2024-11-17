const fs = require('fs');
const { spawn } = require('child_process');

let paths = [];

fs.readFile('map.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const lines = data.split('\n');

    lines.forEach(line => {
        const jsonMatch = line.match(/\{.*\}/);
        if (jsonMatch) {
            try {
                const jsonData = JSON.parse(jsonMatch[0]);
                paths.push(jsonData);
            } catch (e) {
                console.error("Could not parse JSON in line:", line);
            }
        }
    });

    // Remove the first index of paths array
    paths.shift();  // This removes the first element from the array

    console.log("Parsed paths:", paths);
});

// Export the paths array without the first element
module.exports = { paths };
