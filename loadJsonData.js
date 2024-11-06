// URL that returns JSON data
// const url = "https://script.google.com/macros/s/AKfycbwTxwmARxYI1Oki41LF-0eYICkMfpzyVBkOdt5dt80evJpoa0dikS77BiONN0H6GhRB/exec";
const url = "https://script.google.com/macros/s/AKfycbwTxwmARxYI1Oki41LF-0eYICkMfpzyVBkOdt5dt80evJpoa0dikS77BiONN0H6GhRB/exec?endpoint=getCourses&courseId=1";

async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json(); // Parse JSON data
        displayData(data.courses); // Call function to display the data
    } catch (error) {
        document.getElementById("dataDisplay").textContent = "Error fetching data.";
        console.error("Fetch error: ", error);
    }
}

// function displayData(data) {
//     // Display the JSON data in a readable format
//     alert(data.courses.length);
//     document.getElementById("dataDisplay").textContent = data.courses.length;//+"_"+ JSON.stringify(data, null, 2);
// }

function displayData(courseData) {
    alert(courseData.length);
    const container = document.getElementById("course-container");
    container.innerHTML = ""; // Clear any existing content

    courseData.forEach(course => {
        // Create a card for each course
        const card = document.createElement("div");
        card.className = "course-card";

        // Add a thumbnail image
        const thumbnail = document.createElement("img");
        thumbnail.src = "data:image/png;base64,data:image/png;base64,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";
        thumbnail.alt = "Course Thumbnail";
        thumbnail.className = "course-thumbnail";
        
        // Add course name as the title
        const title = document.createElement("h2");
        title.className = "course-title";
        title.textContent = course.course_name;
        
        // Add course description
        const description = document.createElement("p");
        description.className = "course-description";
        description.textContent = course.description;
        
        // Add fee with discount (if applicable)
        const fee = document.createElement("p");
        fee.className = "course-fee";
        let discountedFee = course.fee;
        if (course.discount_in_percentage > 0) {
            discountedFee = course.fee * (1 - course.discount_in_percentage / 100);
            fee.innerHTML = `Fee: <span class="original-fee">₹${course.fee}</span> <span class="discounted-fee">₹${discountedFee}</span>`;
        } else {
            fee.textContent = `Fee: ₹${course.fee}`;
        }

        // Add special note if any
        if (course.special_note) {
            const specialNote = document.createElement("p");
            specialNote.className = "special-note";
            specialNote.textContent = course.special_note;
            card.appendChild(specialNote);
        }

        // Append all elements to the card
        card.appendChild(thumbnail);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(fee);

        // Append card to the container
        container.appendChild(card);
    });
}


// Call fetchData on page load
window.onload = fetchData;
