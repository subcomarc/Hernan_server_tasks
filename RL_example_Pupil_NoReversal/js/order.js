// exp - shared data
import {exp} from "./PUPIL_ExpSetting.js"
import {initializeInstructions} from './Instructions/Instructions_Lesson.js'; // This is where we bring the teacher's lesson (which is a promise)


// tasks
import {PUPIL_LearningTask} from "./tasks/PUPIL_LearningTask.js";
import {PUPIL_VButtons2} from "./tasks/PUPIL_VButtons2.js";
import {InstructionsLTp1, InstructionsLTp2, InstructionsLT2, InstructionsProbSlider, Welcome} from "./Instructions/Instructions.js"

// other components
import {getID} from "./components/getID.js";
import {end} from "./components/FinalScreen.js";
import {consentForm} from "./components/dExperimentConsent.js";
import {Quiz} from './components/Quiz.js'; // This is where we bring the teacher's lesson (which is a promise)

// other functions
import {disableF5} from "./functions/usefulFunctions.js";

async function expOrder (){
  let check = exp.expTask;
  switch (check) {
    case 0:
      Welcome.init()
      //exp.expTask++
      break;
    case 1:
      getID(exp)
      //exp.expTask++
      break;
    case 2:
      consentForm.init();
      break;
    case 3:
      InstructionsLTp1.init();
      break;
    case 4:
      InstructionsLTp2.init();
      break;
    case 5:
      // Use initializeInstructions() to get Instructions_FROMTEACHER, time to satisfy the promises AND THEN initialize the instructions
      const instructions_FROMTEACHER = await initializeInstructions();
      instructions_FROMTEACHER.init();
      break;
    case 6:
        Quiz.init();
        break;
    case 7:
      exp.startTimeInsLT = Date.now();
      InstructionsLT2.init();
      break;
    case 8:
      PUPIL_LearningTask.init() ;
      exp.startTimeLT = Date.now();
      break;
      case 9:
        InstructionsProbSlider.init();
         exp.startTimeInsPref = Date.now();
         break;
      case 10:
        PUPIL_VButtons2.init() ;
         exp.startTimePref = Date.now();
         break;
   case 11:
      end(exp);
      exp.startTimeFinal = Date.now();
      break;

    default:
      $('#Stage').html('<p>Error!</p>');

  }
}

export{expOrder}
