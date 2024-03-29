// exp - shared data
import {exp} from "./BREATH_RL_ExpSetting.js"


// tasks
// import {BREATH_RL_LearningTask} from "./tasks/BREATH_RL_LearningTask.js";
//  import {BREATH_RL_LearningTraining} from "./tasks/BREATH_RL_LearningTraining.js";
// import {BREATH_RL_PreferenceTask} from "./tasks/BREATH_RL_PreferenceTask.js";
// import {BR_VSlider} from "./tasks/BR_VSlider.js";


// InstructionsLT
// import {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsProbSlider,Welcome} from "./Instructions/Instructions.js"
import {InstructionsLT,InstructionsLT2,InstructionsLT3,InstructionsLT_Train, InstructionsStartDyspnoea,Welcome} from "./Instructions/Instructions.js"

// other components
import {getID} from "./components/getID.js";
import {end} from "./components/FinalScreen.js";
import {consentForm} from "./components/dExperimentConsent.js";
// import {getFeedback} from "./components/Feedback.js";
 import {LaunchDyspnoea} from "./components/LaunchDyspnoea.js";
// import {Quiz} from "./components/Quiz.js";

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
      InstructionsLT.init();
      break;
    // case 4:
    //   Quiz.init();;
    //   break;
    case 4:
      InstructionsLT_Train.init();
      const { BREATH_RL_LoadSymbols } = await import('./tasks/BREATH_RL_LoadSymbols.js');
      break;
    case 5:
      const { BREATH_RL_LearningTraining } = await import('./tasks/BREATH_RL_LearningTraining.js');
      BREATH_RL_LearningTraining.init() ;
      exp.startTimeLTTrain = Date.now();
      break;
    // case 6:
    //   if(exp.Group == 'V'){
    //     InstructionsStartDyspnoea.init();
    //     exp.startTimeInsPref = Date.now();
    //     break;
    //   }else{exp.startTimeInsLT = Date.now(); InstructionsLT2.init(); exp.expTask=exp.expTask+2;break}
    case 6:
        InstructionsStartDyspnoea.init();
        exp.startTimeInsPref = Date.now();
        break;
    //  case 7:
    //   if(exp.Group == 'V'){
    //     LaunchDyspnoea(exp)
    //     exp.startTimeLaunchDyspnoea = Date.now();
    //     break;
    //   }else{break;}
    case 7:
        LaunchDyspnoea(exp)
        exp.startTimeLaunchDyspnoea = Date.now();
        break;
    case 8:
      exp.startTimeInsLT = Date.now();
      InstructionsLT2.init();
      break;
    case 9:
      const { BREATH_RL_LearningTask } = await import('./tasks/BREATH_RL_LearningTask.js');
      BREATH_RL_LearningTask.init() ;
      exp.startTimeLT = Date.now();
      break;
    case 10:
      exp.startTimeInsLT = Date.now();
      InstructionsLT3.init();
      break;
    case 11:
      const { BREATH_VButtons2 } = await import('./tasks/BREATH_VButtons2.js');
      BREATH_VButtons2.init() ;
      exp.startTimeLT3 = Date.now();
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
