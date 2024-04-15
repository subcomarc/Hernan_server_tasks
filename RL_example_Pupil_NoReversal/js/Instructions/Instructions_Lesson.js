// THIS WORKS BECAUSE GetLessons.js RETURNS A PROMISE THAT RESOLVES TO AN OBJECT WITH THE INSTRUCTION TEXT AND TEACHER ID
import { GetLessons } from '../components/GetLessons.js';
import { Instructions } from "./dInstructions.js";
import {exp} from "../PUPIL_ExpSetting.js"


// Placeholder for the asynchronously initialized Instructions_FROMTEACHER object
let instructionsPromise = null;

function initializeInstructions() {
    if (!instructionsPromise) {
        instructionsPromise = GetLessons().then(({ LessonText, teacherID }) => {
          exp.teacherID = teacherID;
          exp.LessonText = LessonText;
            const Instructions_FROMTEACHER = new Instructions({
                nextText: "Next",
                textInstructions: [//page0
                    ["<h2>Explanations from the teacher</h2>",
                     "You are about to read the explanations the previous player left just for you. ",
                     "Pay attention to the strategies and tips they share with you. Click whenever you are ready!"],
                     //page 
                    [LessonText], // This is the fetched instruction text
                ]
            });
            return Instructions_FROMTEACHER; // Return the initialized Instructions object
        }).catch(error => {
            console.error('Initialization failed:', error);
            throw error; // Rethrow the error to prevent the promise from resolving successfully
        });
    }
    return instructionsPromise;
}

export { initializeInstructions };