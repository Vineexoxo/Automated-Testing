let users = {}; 
let loggedInUsers = {}; 

const NOTSIGNEDUP = 0;
const SIGNEDUP = 1; 
const LOGGEDIN = 2;

let state = NOTSIGNEDUP;
const backendUrl = "https://jsonplaceholder.typicode.com/users"; 

async function signup(username, password) {
    try {

        const response = await fetch(backendUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            return true; 
        } else {
            console.error("Signup failed.");
            return false; 
        }
    } catch (error) {
        console.error("Error during signup:", error);
        return false;
    }
}

async function login(username, password) {
    try {

        const response = await fetch(`${backendUrl}?username=${username}&password=${password}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            return data.length > 0; 
        } else {
            console.error("Login failed.");
            return false; 
        }
    } catch (error) {
        console.error("Error during login:", error);
        return false;
    }
}

(async function () {
    while (true) {
        switch (state) {
            case NOTSIGNEDUP: {
                let username = prompt("Enter a username (at least 3 characters):");
                let password = prompt("Enter a password (at least 8 characters):");


                const signupResult = await signup(username, password);
                if (signupResult) {
                    users[username] = password;
                    console.log("Signup successful!");
                    state = SIGNEDUP;
                } else {
                    console.log("Signup failed. Please try again.");
                }
                continue;
            }

            case SIGNEDUP: {
                let username = prompt("Enter your username to log in:");
                let password = prompt("Enter your password:");


                const loginResult = await login(username, password);
                if (loginResult) {
                    loggedInUsers[username] = true;
                    console.log("Login successful!");
                    state = LOGGEDIN;
                } else {
                    console.log("Invalid username or password. Please try again.");
                }
                continue;
            }

            case LOGGEDIN: {
                console.log("You are now logged in.");
                return;
            }

            default: {
                console.error("Unknown state. Exiting.");
                return; 
            }
        }
    }
})();
