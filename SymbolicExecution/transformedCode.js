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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
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
      method: "GET"
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
      case NOTSIGNEDUP:
        {
          let username = S$.symbol("username", "symbolic_username");
          let password = S$.symbol("password", "symbolic_password");
          const signupResult = S$.symbol("signup_result", "symbolic_signup_result");
          if (signupResult) {
            users[username] = password;
            console.log("Signup successful!");
            state = SIGNEDUP;
          } else {
            console.log("Signup failed. Please try again.");
          }
          continue;
        }
      case SIGNEDUP:
        {
          let username = S$.symbol("username", "symbolic_username");
          let password = S$.symbol("password", "symbolic_password");
          const loginResult = S$.symbol("login_result", "symbolic_login_result");
          if (loginResult) {
            loggedInUsers[username] = true;
            console.log("Login successful!");
            state = LOGGEDIN;
          } else {
            console.log("Invalid username or password. Please try again.");
          }
          continue;
        }
      case LOGGEDIN:
        {
          console.log("You are now logged in.");
          return;
        }
      default:
        {
          console.error("Unknown state. Exiting.");
          return;
        }
    }
  }
})();