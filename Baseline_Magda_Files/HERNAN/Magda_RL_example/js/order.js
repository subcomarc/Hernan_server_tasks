// exp - shared data
import {exp} from "./TEACH_ExpSetting.js"


// tasks
import {TEACH_LearningTask} from "./tasks/TEACH_LearningTask.js";
import {TEACH_LearningTraining} from "./tasks/TEACH_LearningTraining.js";
import {TEACH_PreferenceTask} from "./tasks/TEACH_PreferenceTask.js";
// import {BR_VSlider} from "./tasks/BR_VSlider.js";

// InstructionsLT
// import {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsProbSlider,Welcome} from "./Instructions/Instructions.js"
import {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference,Welcome} from "./Instructions/Instructions.js"

// other components
import {getID} from "./components/getID.js";
import {end} from "./components/FinalScreen.js";
import {consentForm} from "./components/dExperimentConsent.js";
import {getFeedback} from "./components/Feedback.js";
// import {Quiz} from "./components/Quiz.js";

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
      InstructionsLT.init();
      break;
    // case 4:
    //   Quiz.init();;
    //   break;
    case 4:
      InstructionsLT_Train.init();
      break;
    case 5:
      TEACH_LearningTraining.init() ;
      exp.startTimeLTTrain = Date.now();
      break;
    case 6:
      exp.startTimeInsLT = Date.now();
      InstructionsLT2.init();
      break;
    case 7:
      TEACH_LearningTask.init() ;
      exp.startTimeLT = Date.now();
      break;
    case 8:
      InstructionsPreference.init();
      exp.startTimeInsPref = Date.now();
      break;
    case 9:
      TEACH_PreferenceTask.init() ;
      exp.startTimePref = Date.now();
      break;
    // case 11:
    //   InstructionsProbSlider.init();
    //   exp.startTimeInsPref = Date.now();
    //   break;
    // case 12:
    //   BR_VSlider.init() ;
    //   exp.startTimePref = Date.now();
    //   break;
    case 10:
      getFeedback(exp)
      exp.startTimeFeedback = Date.now();
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
