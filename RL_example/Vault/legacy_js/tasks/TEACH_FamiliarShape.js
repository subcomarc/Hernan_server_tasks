import {symbols,fSymbols} from "./TEACH_LoadSymbols.js";
import {expOrder} from "../order.js";
import {addCanvas,getLastValue,recursiveSearch} from "../functions/usefulFunctions.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../TEACH_ExpSetting.js"
import {endTask} from "../components/TaskEndScreen.js";


var TEACH_FamiliarShape = {
    trialState: 0, // starting point for the task
    taskSettings:{
      taskName: 'Familiar',

      maxTrials: 16,//112, // maximum trials in a task
      maxBlockTrials: 1, // maximum trials in a block, if blockTrials == 1 -> no blocks

      fdbMS:2000, // time in ms the feedback will be displayed
      borderMS:1000, // timing of the border around the chosen option - shown on its own (before the feedback appears)
      transitionMS: 200, // timing of the white screen inbetween trials

      schedule: _.shuffle([...Array(symbols.nStim).keys()])
    },
    trackers: {
      trial: 0, // number of trials
      block: 0,  // between 0 - max unique stimuli combinations shown in the trial
      blockTrial: 0, //  between 0 - max trials in a block
      rt_point: [],  // timepoint of the last click
      tRew: 0, // total reward
    },
    results: {
      sym_cor: [], // chosen symbol
      symID_cor: [], // symbol ID -  the same prob/points for all part, and the same pic for each participant
      p_cor: [],  // probability
      r_cor: [], // reward of the chosen option if lottery wins
      l_cor: [], // loss of the chosen option - if loses

      sym_f: [],// which symbol was presented as option B
      resp_cor: [],

      respKey: [], // which response matrix was chosen (0-1)
      respKeyID: [], // ID of the pressed item - also includes buttons, and other clickable objects

      rt: [],  // reaction times
      rt_point: [],  // actual timepoints of each click

      tRew: 0, // total reward
  },
    init: function(){
      // Define main containers needed for the task
      let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
      let c_Vals =  "<div class = 'row justify-content-center' id = 'Vals'> </div>";
      let c_Buttons =  "<div class = 'row justify-content-center' id = 'respButtons'> </div>";
      let c_FinalButton =  "<div class = 'row justify-content-center' id = 'FinalButton'> </div>";

      $('#ContBox').html(c_Stage+c_Vals+c_Buttons+c_FinalButton);

      // Add stimuli pictures to the set up
      let sWidth= symbols.S1.imageBW.width
      let sHeight= symbols.S1.imageBW.height
      for (let resp = 0; resp <= 1; resp++){
        addCanvas('#Stage',"myResp"+resp,sWidth,sHeight,"border rounded")
      }

    document.getElementById("ContBox").className = "col-12 mt-3 invisible";
    setTimeout(function(){trialStateMachine()},200)


  }
};
export{TEACH_FamiliarShape}

// Set up shortcuts & helpers
var ts = TEACH_FamiliarShape.taskSettings;
var rs = TEACH_FamiliarShape.results;
var track = TEACH_FamiliarShape.trackers;
var state = TEACH_FamiliarShape.trialState;
var iside = _.shuffle([0,1])

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
      transitionScreen()
      break;
    case 6:
      trialCounter()
      break;
  }
}



// checks to do before each trial
function trialChecks(){
// if the trial number exceeded maximum number of trials - stop
if(track.trial==(ts.maxTrials)){endTask(rs.tRew); return}

//if all trials in a block were shown, start a different block
if(track.blockTrial == ts.maxBlockTrials){track.block++;  track.blockTrial=0 ;}

//if all blocks were shown, but the max trials were not reached, reshufle the block order and start again
if(track.block > ts.schedule.length-1){ts.schedule= _.shuffle(ts.schedule); track.block =0 ;}

state++
trialStateMachine()
}

// show stimuli
function showStimuli(){
  document.getElementById("ContBox").className = "col-12 mt-3 visible" ;

  // record time stimuli were shown
  track.rt_point.push(Date.now())

  // Shuffle sides the symbol A and B are presented on
  iside=_.shuffle(iside);


  // Show new stimuli
  drawStim(symbols,ts.schedule[track.block],iside[0]);
  drawStim(fSymbols,ts.schedule[track.block],iside[1]);

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
    let pair = ts.schedule[track.block]
    let symbolA = symbols['S'+pair]
    let symbolB = fSymbols['S'+pair]

 // Record RT
    rs.rt.push(Date.now()-track.rt_point[track.rt_point.length-1]);

  // Record response
    rs.respKey.push(parseInt(event.target.id.charAt(6)));
    rs.respKeyID.push(event.target.id);

    let chRespKey = parseInt(event.target.id.charAt(6));

  // Record positioning
  // If the A option was chosen (the same response button as position of option A)
    rs.sym_cor.push(symbolA.imageID);
    rs.symID_cor.push(symbolA.id);
    rs.p_cor.push(symbolA.prob);
    rs.r_cor.push(symbolA.reward);
    rs.l_cor.push(symbolA.loss);

    rs.sym_f.push(symbolB.imageID);
    rs.resp_cor.push(chRespKey == iside[0] ? 1 : 0)
    rs.tRew = rs.tRew + 90*getLastValue(rs.resp_cor)    // record reward so far


  // SendtoDB(track.trial)
    sendToDB(0,
    {  partID: exp.ID,
      expID: exp.expID,
      tsName: ts.taskName,
      trial: track.trial,
      tsBorderTime: ts.borderMS,
      tsTransitionMS: ts.transitionMS,
      reactionTime: getLastValue(rs.rt),
      respKey: getLastValue(rs.respKey),
      symbol: getLastValue(rs.sym_cor),
      symbolID:getLastValue(rs.symID_cor),
      symbolProb: getLastValue(  rs.p_cor),
      symbolReward:getLastValue(rs.r_cor),
      DecoyImage:getLastValue(rs.sym_f),
      respCor:getLastValue(rs.resp_cor),
      totalReward:rs.tRew,
    },
    'php/InsertDB_FamShape.php'
);
state++;
trialStateMachine()
}

// highlightResponse
function highlightResponse(){
  highlightOption("myResp"+getLastValue(rs.respKey))

  setTimeout(function(){state++;trialStateMachine()}, ts.borderMS);
}

function showFeedback_FullorPart(){
// quick handle for outcome of the chosen and unchosen options
  let fdb_ch = '<div class="col"><H4 align = "center">'+getLastValue(rs.out_ch)+'p</H4></div>';
  let fdb_un = '<div class="col"><H4 align = "center">'+99+'p</H4></div>';

// check if the feedback will be partial or not:
  	if(ts.schedule[track.block].fdb == "F"){
		fdb_un = '<div class="col"><H4 align = "center">'+getLastValue(rs.out_un)+'p</H4></div>';
	}else if(ts.schedule[track.block].fdb == "P"){// for partial feedback exchange the feedback value for an empty text
		fdb_un = '<div class="col"><H4 align = "center">'+'   '+'</H4></div>';
	}

// Check if the left option was chosen, and if so show the chosen outcome on the left, otherwise show it on the right
 	if (getLastValue(rs.respKey) == 0){ $('#Vals').html(fdb_ch+fdb_un); }
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
  track.trial ++
  track.blockTrial ++
  state=0;
  trialStateMachine()
  }


  function drawStim(obj,id,isd) {
    let canvas = document.getElementById("myResp"+isd)
    let Ax =  canvas.getContext("2d")
    Ax.drawImage(obj['S'+id].imageBW,0,0)
    Ax.lineWidth = "10";
    Ax.strokeStyle = "black";
    Ax.strokeRect(0, 0, canvas.width, canvas.height);
  }


function highlightOption(optionId) {
  let canvas = document.getElementById(optionId)
  let Ax =  canvas.getContext("2d")
  Ax.lineWidth = "25";
  Ax.strokeStyle = "black";
  Ax.strokeRect(0, 0, canvas.width, canvas.height);
}
