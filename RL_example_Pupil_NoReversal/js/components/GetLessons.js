// const MAX_REQUESTS = 3;
// let instructionText = ''; // Variable to store instruction text
// let teacherID = ''; // Variable to store teacher ID

// function GetLessons(call = 0) {
//     $.ajax({
//         type: 'GET',
//         url: 'php/InsertDB_FetchLesson.php',
//         dataType: 'json',
//         success: function(response) {
//             // console.log(response); // Add this to see the raw response, comment otherwise
//             const Lesson = response;
//             // console.log(Lesson); // Add this to see the parsed response response
//             if (!Lesson.error && Lesson.instructionText) {
//                 // console.log('Received instruction text:', Lesson.instructionText); //Add this to see the instruction text, comment otherwise
//                 // Store the data for future use instead of displaying it immediately
//                 instructionText = Lesson.instructionText;
//                 teacherID = Lesson.Teacher_ID;

//                 // Now instructionText and teacherID can be used elsewhere

//             } else if (Lesson.error && (call + 1) < MAX_REQUESTS) {
//                 GetLessons(call + 1); // Retry fetching if there's an issue and haven't hit max retries
//             } else {
//                 console.error('Error fetching instruction text:', Lesson.error);
//             }
//         },
//         error: function() {
//             if ((call + 1) < MAX_REQUESTS) {
//                 GetLessons(call + 1); // Retry on error
//             } else {
//                 alert('Failed to load lesson data. Please try refreshing the page.');
//             }
//         }
//     });
// }

// // Call the function when the document is ready
// $(document).ready(function() {
//     GetLessons(); // Initiate the AJAX call when the document is ready
// });

// export { instructionText, teacherID };



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