// exp - shared data
import {exp} from "./ToE_ExpSetting.js"


// tasks
import {ToE_LearningTask} from "./tasks/ToE_LearningTask.js";
import {ToE_LearningTraining} from "./tasks/ToE_LearningTraining.js";
import {ToE_PreferenceTask} from "./tasks/ToE_PreferenceTask.js";
import {ToE_ValuationTaskOrder} from "./tasks/ToE_ValuationTaskOrder.js";
import {ToE_VSliderDouble} from "./tasks/ToE_VSliderDouble.js";
import {ToE_FamiliarShape} from "./tasks/ToE_FamiliarShape.js";


// InstructionsLT
import {InstructionsGeneral,InstructionsLT, InstructionsPreference,
        InstructionsValuationValence,InstructionsValuationOrder,InstructionsShape,InstructionsColor,
        Instructions2Sliders,InstructionsEVSlider,InstructionsButtonsOnly} from "./Instructions/Instructions2.js"

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
      ToE_LearningTraining.init() ;
      exp.startTimeLTTrain = Date.now();
      exp.expTask++
      break;
    case 5:
      ToE_LearningTask.init() ;
      exp.startTimeLT = Date.now();
      exp.expTask++
      break;
    case 6:
      InstructionsPreference.init();
      exp.startTimeInsPref = Date.now();
      exp.expTask++
      break;
    case 7:
      ToE_PreferenceTask.init() ;
      exp.startTimePref = Date.now();
      exp.expTask++
      break;
   case 8:
      Instructions2Sliders.init();
      exp.startTimeInsVal = Date.now();
      exp.expTask++
      break;
    case 9:
      ToE_VSliderDouble.init() ;
      exp.startTimeVal = Date.now();
      exp.expTask++
      break;
    case 10:
      InstructionsValuationOrder.init();
      exp.startTimeInsVal = Date.now();
      exp.expTask++
      break;
    case 11:
      ToE_ValuationTaskOrder.init() ;
      exp.startTimeVal = Date.now();
      exp.expTask++
      break;
    case 12:
      InstructionsShape.init();
      exp.startTimeInsVal = Date.now();
      exp.expTask++
      break;
    case 13:
      ToE_FamiliarShape.init() ;
      exp.startTimeVal = Date.now();
      exp.expTask++
      break;
    case 14:
      getFeedback(exp)
      exp.startTimeFeedback = Date.now();
      exp.expTask++
      break;
   case 15:
      end(exp);
      exp.startTimeFinal = Date.now();
      break;

    default:
      $('#Stage').html('<p>Error!</p>');

  }
}

export{expOrder}
