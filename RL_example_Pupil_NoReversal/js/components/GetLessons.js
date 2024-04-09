const MAX_REQUESTS = 3;

function GetLessons(call = 0) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'php/InsertDB_FetchLesson.php',
            dataType: 'json',
            success: function(response) {
                const Lesson = response;
                if (!Lesson.error && Lesson.instructionText) {
                    // Resolve the promise with the fetched data
                    resolve({
                        instructionText: Lesson.instructionText,
                        teacherID: Lesson.Teacher_ID
                    });
                } else if (Lesson.error && (call + 1) < MAX_REQUESTS) {
                    // Try to fetch the lessons again if an error occurred but the max request limit hasn't been reached
                    resolve(GetLessons(call + 1)); // Use resolve here to ensure the retry's promise is connected
                } else {
                    // Reject the promise if an unrecoverable error occurs
                    reject(new Error('Error fetching instruction text: ' + Lesson.error));
                }
            },
            error: function(xhr, status, error) {
                if ((call + 1) < MAX_REQUESTS) {
                    // Retry on AJAX error
                    resolve(GetLessons(call + 1)); // Similarly, connect the retry promise
                } else {
                    // If all retries fail, reject the promise
                    reject(new Error('Failed to load lesson data after ' + MAX_REQUESTS + ' attempts'));
                }
            }
        });
    });
}

// Export the function that fetches lessons
export { GetLessons };