const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const marked = require('marked');
const path = require('path');

// Assuming exp is a shared object; adjust based on your actual implementation
let storedLesson = {}; 

const PathToLesson = path.join(__dirname, "../Lessons/TEACH_WrittenLesson.csv");
const maxProcessCount = 1; // Define the max times a single lesson can be used

async function GetLessons(filePath) {
    const results = await readCsvFile(filePath);
    const rowInfo = selectAndFormatRow(results);
    if (rowInfo) {
        storedLesson.instructionText = marked(rowInfo.formattedInstruction);
        storedLesson.Teacher_ID = rowInfo.Teacher_ID;
        console.log('Formatted and stored instruction text:', storedLesson.instructionText);
        console.log('Stored Teacher_ID:', rowInfo.Teacher_ID);
        await writeDataBack(filePath, results);
    } else {
        console.log("No eligible rows found or no text to format.");
    }
}

function readCsvFile(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

function selectAndFormatRow(data) {
    const eligibleRows = data.filter(row => parseInt(row.ProcessCount, 10) < maxProcessCount);
    if (eligibleRows.length > 0) {
        const randomRow = eligibleRows[Math.floor(Math.random() * eligibleRows.length)];
        randomRow.ProcessCount = (parseInt(randomRow.ProcessCount, 10) + 1).toString();
        
        return {
            formattedInstruction: randomRow.InstructionText,
            Teacher_ID: randomRow.partID
        };
    }
    return null;
}

async function writeDataBack(filePath, data) {
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            {id: 'partID', title: 'partID'},
            {id: 'prolificID', title: 'prolificID'},
            {id: 'ExpID', title: 'ExpID'},
            {id: 'WrittenLesson', title: 'WrittenLesson'},
            {id: 'DBTIME', title: 'DBTIME'},
            {id: 'ProcessCount', title: 'ProcessCount'}
        ]
    });

    await csvWriter.writeRecords(data.map(row => ({
        ...row,
        ProcessCount: row.ProcessCount.toString() // Ensure ProcessCount is a string if required by your CSV structure
    })));
    console.log('The CSV file has been updated.');
}

// Execute the processing directly
GetLessons(PathToLesson).then(() => {
    console.log(storedLesson.instructionText); // This will log after processing is complete
}).catch(console.error);

// Exports, if you still need them for other parts of your application
module.exports = { GetLessons, storedLesson };
