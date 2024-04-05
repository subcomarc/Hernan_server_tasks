// to add to Main.js
async function fetchLesson() {
    try {
        const response = await fetch('http://localhost:3000/getLesson');
        const { data } = await response.json();
        console.log('Lesson data:', data);
        // Do something with the data, e.g., display it in the HTML
        document.getElementById('Stage').textContent = data.instructionText; // Example usage
    } catch (error) {
        console.error('Failed to fetch lesson:', error);
    }
}

// Call fetchLesson to run when the page loads or based on some other event
fetchLesson();
