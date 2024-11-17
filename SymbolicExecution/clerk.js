const S$ = require("S$"); 

let U = {}; 
let T = {}; 

const NOTSIGNEDUP = 0;
const SIGNEDUP = 1; 
const LOGGEDIN = 2;

let state = NOTSIGNEDUP;

while (true) {
    switch (state) {
        case NOTSIGNEDUP:
            let u = S$.symbol("username", "symbolic_username");
            let p = S$.symbol("password", "symbolic_password");
            S$.assume(p.match(/^[\x00-\x7F]{8,}$/))
            S$.assume(u.match(/^[\x00-\x7F]{8,}$/))
            S$.assume(u && u.length >= 3);
            S$.assume(p && p.length >= 8);
            S$.assume(!(u in U));
            
            U[u] = p;
            let signup_result = S$.symbol("signup_result", "symbolic_signup_result");
            // S$.assume(signup_result === "OK"); // Force successful signup
            
            if (signup_result === "OK") {
                state = SIGNEDUP;
                S$.assert(U[u]===p);
                continue;
            }
            break;

        case SIGNEDUP:
            // Explicitly ensure login conditions
            S$.assume(u in U);
            S$.assume(U[u] === p);
            S$.assume(!(u in T));
            
            let login_result = S$.symbol("login_result", "symbolic_login_result");
            // S$.assume(login_result === "OK"); // Force successful login result
            
            if (login_result === "OK") {
                T[u] = true;
                state = LOGGEDIN;
                continue;
            }
            break;

        case LOGGEDIN:
            S$.assume(u in T);
            break;

        default:
            break;
    }
    break;
}