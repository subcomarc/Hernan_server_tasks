import {symbols} from "./ToE_LoadSymbols.js";
import {expOrder} from "../order.js";
import {addCanvas,getLastValue,schedule_all} from "../functions/usefulFunctions.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../ToE_ExpSetting.js"
import {endTask} from "../components/TaskEndScreen.js";

var ToE_PreferenceTask = {
    trialState: 0, // starting point for the task
    taskSettings:{
      taskName: 'PreferenceTask',

      maxTrials: 28,//112, // maximum trials in a task
      maxBlockTrials: 1, // maximum trials in a block, if blockTrials == 1 -> no blocks

      fdbMS:0, // time in ms the feedback will be displayed
      borderMS:1000, // timing of the border around the chosen option - shown on its own (before the feedback appears)
      transitionMS: 200, // timing of the white screen inbetween trials

      schedule: _.shuffle(schedule_all(8,"N"))
    },
    trackers: {
      trial: 0, // number of trials
      block: 0,  // between 0 - max unique stimuli combinations shown in the trial
      blockTrial: 0, //  between 0 - max trials in a block
      rt_point: [],  // timepoint of the last click
      tRew: 0, // total reward
    },
    results: {
      sym_ch: [], // chosen symbol
      symID_ch: [], // symbol ID -  the same prob/points for all part, and the same pic for each participant
      p_ch: [],  // probability
      r_ch: [], // reward of the chosen option if lottery wins
      l_ch: [], // loss of the chosen option - if loses
      out_ch: [], // outcome of the chosen option

      sym_un: [],// which symbol was presented as option B
      symID_un: [],
      p_un: [],  // probability
      r_un: [],  // reward of option B - if wins
      l_un: [], // reward of the option B - if loses
      out_un: [],

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
      let sWidth= symbols.S1.image.width
      let sHeight= symbols.S1.image.height
      for (let resp = 0; resp <= 1; resp++){
        addCanvas('#Stage',"myResp"+resp,sWidth,sHeight,"border rounded")
      }

    document.getElementById("ContBox").className = "col-12 mt-3 invisible";
    setTimeout(function(){trialStateMachine()},200)

  }
};
export{ToE_PreferenceTask}

// Set up shortcuts & helpers
var ts = ToE_PreferenceTask.taskSettings;
var rs = ToE_PreferenceTask.results;
var track = ToE_PreferenceTask.trackers;
var state = ToE_PreferenceTask.trialState;
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

  //shortcut for the viewed pair
  var pair = ts.schedule[track.block].pair

  // record time stimuli were shown
  track.rt_point.push(Date.now())

  // Shuffle sides the symbol A and B are presented on
  iside=_.shuffle(iside);


  // Show new stimuli
  drawStim(pair[0],iside[0]);
  drawStim(pair[1],iside[1]);

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
    let pair = ts.schedule[track.block].pair
    let symbolA = symbols['S'+pair[0]]
    let symbolB = symbols['S'+pair[1]]

 // Record RT
    rs.rt.push(Date.now()-track.rt_point[track.rt_point.length-1]);

  // Record response
    rs.respKey.push(parseInt(event.target.id.charAt(6)));
    rs.respKeyID.push(event.target.id);

    let chRespKey = parseInt(event.target.id.charAt(6));

  // Record positioning
  // If the A option was chosen (the same response button as position of option A)
    rs.sym_ch.push((chRespKey == iside[0] ? symbolA.imageID : symbolB.imageID));
    rs.symID_ch.push((chRespKey == iside[0] ? symbolA.id : symbolB.id));
    rs.p_ch.push((chRespKey == iside[0] ? symbolA.prob : symbolB.prob));
    rs.r_ch.push((chRespKey == iside[0] ? symbolA.reward : symbolB.reward));
    rs.l_ch.push((chRespKey == iside[0] ? symbolA.loss : symbolB.loss));

    rs.sym_un.push((chRespKey == iside[1] ? symbolA.imageID : symbolB.imageID));
    rs.symID_un.push((chRespKey == iside[1] ? symbolA.id : symbolB.id));
    rs.p_un.push((chRespKey == iside[1] ? symbolA.prob : symbolB.prob));
    rs.r_un.push((chRespKey == iside[1] ? symbolA.reward : symbolB.reward));
    rs.l_un.push((chRespKey == iside[1] ? symbolA.loss : symbolB.loss));

  // Test for the probability condition, if true add R-value of the chosen option, if not add l-value

    let ran_ch = Math.random()
    rs.out_ch.push(ran_ch > getLastValue(rs.p_ch) ? getLastValue(rs.l_ch) : getLastValue(rs.r_ch))
    rs.tRew = rs.tRew + getLastValue(rs.out_ch)

    let ran_un = Math.random() //math.randomInt(1, 100)
    rs.out_un.push(ran_un > getLastValue(rs.p_un) ? getLastValue(rs.l_un) : getLastValue(rs.r_un))

  // // Add reward - according to the scheme
  //   if(ts.rewardScheme=="symbol"){
  //      rs.tRew = rs.tRew + getLastValue(rs.out_ch)
  //   }else if(ts.rewardScheme=="correct"){
  //      rs.tRew = rs.tRew + ts.rewardForCorrect
  //   }

  // SendtoDB(track.trial)
    sendToDB(0,
    { partID: exp.ID,
      expID: exp.expID,
      tsName: ts.taskName,
      trial: track.trial,
      stim: track.blockTrial,
      block: track.block,
      tsFeedbackTime:ts.fdbMS,
      tsBorderTime: ts.borderMS,
      tsTransitionMS: ts.transitionMS,
      ssPairs: "NA",//Array.isArray(ts.pairs) == true ? "fixed" : "all",
      reactionTime: getLastValue(rs.rt),
      respKey: getLastValue(rs.respKey),
      respKeyID: getLastValue(rs.respKeyID),
      symbolChosen: getLastValue(rs.sym_ch),
      symbolChosenID:getLastValue(rs.symID_ch),
      probChosen: getLastValue(rs.p_ch),
      rewardChosen:getLastValue(rs.r_ch),
      lossChosen:getLastValue(rs.l_ch),
      randomChosen:ran_ch,
      outcomeChosen:getLastValue(rs.out_ch),
      symbolUnchosen:getLastValue(rs.sym_un),
      symbolUnchosenID:getLastValue(rs.symID_un),
      probUnchosen: getLastValue(rs.p_un),
      rewardUnchosen:getLastValue(rs.r_un),
      lossUnchosen:getLastValue(rs.l_un),
      randomUnchosen:ran_un,
      outcomeUnchosen:getLastValue(rs.out_un),
      totalReward:rs.tRew,
      choiceType:symbolA.id < symbolB.id ? symbolA.id+'.'+symbolB.id : symbolB.id+'.'+symbolA.id,
      feedbackType:ts.schedule[track.block].fdb
    },
    'php/InsertDB_Preference.php'
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
//if no feedback should be shown, skip to the next step
      // quick handle for outcome of the chosen and unchosen options
        let fdb_ch = '<div class="col"><H4 align = "center">'+99+'p</H4></div>';
        let fdb_un = '<div class="col"><H4 align = "center">'+99+'p</H4></div>';
      // check if the feedback will be partial or not:
         if(ts.schedule[track.block].fdb == "N"){
           fdb_ch = '<div class="col"><H4 align = "center" >'+'  ?  '+'</H4></div>';
           fdb_un = '<div class="col"><H4 align = "center" >'+'  ?  '+'</H4></div>';
       	}else if(ts.schedule[track.block].fdb == "F"){
          fdb_ch = '<div class="col"><H4 align = "center">'+getLastValue(rs.out_ch)+'p</H4></div>';
      		fdb_un = '<div class="col"><H4 align = "center">'+getLastValue(rs.out_un)+'p</H4></div>';
      	}else if(ts.schedule[track.block].fdb == "P"){// for partial feedback exchange the feedback value for an empty text
          fdb_ch = '<div class="col"><H4 align = "center">'+getLastValue(rs.out_ch)+'p</H4></div>';
      		fdb_un = '<div class="col"><H4 align = "center">'+'    '+'</H4></div>';
      	}

      // Check if the left option was chosen, and if so show the chosen outcome on the left, otherwise show it on the right
       	if (getLastValue(rs.respKey) == 0){ $('#Vals').html(fdb_ch+fdb_un); }
        	else { $('#Vals').html(fdb_un+fdb_ch); }
    //    }

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


  function drawStim(id,isd) {
    let canvas = document.getElementById("myResp"+isd)
    let Ax =  canvas.getContext("2d")
    Ax.drawImage(symbols['S'+id].image,0,0)
    Ax.lineWidth = "5";
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
