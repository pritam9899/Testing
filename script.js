// Mock login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (username === "user" && password === "password") {  // Mock credentials
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        displayLogout();
    } else {
        message.textContent = "Invalid credentials. Try again!";
    }
}

// Display logout section
function displayLogout() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("logoutForm").style.display = "block";
    document.getElementById("title").textContent = "Welcome";
    document.getElementById("user").textContent = localStorage.getItem("username");
    document.getElementById("message").textContent = "";
}

// Logout function
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("logoutForm").style.display = "none";
    document.getElementById("title").textContent = "Login";
}

// Check if user is logged in
window.onload = function() {
    if (localStorage.getItem("isLoggedIn")) {
        displayLogout();
    }
};
