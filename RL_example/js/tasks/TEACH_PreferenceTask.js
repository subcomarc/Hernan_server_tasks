import {symbols} from "./TEACH_LoadSymbols.js";
import {expOrder} from "../order.js";
import {addCanvas,schedule_all_range,drawStim,highlightOption} from "../functions/usefulFunctions.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../TEACH_ExpSetting.js"
import {endTask} from "../components/TaskEndScreen.js";


var TEACH_PreferenceTask = {
    trialState: 0, // starting point for the task
    taskSettings:{
      taskName: 'PrefenceTask',

      maxTrials: 128,//112, // maximum trials in a task
      maxBlockTrials: 8, // maximum trials in a block, if blockTrials == 1 -> no blocks

      fdbMS:1500, // time in ms the feedback will be displayed
      borderMS:500, // timing of the border around the chosen option - shown on its own (before the feedback appears)
      transitionMS: 200, // timing of the white screen inbetween trials

    schedule: schedule_all_range([0,1,2,3,4,5,6,7],fdb:"N")
    //  schedule: _.shuffle([{pair:[0,1],fdb:"N"},
    //      {pair:[2,3],fdb:"N"}, //F us full feedback, P is partial feedback, N is no feedback
    //      {pair:[4,5],fdb:"N"},
    //      {pair:[6,7],fdb:"N"}])
      // schedule: _.shuffle(schedule_all(8,"N"))
    },
    trackers: {
      trial: 0, // number of trials
      block: 0,  // between 0 - max unique stimuli combinations shown in the trial
      blockTrial: 0, //  between 0 - max trials in a block
      rt_point: 0,  // timepoint of the last click
      tRew: 0, // total reward
      iside:  _.shuffle([0,1]), //side for displaying symbols
      symbolA: {}, //current symbol A (first in iside)
      symbolB: {}, //current symbol B (second in iside)
      pair: {} // current symbol pairing

    },
    results: [],

    init: function(){
      // Define main containers needed for the task
      let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
      let c_Vals =  "<div class = 'row justify-content-center' id = 'Vals'> </div>";
      let c_Buttons =  "<div class = 'row justify-content-center' id = 'respButtons'> </div>";
      let c_FinalButton =  "<div class = 'row justify-content-center' id = 'FinalButton'> </div>";

      $('#ContBox').html(c_Stage+c_Vals+c_Buttons+c_FinalButton);

      // Add stimuli pictures to the set up
      let sWidth= symbols[0].image.width
      let sHeight= symbols[0].image.height
      for (let resp = 0; resp <= 1; resp++){
        addCanvas('#Stage',"myResp"+resp,sWidth,sHeight,"border rounded")
      }

    document.getElementById("ContBox").className = "col-12 mt-3 invisible";
    setTimeout(function(){trialStateMachine()},200)

    // reset Symbol tracking
    // symbols.forEach((symbol) => {symbol.track=0})


  }
};
export{TEACH_PreferenceTask}

// Set up shortcuts & helpers
var ts = TEACH_PreferenceTask.taskSettings;
var rs = TEACH_PreferenceTask.results;
var track = TEACH_PreferenceTask.trackers;
var state = TEACH_PreferenceTask.trialState;


// Actions to be repeated each trial
function trialStateMachine(){
  switch (state){
    case 0:
      trialChecks()
      break;
    case 1:
      showStimuli()
       break;
    case 2:
      partChoicePicture()
      break;
    case 3:
      recordResponse()
      break;
    case 4:
      highlightResponse()
      break;
    case 5:
      showFeedback_FullorPart()
      break;
    case 6:
      transitionScreen()
      break;
    case 7:
      trialCounter()
      break;
  }
}



// checks to do before each trial
function trialChecks(){
// if the trial number exceeded maximum number of trials - stop
if(track.trial==(ts.maxTrials)){endTask(track.tRew); return}

//if all trials in a block were shown, start a different block
if(track.blockTrial == ts.maxBlockTrials){track.block++;  track.blockTrial=0 ;}

//if all blocks were shown, but the max trials were not reached, reshufle the block order and start again
if(track.block > ts.schedule.length-1){ts.schedule= _.shuffle(ts.schedule); track.block =0 ;}

// SET PAIRS AND SYMBOLS FOR CURRENT BLOCK
track.pair = ts.schedule[track.block].pair;
track.symbolA = symbols[track.pair[0]];
track.symbolB = symbols[track.pair[1]];

// //update tracking of SYMBOLS
// if(symbols[track.pair[0]].track>=symbols[track.pair[0]].outSchedule.length){
//   symbols[track.pair[0]].outSchedule = _.shuffle(symbols[track.pair[0]].outSchedule)
//   symbols[track.pair[0]].track=0
// }

// if(symbols[track.pair[1]].track>=symbols[track.pair[1]].outSchedule.length){
//   symbols[track.pair[1]].outSchedule = _.shuffle(symbols[track.pair[1]].outSchedule)
//   symbols[track.pair[1]].track=0
// }


state++
trialStateMachine()
}

// show stimuli
function showStimuli(){
  document.getElementById("ContBox").className = "col-12 mt-3 visible" ;

  // record time stimuli were shown
  track.rt_point = Date.now();

  // Shuffle sides the symbol A and B are presented on
  track.iside=_.shuffle(track.iside); // 0 - left, 1 - right, not counterbalanced just randomized to chance


  // Show new stimuli
  drawStim(track.symbolA,"myResp"+track.iside[0]);
  drawStim(track.symbolB,"myResp"+track.iside[1]);

  state++;
  trialStateMachine()}


//enable Choice - choose by clicking on the desired symbol
function partChoicePicture(){
    // When a picture is pressed block clicking (to prevent double click) are record response
  document.getElementById("myResp0").onclick = function(){
    document.getElementById("myResp0").onclick = "";
    document.getElementById("myResp1").onclick = "";

    state++;
    trialStateMachine()};

  document.getElementById("myResp1").onclick = function(){
    document.getElementById("myResp0").onclick = "";
    document.getElementById("myResp1").onclick = "";

    state++;
    trialStateMachine()};
}


//Record Response
function recordResponse() {

  let chRespKey = parseInt(event.target.id.charAt(6));

  // Outcome calculation for Hernan's task
  if (Math.random() < track.symbolA.prob) {
    track.out_A = track.symbolA.reward; }else{
      track.out_A = track.symbolA.loss; }
    
    if (Math.random() < track.symbolB.prob) {
      track.out_B = track.symbolB.reward; }else{
       track.out_B = track.symbolB.loss; }
  


  rs.push({
    partID: exp.ID,
      expID: exp.expID,
      tsName: ts.taskName,
      trial: track.trial,
      stim: track.blockTrial,
      block: track.block,
      tsFeedbackTime:ts.fdbMS,
      tsBorderTime: ts.borderMS,
      tsTransitionMS: ts.transitionMS,
      ssPairs: "NA",
      reactionTime: Date.now()-track.rt_point,
      respKey: parseInt(event.target.id.charAt(6)),
      respKeyID: event.target.id,
      symbolChosen: chRespKey == track.iside[0] ? track.symbolA.imageID : track.symbolB.imageID,
      symbolChosenID: chRespKey == track.iside[0] ? track.symbolA.id : track.symbolB.id,
      probChosen: chRespKey == track.iside[0] ? track.symbolA.prob : track.symbolB.prob,
      rewardChosen: chRespKey == track.iside[0] ? track.symbolA.reward : track.symbolB.reward,
      lossChosen: chRespKey == track.iside[0] ? track.symbolA.loss : track.symbolB.loss,
      randomChosen:99,
      outcomeChosen:chRespKey == track.iside[0] ?  track.out_A : track.out_B ,
      symbolUnchosen:chRespKey == track.iside[1] ? track.symbolA.imageID : track.symbolB.imageID,
      symbolUnchosenID:chRespKey == track.iside[1] ? track.symbolA.id : track.symbolB.id,
      probUnchosen: chRespKey == track.iside[1] ? track.symbolA.prob : track.symbolB.prob,
      rewardUnchosen:chRespKey == track.iside[1] ? track.symbolA.reward : track.symbolB.reward,
      lossUnchosen:chRespKey == track.iside[1] ? track.symbolA.loss : track.symbolB.loss,
      randomUnchosen:99,
      outcomeUnchosen:chRespKey == track.iside[1] ? track.out_A : track.out_B,
      totalReward:track.tRew+(chRespKey == track.iside[0] ? track.out_A : track.out_B),
      choiceType:track.symbolA.id < track.symbolB.id ? track.symbolA.id+'.'+track.symbolB.id : track.symbolB.id+'.'+track.symbolA.id,
      feedbackType:ts.schedule[track.block].fdb
  })

  track.tRew = rs[track.trial].totalReward;


  // SendtoDB(track.trial)
    sendToDB(0,rs[track.trial],'php/InsertDB_Preference.php');

state++;
trialStateMachine()
}

// highlightResponse
function highlightResponse(){
  highlightOption("myResp"+rs[track.trial].respKey)

  setTimeout(function(){state++;trialStateMachine()}, ts.borderMS);
}

function showFeedback_FullorPart(){
// quick handle for outcome of the chosen and unchosen options
  let fdb_ch = '<div class="col"><H4 align = "center">'+rs[track.trial].outcomeChosen+'p</H4></div>';
  let fdb_un = '<div class="col"><H4 align = "center">'+99+'p</H4></div>';

// check if the feedback will be partial or not:
  if(ts.schedule[track.block].fdb == "F"){
      fdb_un = '<div class="col"><H4 align = "center">'+rs[track.trial].outcomeUnchosen+'p</H4></div>';
	}else if(ts.schedule[track.block].fdb == "P"){// for partial feedback exchange the feedback value for an empty text
		fdb_un = '<div class="col"><H4 align = "center">'+'   '+'</H4></div>';
	}else if(ts.schedule[track.block].fdb == "N"){
    fdb_ch = '<div class="col"><H4 align = "center" >'+'  ?  '+'</H4></div>';
    fdb_un = '<div class="col"><H4 align = "center" >'+'  ?  '+'</H4></div>';
  }

// Check if the left option was chosen, and if so show the chosen outcome on the left, otherwise show it on the right
 	if (rs[track.trial].respKey == 0){ $('#Vals').html(fdb_ch+fdb_un); }
  	else { $('#Vals').html(fdb_un+fdb_ch); }

  // After fdbMS ms hide feedback and start the next step
  setTimeout(function(){$('#Vals').empty(),state++;trialStateMachine()}, ts.fdbMS);

}

// show transition screen
function transitionScreen(){
  document.getElementById("ContBox").className = "col-12 mt-3 invisible";
  setTimeout(function(){state++;trialStateMachine()},ts.transitionMS);
 }

 //TrialCounter
function trialCounter(){
  // update symbol tracking only if the symbol was shown
//   if(ts.schedule[track.block].fdb == "F"){
//     track.symbolA.track++
//     track.symbolB.track++
//   }else if(ts.schedule[track.block].fdb == "P"){
//     rs[track.trial].respKey == track.iside[0] ? track.symbolA.track++ : track.symbolB.track++
// }

// Update trial, block and the reset
  track.trial ++
  track.blockTrial ++

  state=0;
  trialStateMachine()
  }
