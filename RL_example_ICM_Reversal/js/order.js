// exp - shared data
import {exp} from "./BREATH_RL_ExpSetting.js"


// tasks
import {BREATH_RL_LearningTask} from "./tasks/BREATH_RL_LearningTask.js";
import {BREATH_RL_LearningTraining} from "./tasks/BREATH_RL_LearningTraining.js";
import {BREATH_RL_PreferenceTask} from "./tasks/BREATH_RL_PreferenceTask.js";
// import {BR_VSlider} from "./tasks/BR_VSlider.js";

// InstructionsLT
// import {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsProbSlider,Welcome} from "./Instructions/Instructions.js"
import {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsStartDyspnoea,Welcome} from "./Instructions/Instructions.js"

// other components
import {getID} from "./components/getID.js";
import {end} from "./components/FinalScreen.js";
import {consentForm} from "./components/dExperimentConsent.js";
// import {getFeedback} from "./components/Feedback.js";
 import {getWrittenLesson} from "./components/WriteLesson.js";
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
      BREATH_RL_LearningTraining.init() ;
      exp.startTimeLTTrain = Date.now();
      break;
    case 6:
      exp.startTimeInsLT = Date.now();
      InstructionsLT2.init();
      break;
    case 7:
      BREATH_RL_LearningTask.init() ;
      exp.startTimeLT = Date.now();
      break;
    case 8:
      InstructionsPreference.init();
      exp.startTimeInsPref = Date.now();
      break;
    case 9:
      BREATH_RL_PreferenceTask.init() ;
      exp.startTimePref = Date.now();
      break;
    case 10:
      InstructionsStartDyspnoea.init();
       exp.startTimeInsPref = Date.now();
       break;
    // case 12:
    //   BR_VSlider.init() ;
    //   exp.startTimePref = Date.now();
    //   break;
    // case 11:
    //   getWrittenLesson(exp)
    //   exp.startTimeWrittenLesson = Date.now();
    //   break;
    case 11:
      LaunchDyspnoea(exp)
      exp.startTimeLaunchDyspnoea = Date.now();
      break;
   case 12:
      end(exp);
      exp.startTimeFinal = Date.now();
      break;

    default:
      $('#Stage').html('<p>Error!</p>');

  }
}

export{expOrder}
