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
      //I'll disable the Next button for a little while here to avoid the user clicking it before the instructions are displayed
      const nextButton = document.getElementById('bNext');
       nextButton.disabled = true;
        setTimeout(() => {
          nextButton.disabled = false;
          }, 5000); // 5000 milliseconds = 5 seconds
      break;
    case 6:
      exp.startTimeInsLT = Date.now();
      InstructionsLT2.init();
      break;
    case 7:
      PUPIL_LearningTask.init() ;
      exp.startTimeLT = Date.now();
      break;
      case 8:
        InstructionsProbSlider.init();
         exp.startTimeInsPref = Date.now();
         break;
      case 9:
        PUPIL_VButtons2.init() ;
         exp.startTimePref = Date.now();
         break;
   case 10:
      end(exp);
      exp.startTimeFinal = Date.now();
      break;

    default:
      $('#Stage').html('<p>Error!</p>');

  }
}

export{expOrder}
