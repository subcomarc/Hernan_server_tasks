import {symbols} from "./TEACH_LoadSymbols.js";
import {expOrder} from "../order.js";
import {addCanvas,getLastValue,schedule_all,recursiveSearch} from "../functions/usefulFunctions.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../TEACH_ExpSetting.js"
import {endTask} from "../components/TaskEndScreen.js";

var TEACH_VSliderDouble = {
  trialState: 0, // starting point for the task
  taskSettings:{
    taskName: 'ValuationsUnited',
    maxTrials: 8,//3*16,
    maxBlockTrials: 1,
    borderMS:500,//10,
    transitionMS: 100,
    schedule: _.shuffle([...Array(symbols.nStim).keys()])
  },
  trackers: {
    trial: 0, // number of trials
    block: 0,  // between 0 - max unique stimuli combinations shown in the trial
    blockTrial: 0, //  between 0 - max trials in a block
    rt_point: [],  // timepoint of the last click
    tRew: 0, // total reward
    clickEnabled: false,
    rewSelected: false,

  },
  results: {
    symbol: [],//  which symbol was presented
    symbolID: [],//  which symbol was presented
    symbolReward: [],
    symbolProb: [],
    symbolEv: [], // expected value of the symbol

    optionList: [],  // in which order were the responses presented

    initP:0,
    initR:0,

    respKey: [], // which response matrix was chosen (0-1)
    respReward: [], // which reward was selected
    respProb: [], // which probablity was selected
    respEv: [], // expected value chosen by participant
    respDifference: [], // how close was the response Probability to the correct Probability

    respRewCorrect: [], // was the chosen Reward response correct?
    respProbCorrect: [], // was the chosen Probability response correct?

    rt: [],  // reaction times

    tRew: 0, // total reward
    rewPoints:0,
    probPoints:0,
    trialRew:0,// reward each trial

    respSlide_P:999,
    respSlide_R:999,
  },

      init: function(){
        // Define main containers needed for the task
        let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
        let c_Slider_R =  "<div class = 'row justify-content-center mt-5 mr-3 ml-3' id = 'Slider_R'> </div>";
        let c_Slider_P =  "<div class = 'row justify-content-center  mt-5 mr-3 ml-3' id = 'Slider_P'> </div>";
        let c_FinalButton =  "<div class = 'row justify-content-center mt-5' id = 'FinalButton'> </div>";

        $('#ContBox').html(c_Stage+c_Slider_R+c_Slider_P+c_FinalButton);

        addCanvas('#Stage',"IMG",symbols.S1.image.width,symbols.S1.image.height,"border rounded")

      document.getElementById("ContBox").className = "col-12 mt-3 invisible";
      setTimeout(function(){trialStateMachine()},200)
      }
  };

export {TEACH_VSliderDouble}


// Set up shortcuts & helpers
var ts = TEACH_VSliderDouble.taskSettings;
var rs = TEACH_VSliderDouble.results;
var track = TEACH_VSliderDouble.trackers;
var state = TEACH_VSliderDouble.trialState;

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
if(track.trial==(ts.maxTrials)){endTask(rs.tRew); return}

//if all trials in a block were shown, start a different block
if(track.blockTrial == ts.maxBlockTrials){track.block++;  track.blockTrial=0 ;}

//if all blocks were shown, but the max trials were not reached, reshufle the block order and start again
if(track.block > ts.schedule.length-1){ts.schedule= _.shuffle(ts.schedule); track.block =0 ;}

state++
trialStateMachine()
}

//show stimuli
function  showStimuli(){
  track.clickEnabled= true;

  console.log('S'+ts.schedule[track.block])
  // show the content of the screen box
  document.getElementById("ContBox").className = "col-12 mt-3 visible" ;

  // record the time stimuli were shown
  track.rt_point.push(_.now());

  // show symbol
  drawStim(ts.schedule[track.block]);


  // show the slider - P
  let handle = ' <div id="custom-handle-P" class="ui-slider-handle"></div>'
  $('#Slider_P').html(handle);

  rs.initP = _.sample(_.range(0, 100, 5));
  $('#Slider_P').slider({
    min: 0,
    max: 100.0,
    step: 5,
    value: rs.initP,
    create: function(event, ui) {
                  jQuery(this).find("#custom-handle-P").text(rs.initP+'%')},
    slide: function(event, ui) {
                  let sliderValue = ui.value;
                  jQuery(this).find("#custom-handle-P").text(sliderValue+'%');
  }});


  // show the slider - R
  let handleR = ' <div id="custom-handle-R" class="ui-slider-handle"></div>'
  $('#Slider_R').html(handleR);

  rs.initR = _.sample(_.range(-100, 100, 10));
  $('#Slider_R').slider({
    min: -100.0,
    max: 100.0,
    step: 10,
    value:  rs.initR,
    create: function(event, ui) {
                  jQuery(this).find("#custom-handle-R").text(rs.initR+'p')},
    slide: function(event, ui) {
                  jQuery(this).find("#custom-handle-R").text(ui.value+'p');
  }});

// Submit Button
  let button_Sumbit = '<input align="center" type="button"  class="btn m-2 myBtn" id="respButton" value="Submit" >'
  $('#FinalButton').html(button_Sumbit);

  document.getElementById("respButton").onclick = function(){
    if (track.clickEnabled) {
      // Prevent another button press
      track.clickEnabled= false;

      //save the slider outputs
      rs.respSlide_R= $( "#Slider_R" ).slider( "value" );
      rs.respSlide_P= $( "#Slider_P" ).slider( "value" );
      console.log(rs.respSlide_R,rs.respSlide_P)

      state++;
      trialStateMachine()};
    }



}

  // record responses
function  recordResponse(){
      // Record RT
      rs.rt.push(_.now()-track.rt_point[track.rt_point.length-1]);

      // presneted symbol - shortcut
        let symbol = symbols['S'+ts.schedule[track.block]]
    // Record response and send to DB
    //  rs.respKey.push(parseInt(event.target.id.charAt(6))); // which position was chosen
    //  rs.respKeyID.push(event.target.id); // exact id of the position

      rs.symbolID.push(symbol.id);  // which symbol was presented
      rs.symbol.push(symbol.imageID);  // which symbol was presented
      rs.symbolReward.push(symbol.reward);
      rs.symbolProb.push(symbol.prob);
      rs.symbolEv.push(symbol.reward*symbol.prob);

      rs.respReward.push(rs.respSlide_R);
      rs.respProb.push(rs.respSlide_P/100);
      rs.respEv.push(rs.respSlide_R*rs.respSlide_P/100);

      // Was the prob response correct(i.e. less than 20% from the correct number)
      let differenceP = Math.abs(getLastValue(rs.symbolProb)-getLastValue(rs.respProb));

      if (differenceP <= 0.20){
        rs.respProbCorrect.push(1);
        rs.probPoints = Math.round((20-100*differenceP)/4);
      }

      // if the response is more than 20 points from the goal, give 0
      else{
        rs.respProbCorrect.push(0);
        rs.probPoints = 0;
      }


      // Was the reward response correct(i.e. less than 20% from the correct number)
      let differenceR = Math.abs(getLastValue(rs.symbolReward)-getLastValue(rs.respReward));

      if (differenceR <= 20){
        rs.respRewCorrect.push(1);
        rs.probPoints = Math.round((20-differenceR)/4);
      }

      // if the response is more than 20 points from the goal, give 0
      else{
        rs.respRewCorrect.push(0);
        rs.probPoints = 0;
      }
      rs.trialRew = rs.rewPoints + rs.probPoints;
      rs.tRew = rs.tRew+rs.trialRew;

   //Send to Database
   sendToDB(0,
   { partID: exp.ID,
     expID: exp.expID,
     tsName: ts.taskName,
     trial: rs.trial,
     reactionTime: getLastValue(rs.rt),
     symbol: getLastValue(rs.symbol),
     symbolID: getLastValue(rs.symbolID),
     symbolProb: getLastValue(rs.symbolProb),
     symbolReward:getLastValue(rs.symbolReward),
     symbolEv:getLastValue(rs.symbolEv),
     respKey:getLastValue(rs.respKey),
     initProb: rs.initP,
     initRew: rs.initR,
     respProb:getLastValue(rs.respProb),
     respReward:getLastValue(rs.respReward),
     respEv:getLastValue(rs.respEv),
     respDifference:getLastValue(rs.respDifference),
     respRewCorrect:getLastValue(rs.respRewCorrect),
     respProbCorrect:getLastValue(rs.respProbCorrect),
     totalReward:rs.tRew,
     trialReward:rs.trialRew,
     probPoints: rs.probPoints,
     rewPoints: rs.rewPoints},
'php/InsertDB_V2Sliders.php'
);

state++;
trialStateMachine()
}

function transitionScreen(){
  document.getElementById("ContBox").className = "col-12 mt-3 invisible";

  $('#Slider_P').slider( "destroy" );
  $('#Slider_R').slider( "destroy" );
  setTimeout(function(){state++;trialStateMachine()},ts.transitionMS);
 }

 //TrialCounter
function trialCounter(){
  track.trial ++
  track.blockTrial ++
  state=0;

  trialStateMachine()
  }

  function drawStim(id) {
    let canvas = document.getElementById("IMG")
    let Ax =  canvas.getContext("2d")
    Ax.drawImage(symbols['S'+id].image,0,0)
    Ax.lineWidth = "5";
    Ax.strokeStyle = "black";
    Ax.strokeRect(0, 0, canvas.width, canvas.height);
  }
