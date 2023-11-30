import {symbols} from "./ToE_LoadSymbols.js";
import {expOrder} from "../order.js";
import {addCanvas,drawStim} from "../functions/usefulFunctions.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../ToE_ExpSetting.js"
import {endTask} from "../components/TaskEndScreen.js";


var BR_VSlider = {
  trialState: 0, // starting point for the task
  taskSettings:{
    taskName: 'Valuations_ProbSlider',
    maxTrials: 24,//3*8,
    maxBlockTrials: 1,
    borderMS:500,//10,
    transitionMS: 100,
    schedule: _.shuffle([...Array(symbols.length).keys()]),
    prize: 1 // points per correct answer
  },
  trackers: {
    trial: 0, // number of trials
    block: 0,  // between 0 - max unique stimuli combinations shown in the trial
    blockTrial: 0, //  between 0 - max trials in a block
    rt_point: [],  // timepoint of the last click
    tRew: 0, // total reward
    symbol: {}, // current symbol
    respSlide:999,
    clickEnabled: false,

  },
  results: [],

  init: function(){
    // Define main containers needed for the task
    let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
    let c_Slider =  "<div class = 'row justify-content-center mt-5 mr-3 ml-3' id = 'Slider'> </div>";
    let c_FinalButton =  "<div class = 'row justify-content-center mt-5' id = 'FinalButton'> </div>";

    $('#ContBox').html(c_Stage+c_Slider+c_FinalButton);

    addCanvas('#Stage',"IMG",symbols[0].image.width,symbols[0].image.height,"border rounded")

  document.getElementById("ContBox").className = "col-12 mt-3 invisible";
  setTimeout(function(){trialStateMachine()},200)
  }
  };

export {BR_VSlider}


// Set up shortcuts & helpers
var ts = BR_VSlider.taskSettings;
var rs = BR_VSlider.results;
var track = BR_VSlider.trackers;
var state = BR_VSlider.trialState;

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
      recordResponse()
      break;
    case 3:
      transitionScreen()
      break;
    case 4:
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

// Set a symbol for the current block
track.symbol =symbols[ts.schedule[track.block]];

state++
trialStateMachine()
}

//show stimuli
function  showStimuli(){
//  console.log(ts.schedule[track.block])
  // show the content of the screen box
  document.getElementById("ContBox").className = "col-12 mt-3 visible" ;

  // record the time stimuli were shown
  track.rt_point = Date.now();

  // show symbol
  drawStim(track.symbol,"IMG");

  // show the slider - P
  track.initValue = parseFloat(_.sample(_.range(0, 1, 0.05)).toFixed(2))
  track.clickEnabled = true;

  let handle = ' <div id="custom-handle-P" class="ui-slider-handle"></div>'
  $('#Slider').html(handle);

  $('#Slider').slider({
    min: 0,
    max: 1,
    step: 0.05,
    value: track.initValue,
    create: function(event, ui) {
                  jQuery(this).find("#custom-handle-P").text(Math.round(100*track.initValue)+'%')},
    slide: function(event, ui) {
                  let sliderValue = ui.value;
                  jQuery(this).find("#custom-handle-P").text(Math.round(100*sliderValue)+'%');
  }});

  // Submit Button
    let button_Sumbit = '<input align="center" type="button"  class="btn m-2 myBtn" id="respButton" value="Submit" >'
    $('#FinalButton').html(button_Sumbit);

    document.getElementById("respButton").onclick = function(){
      if (track.clickEnabled) {
        // Prevent another button press
        track.clickEnabled= false;

        //save the slider outputs
        track.respSlide= $( "#Slider" ).slider( "value" );
        //console.log(track.respSlide)

        state++;
        trialStateMachine()};
      }
}

  // record responses
function  recordResponse(){
      // Prevent another button press
      track.clickEnabled= false;

      // Differnce between the given and correct response
      // If the response was 10 or less from the correct response --> mark as correct, otherwise mark as false
      let difference = parseFloat(Math.abs(track.symbol.prob-track.respSlide).toFixed(2));
      let respCorrect = difference <= 0.1 ? 1 : 0;
      track.tRew = track.tRew + ts.prize*respCorrect

      rs.push({
          partID: exp.ID,
          expID: exp.expID,
          tsName: ts.taskName,
          trial: track.trial,
          reactionTime: Date.now()-track.rt_point,
          symbol: track.symbol.imageID,
          symbolID: track.symbol.id,
          symbolProb: track.symbol.prob,
          symbolReward: track.symbol.reward,
          symbolEv: track.symbol.reward*track.symbol.prob,
          initProb: track.initValue,
          respProb:track.respSlide,
          respDifference: difference,
          respCorrect: respCorrect,
          trialReward: ts.prize*respCorrect,
          totalReward:track.tRew ,

      })

   //Send to Database
   sendToDB(0,rs[track.trial],'php/InsertDB_VSliderEV.php');

state++;
trialStateMachine()
}

function transitionScreen(){
  document.getElementById("ContBox").className = "col-12 mt-3 invisible";
  $('#Slider').slider( "destroy" );
  setTimeout(function(){state++;trialStateMachine()},ts.transitionMS);
 }

 //TrialCounter
function trialCounter(){
  track.trial ++
  track.blockTrial ++
  state=0;

  ts.resps = _.shuffle(ts.resps)
  trialStateMachine()
  }
