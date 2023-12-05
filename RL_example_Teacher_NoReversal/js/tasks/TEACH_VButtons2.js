import {symbols} from "./TEACH_LoadSymbols.js";
import {expOrder} from "../order.js";
import {addCanvas,drawStim,getLastValue,schedule_all,recursiveSearch} from "../functions/usefulFunctions.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../TEACH_ExpSetting.js"
import {endTask} from "../components/TaskEndScreen.js";

var TEACH_VButtons2 = {
  trialState: 0, // starting point for the task
  taskSettings:{
    taskName: 'ValuationsUnited',
    maxTrials: 16,//3*16,
    maxBlockTrials: 1,
    borderMS:500,//10,
    transitionMS: 100,
    respsR: _.uniq(recursiveSearch(symbols,"reward")).sort(function(a,b){return a-b}),
    respsP: [0,25,50,75,100],
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
    probSelected: false,


  },
  results: {
    symbol: [],//  which symbol was presented
    symbolID: [],//  which symbol was presented
    symbolReward: [],
    symbolProb: [],
    symbolEv: [], // expected value of the symbol

    optionList: [],  // in which order were the responses presented

    respKeyProb: [], // which response matrix was chosen (0-1)
    respKeyReward: [], // which response matrix was chosen (0-1)
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

    respSelR:999,
    respSelP:999,
  },

      init: function(){
        // Define main containers needed for the task
        let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
        let c_Warning =  "<div class = 'mt-2 row justify-content-center invisible' id = 'Warning'> </div>";
        let c_Rews =  "<div class = 'row justify-content-center' id = 'Rews'> </div>";
        let c_Probs =  "<div class = 'row justify-content-center' id = 'Probs'> </div>";
        let c_FinalButton =  "<div class = 'row justify-content-center' id = 'FinalButton'> </div>";

        $('#ContBox').html(c_Stage+c_Warning +c_Rews+c_Probs+c_FinalButton);

        //Add Responses - Rewards
        let k = '<div id="RewsGroup" class="btn-group btn-group-lg" role="group">';
        for (let i=0; i < ts.respsR.length; i++) {
          k = k+`<input type="button" class="btn btn-secondary valResp m-2 rounded shadow-none" id="rews${i}" value=${ts.respsR[i]}p>`;
        }
        $('#Rews').html(k+'</div>')
        $("#RewsGroup input").click(function() {$(this).addClass('active').siblings().removeClass('active');selectReward(this);});


      //Add Responses - PRobs
      let l = '<div id="ProbsGroup" class="btn-group btn-group-lg" role="group">';
      for (let i=0; i < ts.respsP.length; i++) {
        l = l+`<input type="button" class="btn btn-secondary valResp m-2 rounded shadow-none" id="probs${i}" value=${ts.respsP[i]}%>`;
      }
      $('#Probs').html(l+'</div>')
      $("#ProbsGroup input").click(function() {$(this).addClass('active').siblings().removeClass('active');selectProb(this);});

      //Add Stimuli canvas
      // addCanvas('#Stage',"IMG",symbols.S1.image.width,symbols.S1.image.height,"border rounded");
      addCanvas('#Stage',"IMG",symbols[0].image.width,symbols[0].image.height,"border rounded")

      //Add hidden warning message (in case outcome is not selected)
      let WarnText ='<div class="col"><p align = "center" class="text-w">You must select both an outcome and a probability to continue!</p></div>' ;
      $('#Warning').html(WarnText)

      document.getElementById("ContBox").className = "col-12 mt-3 invisible";
      setTimeout(function(){trialStateMachine()},200)
      }
  };

export {TEACH_VButtons2}


// Set up shortcuts & helpers
var ts = TEACH_VButtons2.taskSettings;
var rs = TEACH_VButtons2.results;
var track = TEACH_VButtons2.trackers;
var state = TEACH_VButtons2.trialState;

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

// Set a symbol for the current block
track.symbol =symbols[ts.schedule[track.block]];

state++
trialStateMachine()
}

//show stimuli
function  showStimuli(){
  // allow clicks
  track.clickEnabled = true;

  // show the content of the screen box
  document.getElementById("ContBox").className = "col-12 mt-3 visible" ;

  // record the time stimuli were shown
  track.rt_point.push(_.now());

  // show symbol
  // drawStim(ts.schedule[track.block]);
  drawStim(track.symbol,"IMG");

  // Submit Button
  let button_Sumbit = '<input align="center" type="button"  class="btn m-2 mt-4 myBtn" id="respButton" value="Submit" >'
  $('#FinalButton').html(button_Sumbit);

  document.getElementById("respButton").onclick = function(){
    if (track.clickEnabled&track.probSelected&track.rewSelected){
      // Prevent another button press
      track.clickEnabled= false;
      state++;
      trialStateMachine()}
    else{
      document.getElementById("Warning").className = "mt-2 row justify-content-center visible" ;
    }
        }


}

  // record responses
function  recordResponse(){
      // Prevent another button press
      track.clickEnabled= false;
      track.rewSelected = false;

      // Record RT
      rs.rt.push(_.now()-track.rt_point[track.rt_point.length-1]);

      // presented symbol - shortcut
        let symbol = symbols['S'+ts.schedule[track.block]]
    // Record response and send to DB
    //  rs.respKey.push(parseInt(event.target.id.charAt(6))); // which position was chosen
    //  rs.respKeyID.push(event.target.id); // exact id of the position

      rs.symbolID.push(symbol.id);  // which symbol was presented
      rs.symbol.push(symbol.imageID);  // which symbol was presented
      rs.symbolReward.push(symbol.reward);
      rs.symbolProb.push(symbol.prob);
      rs.symbolEv.push(symbol.reward*symbol.prob);

      rs.respKeyProb.push(rs.respSelP)
      rs.respKeyReward.push(rs.respSelR)
      rs.respReward.push(ts.respsR[rs.respSelR])
      rs.respProb.push(ts.respsP[rs.respSelP])
      rs.respEv.push(rs.respSlideR*rs.respSlideP/100)

      // What was the probablity difference
      let difference = Math.abs(getLastValue(rs.symbolProb)/100-getLastValue(rs.respProb));
      rs.respDifference.push(difference);

      // Was the reward correct?
      if(getLastValue(rs.symbolReward) == getLastValue(rs.respReward)){
        rs.respRewCorrect.push(1);
        rs.rewPoints = 5 ;
      }
      else{
        rs.respRewCorrect.push(0);
        rs.rewPoints = 0 ;
      }

      // Was the probability correct? (i.e. less than 10% from the correct percentage)
      if (difference <= 20){
        rs.respProbCorrect.push(1);
        rs.probPoints = Math.round((20-difference)/4);
      }

      // if the response is more than 20 points from the goal, give 0
      else{
        rs.respProbCorrect.push(0);
        rs.probPoints = 0;
      }

      rs.trialRew = rs.rewPoints + rs.probPoints;
      rs.tRew = rs.tRew+rs.trialRew;
      console.log(rs.trialRew)

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
     respKeyProb:getLastValue(rs.respKeyProb),
     respKeyReward:getLastValue(rs.respKeyReward),
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
'php/InsertDB_V2Buttons.php'
);

state++;
trialStateMachine()
}

function transitionScreen(){
$("#ProbsGroup input").removeClass('active')
$("#RewsGroup input").removeClass('active')

  document.getElementById("ContBox").className = "col-12 mt-3 invisible";
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

function  selectReward(sButton) {

      track.rewSelected=true
      rs.respSelR =parseInt(sButton.id.charAt(4))
    //  console.log(sButton.id.charAt(4))

      // rs.respReward.push(parseInt(sButton.value))
      // console.log(sButton.value)

   if(rs.respSelP != 999 & rs.respSelR != 999){
     document.getElementById("Warning").className = "mt-2 row justify-content-center invisible" ;
  }
}

function  selectProb(sButton) {

    track.probSelected=true
    rs.respSelP =parseInt(sButton.id.charAt(5))
  //  console.log(sButton.id.charAt(5))

    // rs.respProb.push(parseInt(sButton.value))
    // console.log(sButton.value)

 if(rs.respSelP != 999 & rs.respSelR != 999){
   document.getElementById("Warning").className = "mt-2 row justify-content-center invisible" ;
  }
}

function drawStim(id) {
  let canvas = document.getElementById("IMG")
  let Ax =  canvas.getContext("2d")
  Ax.drawImage(symbols['S'+id].image,0,0)
  Ax.lineWidth = "5";
  Ax.strokeStyle = "black";
  Ax.strokeRect(0, 0, canvas.width, canvas.height);
}
