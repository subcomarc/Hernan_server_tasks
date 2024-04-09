// exp - shared data
import {exp} from "./PUPIL_ExpSetting.js"
import {initializeInstructions} from './Instructions/Instructions_Lesson.js'; // Assuming this is the correct path


// tasks
import {PUPIL_LearningTask} from "./tasks/PUPIL_LearningTask.js";
// import {TEACH_LearningTraining} from "./tasks/TEACH_LearningTraining.js";
// import {TEACH_PreferenceTask} from "./tasks/TEACH_PreferenceTask.js";
import {PUPIL_VButtons2} from "./tasks/PUPIL_VButtons2.js";

//before we can continue exporting, we need to fecth the teacher's lessons

// InstructionsLT
// import {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsProbSlider,Welcome} from "./Instructions/Instructions.js"
// import {InstructionsLT, InstructionsLT2, InstructionsLT_Train, InstructionsPreference, InstructionsWriteLesson, Welcome} from "./Instructions/Instructions.js"
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
    // case 4:
    //    Quiz_RL.init();;
    //    break;
    // case 4:
    //   InstructionsLT_Train.init();
    //   break;
    // case 5:
    //   TEACH_LearningTraining.init() ;
    //   exp.startTimeLTTrain = Date.now();
    //   break;
    case 4:
      InstructionsLTp2.init();
      break;
    case 5:
      // Use initializeInstructions() to get Instructions_FROMTEACHER
      const instructions_FROMTEACHER = await initializeInstructions();
      instructions_FROMTEACHER.init();
      break;
    case 6:
      exp.startTimeInsLT = Date.now();
      InstructionsLT2.init();
      break;
    case 7:
      PUPIL_LearningTask.init() ;
      exp.startTimeLT = Date.now();
      break;
    // case 7:
    //   InstructionsPreference.init();
    //   exp.startTimeInsPref = Date.now();
    //   break;
    // case 8:
    //   TEACH_PreferenceTask.init() ;
    //   exp.startTimePref = Date.now();
    //   break;
    // case 9:
    //     InstructionsWriteLesson.init();
    //      exp.startTimeInsPref = Date.now();
    //      break;
    // case 10:
    //   getWrittenLesson(exp)
    //   exp.startTimeWrittenLesson = Date.now();
    //   break;
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
