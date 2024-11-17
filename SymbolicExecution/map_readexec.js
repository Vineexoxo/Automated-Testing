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

    
    console.log("Parsed paths:", paths);
    // Save the paths array to a JSON file
    fs.writeFile('paths.json', JSON.stringify(paths, null, 2), (writeErr) => {
        if (writeErr) {
            console.error("Error writing to paths.json:", writeErr);
        } else {
            console.log("Paths successfully saved to paths.json");
        }
    });
});
