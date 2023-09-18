import {symbols} from "./ToE_LoadSymbols.js";
import {expOrder} from "../order.js";
import {addCanvas,getLastValue,schedule_all,recursiveSearch} from "../functions/usefulFunctions.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../ToE_ExpSetting.js"
import {endTask} from "../components/TaskEndScreen.js";

var ToE_ValuationTaskOrder = {
  trialState: 0, // starting point for the task
  taskSettings:{
    taskName: 'ValuationsOrder',
    maxTrials: 16,//3*16,
    maxBlockTrials: 1,
    borderMS:500,//10,
    transitionMS: 100,
    //resps: _.uniq(recursiveSearch(symbols,"image"))
  },
  trackers: {
    trial: 0, // number of trials
    block: 0,  // between 0 - max unique stimuli combinations shown in the trial
    blockTrial: 0, //  between 0 - max trials in a block
    rt_point: [],  // timepoint of the last click
    tRew: 0, // total reward

  },
  results: {
    symbol: [],//  which symbol was presented
    symbolID: [],//  which symbol was presented
    symbolReward: [],
    symbolProb: [],
    symbolEv: [], // expected value of the symbol

    respKey: [], // which response matrix was chosen (0-1)
    respValence: [], // which reward was selected

    respCor: [], // was the chosen Reward response correct?

    rt: [],  // reaction times

    tRew: 0, // total reward
    rewPoints:0,
    trialRew:0,// reward each trial
  },

      init: function(){
        // Define main containers needed for the task
        let c_origin =  "<div class = 'row justify-content-center' id = 'origin'> </div>";
        let c_dropzone =  "<div class = 'row justify-content-center' id = 'dropZone' style='min-height: 25vh;'></div>";
        let c_stage =  "<div class = 'row justify-content-center' id = 'Stage'></div>";
        let c_gameButton =  "<div class = 'row justify-content-center' id = 'GameButton'></div>";

          $('#ContBox').html(c_stage+c_dropzone+c_origin+c_gameButton);

        setTimeout(function(){trialStateMachine()},100)
      }
  };

export {ToE_ValuationTaskOrder}


// Set up shortcuts & helpers
var ts = ToE_ValuationTaskOrder.taskSettings;
var rs = ToE_ValuationTaskOrder.results;
var track = ToE_ValuationTaskOrder.trackers;
var state = ToE_ValuationTaskOrder.trialState;

// Actions to be repeated each trial
function trialStateMachine(){
  switch (state){
    case 0:
      showStimuli()
      break;
    case 1:
      recordResponse()
      break;
    case 2:
      endTask(rs.tRew);
      break;
  }
}

//show stimuli
function  showStimuli(){
  // show the content of the screen box
  document.getElementById("ContBox").className = "col-12 mt-3 visible" ;

  // record the time stimuli were shown
  track.rt_point.push(_.now());


  // ORIGIN - subdivide the main containers as needed
   let dragAll = new Array;
   for (let i = 0; i <= symbols.nStim-1; i++){
      dragAll[i] ='<div class="col"><div align = "center" id="draggable-'+i+
                   '" class="mt-2 rounded symDrag">  <img src="'+symbols['S'+i].image.src+
                   '" draggable="true" ondragstart="drag(event)" id="drag'+i+'" width="100" height="100" class="rounded">' +'</div></div>';
   }

   // Shuffle order in which are the symbols presented
   dragAll= _.shuffle(dragAll);
   $('#origin').html(dragAll);

   // DROPZONE - subdivide the main containers as needed

   let dropAll = new Array;
   for (let i = 0; i <= symbols.nStim-1; i++){
     let endings = ['st','nd','rd'].concat(Array(symbols.nStim-3).fill('th'))

     dropAll[i] ='<div class="col"><div align = "center" id="drop-' +i+
                 '"  div class="mt-2 rounded symDrop" ondrop="drop(event)" ondragover="allowDrop(event)">'
                 +(i+1)+endings[i]+' best'+'</div></div>';

   }

   $('#dropZone').html(dropAll);

   // BUTTONS
   let buttonNext = '<input align="center" type="button"  class="btn btn-default myBtn mt-5 m-2" id="bSubmit" value="Submit" >';
   let buttonBack = '<input align="center" type="button"  class="btn btn-default myBtn mt-5 m-2" id="bRestart" value="Restart" >';

    $('#Bottom').html(buttonBack+buttonNext);

    document.getElementById("bRestart").onclick = function(){ToE_ValuationTaskOrder.init()};
    document.getElementById("bSubmit").onclick = function(){
        let nCount = new Array
        for (let i = 0; i <= symbols.nStim-1; i++){
          let k = 'drop-'+i;
          nCount[i] = document.getElementById(k).childElementCount;
        }

        let correct = nCount.filter(n => n == 1)
        if(correct.length==symbols.nStim){
          state++;
          trialStateMachine();
          $('#Bottom').empty();}

        else {
          $('#Stage').html('<div class="col"><p align = "center" class="text-w">Each box must have one symbol in it!</p></div>');
        }
   }

}

  // record responses
function  recordResponse(){

      console.log("recordResponse")
      // Record RT
      rs.rt.push(_.now()-track.rt_point[track.rt_point.length-1]);

            // Record response and send to DB
        let symID = new Array
        let sym = new Array
        for (let i = 0; i <= symbols.nStim-1; i++){
          let k = 'drop-'+i;
          symID[i]  = document.getElementById(k).children[0].id.substring(4, 5);
          sym[i] = symbols['S'+symID[i]].imageID

          if(i==symID[i]){rs.tRew = rs.tRew+10;}
        }


       //Send to Database
       sendToDB(0,
       { partID: exp.ID,
         expID: exp.expID,
         tsName: ts.taskName,
         reactionTime: getLastValue(rs.rt),
         rate_sym_0: sym[0],
         rate_sym_1: sym[1],
         rate_sym_2: sym[2],
         rate_sym_3: sym[3],
         rate_sym_4: sym[4],
         rate_sym_5: sym[5],
         rate_sym_6: sym[6],
         rate_sym_7: sym[7],
         rate_symID_0: symID[0],
         rate_symID_1: symID[1],
         rate_symID_2: symID[2],
         rate_symID_3: symID[3],
         rate_symID_4: symID[4],
         rate_symID_5: symID[5],
         rate_symID_6: symID[6],
         rate_symID_7: symID[7],

    },
    'php/InsertDB_Order.php');



        state++;
        trialStateMachine();
    }


    function drawMat2(reward,id,size) {
       var canvas = document.getElementById(id);
       var Ax = canvas.getContext("2d");
       Ax.font = "20px Arial"; // Comic Sans MS
       Ax.fillStyle = "black";
       Ax.textAlign = "center";
       Ax.fillText(reward, canvas.width/2, canvas.height/2+10);
       Ax.lineWidth = "21";
       Ax.strokeStyle = "white";
       Ax.strokeRect(0, 0, canvas.width, canvas.height);
       Ax.lineWidth = "5";
       Ax.strokeStyle = "black";
       Ax.strokeRect(0, 0, canvas.width, canvas.height);
     }

  function clearCanvas(id) {
     let canvas = document.getElementById(id);
     let context = canvas.getContext('2d');
     context.clearRect(0, 0, canvas.width, canvas.height);
}
