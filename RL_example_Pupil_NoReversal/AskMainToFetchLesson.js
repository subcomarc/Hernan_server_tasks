// Instructions.js
async function fetchStoredLesson() {
    try {
        // Adjust the URL to match your server's endpoint for fetching the stored lesson
        const response = await fetch('http://localhost:3000/getLesson');
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        return data.storedLesson; // Assuming the server sends back JSON with storedLesson
    } catch (error) {
        console.error("Failed to fetch stored lesson:", error);
        return null; // Handle the error as appropriate for your application
    }
}

async function displayStoredLesson() {
    const storedLesson = await fetchStoredLesson();
    if (storedLesson) {
        console.log('Retrieved stored lesson:', storedLesson);
        // Now you can use storedLesson as needed, e.g., display it in the UI
        document.getElementById('lessonContainer').textContent = storedLesson.instructionText; // Example
    }
}

// Assuming you want to run this when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayStoredLesson();
});
