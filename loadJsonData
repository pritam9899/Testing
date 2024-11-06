// URL that returns JSON data
const url = "https://script.google.com/macros/s/AKfycbwTxwmARxYI1Oki41LF-0eYICkMfpzyVBkOdt5dt80evJpoa0dikS77BiONN0H6GhRB/exec";

async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json(); // Parse JSON data
        displayData(data); // Call function to display the data
    } catch (error) {
        document.getElementById("dataDisplay").textContent = "Error fetching data.";
        console.error("Fetch error: ", error);
    }
}

function displayData(data) {
    // Display the JSON data in a readable format
    document.getElementById("dataDisplay").textContent = JSON.stringify(data, null, 2);
}

// Call fetchData on page load
window.onload = fetchData;
