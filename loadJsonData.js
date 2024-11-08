// URL that returns JSON data
// const url = "https://script.google.com/macros/s/AKfycbwTxwmARxYI1Oki41LF-0eYICkMfpzyVBkOdt5dt80evJpoa0dikS77BiONN0H6GhRB/exec";
const url = "https://script.google.com/macros/s/AKfycbzMfZGcTojXBQpWsI8k1MHHEHh-KN-Z7mZaraMNB1AfbleeBNzsSmM2CFvd4picNjXf/exec?endpoint=getCourses&courseId=1";

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
        thumbnail.src = "https://i0.wp.com/www.powerbi-influential.com/wp-content/uploads/2022/05/power-bi-april-features.png?res";
        thumbnail.alt = "Course Thumbnail";
        thumbnail.className = "course-thumbnail";
        
        // Add course name as the title
        const title = document.createElement("h2");
        title.className = "course-title";
        title.textContent = course.course_name;
        
        // Add course description
        const description = document.createElement("p");
        description.className = "course-description";
        description.textContent = course.description+"\n"+extractFileId(course.thumbnail_id);
        
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

function displayMedia(){

}

async function getFileUrl(fileURL) {
    const fileId='1O0KOee9k2JTOt0JLjxnjcfJZ-VCUxOPF';
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzHWOZhn1r6CxXTOgX4CYoaXjUtzEXLF9hrUlWEY5Jv2vSmBDvurk4MYWbfvxZezNz8Uw/exec';

    try {
            const response = await fetch(`${scriptUrl}?fileId=${fileId}`);
            if (!response.ok) throw new Error('Network response was not ok.');
                
            const data = await response.json();
            document.getElementById("fileUrl").innerText = data.url;
            return data.url;
    } catch (error) {
            console.error('Error fetching file URL:', error);
            document.getElementById("fileUrl").innerText = 'Error fetching file URL.';
    }
}

function displayImage(url) {
    const mediaContainer = document.getElementById('mediaContainerWrapper');
    mediaContainer.innerHTML = '';  // Clear the container
    const img = document.createElement('img');
          img.src = url;
          img.alt = "Loaded Image";
          img.style.maxWidth = "100%";
          mediaContainer.appendChild(img);
}

function extractFileId(url) {
  const regex = /\/d\/(.*?)\/view/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// function displayVideo(url) {
//     const mediaContainer = document.getElementById('mediaContainerWrapper');
//           mediaContainer.innerHTML = '';  // Clear the container
//     const video = document.createElement('video');
//           video.src = url;
//           video.controls = true;  // Enable controls
//           video.autoplay = true;  // Autoplay video
//           video.style.maxWidth = "100%";
//           mediaContainer.appendChild(video);
// }

// Call fetchData on page load
window.onload = fetchData;
