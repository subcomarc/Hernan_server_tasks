import {exp} from "../PUPIL_ExpSetting.js"

const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const marked = require('marked');

const PathToLesson = ".../Lessons/TEACH_WrittenLesson.csv"
const maxProcessCount = 1; // Define the max times a single lesson can be used

async function GetLessons(filePath) {
    const results = await readCsvFile(filePath);
    const rowInfo = selectAndFormatRow(results); // rowInfo now receives an object
    if (rowInfo) {
        exp.instructionText = rowInfo.formattedInstruction;
        exp.Teacher_ID = rowInfo.Teacher_ID; // Store selected teaching partID in exp for later use
        console.log('Formatted and stored instruction text:', exp.instructionText);
        console.log('Stored partID:', exp.partID); // Log or use partID as needed
        await writeDataBack(filePath, results);
    } else {
        console.log("No eligible rows found or no text to format.");
    }
}
function readCsvFile(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
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
        
               // Format the instruction text and return it along with partID
               return {
                formattedInstruction: marked(randomRow.InstructionText),
                Teacher_ID: randomRow.partID
            };
    }
    return null;
}

async function writeDataBack(filePath, data) {
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            {id: 'partID', title: 'partID'}, // Adjust based on your CSV structure
            {id: 'prolificID', title: 'prolificID'},
            {id: 'ExpID', title: 'ExpID'},
            {id: 'WrittenLesson', title: 'WrittenLesson'},
            {id: 'DBTIME', title: 'DBTIME'},
            {id: 'ProcessCount', title: 'ProcessCount'}
            // Add other columns as necessary
        ]
    });

    await csvWriter.writeRecords(data);
    console.log('The CSV file has been updated.');
}

// Execute the processing
GetLessons(PathToLesson).then(() => {
    // Use exp.instructionText here or in any subsequent code
    console.log(exp.instructionText);
}).catch(console.error);