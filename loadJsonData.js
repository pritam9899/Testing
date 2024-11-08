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
        // const thumbnail_Id=extractFileId(course.thumbnail_id);
        // const thumbnail_imgURL=loadDriveFile(thumbnail_Id);
        // const thumbnail = displayImage();//document.createElement("img");
        // // thumbnail.src = thumbnail_imgURL;//"https://i0.wp.com/www.powerbi-influential.com/wp-content/uploads/2022/05/power-bi-april-features.png?res";
        // // thumbnail.alt = "Course Thumbnail";
        // // thumbnail.className = "course-thumbnail";

        // Add a placeholder for the thumbnail image
        const thumbnail = document.createElement("img");
        thumbnail.src = ""; // Placeholder image
        thumbnail.alt = "Course Thumbnail";
        thumbnail.className = "course-thumbnail";
        
        // Load the actual image from Google Drive
        loadDriveFile(extractFileId(course.thumbnail_id), thumbnail);
        
        
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


async function getFileUrl(fileId) {
    // const fileId='1O0KOee9k2JTOt0JLjxnjcfJZ-VCUxOPF';
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzHWOZhn1r6CxXTOgX4CYoaXjUtzEXLF9hrUlWEY5Jv2vSmBDvurk4MYWbfvxZezNz8Uw/exec';

    try {
            const response = await fetch(`${scriptUrl}?fileId=${fileId}`);
            if (!response.ok) throw new Error('Network response was not ok.');
                
            const data = await response.json();
            // document.getElementById("fileUrl").innerText = data.url;
            return data.url;
    } catch (error) {
            console.error('Error fetching file URL:', error);
            document.getElementById("fileUrl").innerText = 'Error fetching file URL.';
    }
}

async function loadDriveFile(fileId, imgElement) {
    const driveUrl = await getFileUrl(fileId);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", driveUrl, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (xhr.status === 200) {
            const mimeType = xhr.response.type;
            const url = URL.createObjectURL(xhr.response);
            if (mimeType.startsWith('image/')) {
                displayImage(url, imgElement);
                displayImage2(url);
            } else {
                console.error('Unsupported file type:', mimeType);
            }
        } else {
            console.error(`Error: ${xhr.status}`);
        }
    };
    xhr.onerror = function () {
        console.error("Network error while retrieving the file.");
    };
    xhr.send();
}

function displayImage(url, imgElement) {
    imgElement.src = url;
    imgElement.alt = "Course Thumbnail";
}


// async function loadDriveFile(fileId) {
//     // const apiKey = 'AIzaSyCIcIXGfsI8NMtAuDmDnOxNNVLkiSKc4Hk'; // Replace with your actual API key
//     const driveUrl = await getFileUrl(fileId);//`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
    
//     const xhr = new XMLHttpRequest();
//           xhr.open("GET", driveUrl, true);
//           xhr.responseType = "blob";  // Fetch as binary large object (Blob)
//           xhr.onload = function () {
//                 if (xhr.status === 200) {
//                     const mimeType = xhr.response.type;  // Get the MIME type of the file
//                     const url = URL.createObjectURL(xhr.response);  // Create a URL for the file
                    
//                     // Determine if it's an image or a video
//                     if (mimeType.startsWith('image/')) {
//                         displayImage(url);
//                         alert("check the display url: "+url);
//                         return url;
//                     // } else if (mimeType.startsWith('video/')) {
//                     //     // displayVideo(url);
//                     // } else {
//                     //     console.error('Unsupported file type:', mimeType);
//                     }
//                 } else {
//                     console.error(`Error: ${xhr.status}`);
//                 }
//           };
//           xhr.onerror = function () {
//             console.error("Network error while retrieving the file.");
//           };
//           xhr.send();
// }

function displayImage2(url) {
    const mediaContainer = document.getElementById('mediaContainerWrapper');
    mediaContainer.innerHTML = '';  // Clear the container
    const img = document.createElement('img');
          img.src = "https://drive.google.com/uc?export=view&"+extractFileId(url);
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
