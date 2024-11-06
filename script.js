// Mock login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (username === "user" && password === "password") {  // Mock credentials
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        displayLogout();
        document.getElementById("username").value="";
        document.getElementById("password").value="";
        message.textContent = "";
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
    window.open("https://script.google.com/macros/s/AKfycbwTxwmARxYI1Oki41LF-0eYICkMfpzyVBkOdt5dt80evJpoa0dikS77BiONN0H6GhRB/exec");
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
