// exp - shared data
import {exp} from "./TEACH_ExpSetting.js"


// tasks
import {TEACH_LearningTask} from "./tasks/TEACH_LearningTask.js";
import {TEACH_LearningTraining} from "./tasks/TEACH_LearningTraining.js";
import {TEACH_PreferenceTask} from "./tasks/TEACH_PreferenceTask.js";
// import {TEACH_ValuationTaskOrder} from "./tasks/TEACH_ValuationTaskOrder.js";
// import {TEACH_VSliderDouble} from "./tasks/TEACH_VSliderDouble.js";
// import {TEACH_FamiliarShape} from "./tasks/TEACH_FamiliarShape.js";


// InstructionsLT
// import {InstructionsGeneral,InstructionsLT, InstructionsPreference,
//         InstructionsValuationValence,InstructionsValuationOrder,InstructionsShape,InstructionsColor,
//         Instructions2Sliders,InstructionsEVSlider,InstructionsButtonsOnly} from "./Instructions/Instructions2.js"

import {InstructionsGeneral,InstructionsLT, InstructionsPreference
  } from "./Instructions/Instructions2.js"

// other components
import {getID} from "./components/getID.js";
import {end} from "./components/FinalScreen.js";
import {consentForm} from "./components/dExperimentConsent.js";
import {getFeedback} from "./components/Feedback.js";

// other functions
import {disableF5} from "./functions/usefulFunctions.js";

function expOrder (){
  let check = exp.expTask;
  switch (check) {

    case 0:
      getID(exp)
      exp.expTask++
      break;
    case 1:
      consentForm.init();
      exp.expTask++
      break;
    case 2:
      InstructionsGeneral.init();
      exp.expTask++
      break;
    case 3:
	   // $(document).on("keydown", disableF5);
      exp.startTimeInsLT = Date.now();
      InstructionsLT.init();
      exp.expTask++
      break;
    case 4:
      TEACH_LearningTraining.init() ;
      exp.startTimeLTTrain = Date.now();
      exp.expTask++
      break;
    case 5:
      TEACH_LearningTask.init() ;
      exp.startTimeLT = Date.now();
      exp.expTask++
      break;
    case 6:
      InstructionsPreference.init();
      exp.startTimeInsPref = Date.now();
      exp.expTask++
      break;
    case 7:
      TEACH_PreferenceTask.init() ;
      exp.startTimePref = Date.now();
      exp.expTask++
      break;
  //  case 8:
  //     Instructions2Sliders.init();
  //     exp.startTimeInsVal = Date.now();
  //     exp.expTask++
  //     break;
  //   case 9:
  //     TEACH_VSliderDouble.init() ;
  //     exp.startTimeVal = Date.now();
  //     exp.expTask++
  //     break;
  //   case 10:
  //     InstructionsValuationOrder.init();
  //     exp.startTimeInsVal = Date.now();
  //     exp.expTask++
  //     break;
  //   case 11:
  //     TEACH_ValuationTaskOrder.init() ;
  //     exp.startTimeVal = Date.now();
  //     exp.expTask++
  //     break;
  //   case 12:
  //     InstructionsShape.init();
  //     exp.startTimeInsVal = Date.now();
  //     exp.expTask++
  //     break;
  //   case 13:
  //     TEACH_FamiliarShape.init() ;
  //     exp.startTimeVal = Date.now();
  //     exp.expTask++
  //     break;
    case 8:
      getFeedback(exp)
      exp.startTimeFeedback = Date.now();
      exp.expTask++
      break;
   case 9:
      end(exp);
      exp.startTimeFinal = Date.now();
      break;

    default:
      $('#Stage').html('<p>Error!</p>');

  }
}

export{expOrder}
