// exp - shared data
import {exp} from "./PUPIL_ExpSetting.js"


// tasks
import {TEACH_LearningTask} from "./tasks/PUPIL_LearningTask.js";
// import {TEACH_LearningTraining} from "./tasks/TEACH_LearningTraining.js";
// import {TEACH_PreferenceTask} from "./tasks/TEACH_PreferenceTask.js";
import {TEACH_VButtons2} from "./tasks/PUPIL_VButtons2.js";

// InstructionsLT
// import {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsProbSlider,Welcome} from "./Instructions/Instructions.js"
// import {InstructionsLT, InstructionsLT2, InstructionsLT_Train, InstructionsPreference, InstructionsWriteLesson, Welcome} from "./Instructions/Instructions.js"
import {InstructionsLTp1, InstructionsLTp2, InstructionsLT2, InstructionsWriteLesson, InstructionsProbSlider, Welcome} from "./Instructions/Instructions.js"


// other components
import {getID} from "./components/getID.js";
import {end} from "./components/FinalScreen.js";
import {consentForm} from "./components/dExperimentConsent.js";
// import {getFeedback} from "./components/Feedback.js";
import {getWrittenLesson} from "./components/WriteLesson.js";
import {Quiz} from "./components/Quiz.js";
import {Quiz_RL} from "./components/Quiz_RL.js";

// other functions
import {disableF5} from "./functions/usefulFunctions.js";

function expOrder (){
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
       Quiz_RL.init();;
       break;
    // case 4:
    //   InstructionsLT_Train.init();
    //   break;
    // case 5:
    //   TEACH_LearningTraining.init() ;
    //   exp.startTimeLTTrain = Date.now();
    //   break;
    case 5:
      InstructionsLTp2.init();
      break;
    case 6:
       Quiz.init();;
       break;
    case 7:
      exp.startTimeInsLT = Date.now();
      InstructionsLT2.init();
      break;
    case 8:
      TEACH_LearningTask.init() ;
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
    case 9:
        InstructionsWriteLesson.init();
         exp.startTimeInsPref = Date.now();
         break;
    case 10:
      getWrittenLesson(exp)
      exp.startTimeWrittenLesson = Date.now();
      break;
      case 11:
        InstructionsProbSlider.init();
         exp.startTimeInsPref = Date.now();
         break;
      case 12:
        TEACH_VButtons2.init() ;
         exp.startTimePref = Date.now();
         break;
   case 13:
      end(exp);
      exp.startTimeFinal = Date.now();
      break;

    default:
      $('#Stage').html('<p>Error!</p>');

  }
}

export{expOrder}
