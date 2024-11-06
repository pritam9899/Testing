// URL that returns JSON data
// const url = "https://script.google.com/macros/s/AKfycbwTxwmARxYI1Oki41LF-0eYICkMfpzyVBkOdt5dt80evJpoa0dikS77BiONN0H6GhRB/exec";
const url = "https://script.google.com/macros/s/AKfycbwTxwmARxYI1Oki41LF-0eYICkMfpzyVBkOdt5dt80evJpoa0dikS77BiONN0H6GhRB/exec?endpoint=getCourses&courseId=1";

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

// function displayData(data) {
//     // Display the JSON data in a readable format
//     alert(data.courses.length);
//     document.getElementById("dataDisplay").textContent = data.courses.length;//+"_"+ JSON.stringify(data, null, 2);
// }

function displayData(courseData) {
    const dataforCards=courseData.courses;
    const container = document.getElementById("course-container");
    container.innerHTML = ""; // Clear any existing content

    dataforCards.forEach(course => {
        // Create a card for each course
        const card = document.createElement("div");
        card.className = "course-card";

        // Add a thumbnail image
        const thumbnail = document.createElement("img");
        thumbnail.src = "data:image/png;base64,https://i0.wp.com/www.powerbi-influential.com/wp-content/uploads/2022/05/power-bi-april-features.png?res";
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
