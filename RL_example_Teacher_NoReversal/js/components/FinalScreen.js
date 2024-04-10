import {sendToDB} from "../functions/sendToDB.js";
import {points2pounds} from "../functions/usefulFunctions.js";

function end(exp){

let rew = exp.totalReward
let time = Date.now()-exp.startTime;

  // SET UP NEEDED DIVS
  let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
  let c_FinalButton =  "<div class = 'row justify-content-center' id = 'FinalButton'> </div>";

  $('#ContBox').html(c_Stage+c_FinalButton);

	// send final reward to the database
	sendToDB(0,
        	{ partID: exp.ID,
            prolificID: exp.PID,
            expID: exp.expID,
          	rewardPoints: rew,
            rewardPounds: points2pounds(rew,exp.rate),
          	totalTime: time},
        'php/InsertDB_General.php'
    );


      // Write on the matrix end of the trial
      var Title = '<h3 align = "center" style="color: #3C455C;"> End </h3>'
      var EndText ='<div class="col"><h3 align = "center"> <br> You have made it to the end of the experiment!</h3>  ' +
                  '<p align = "center" ><br> Congratulations!  <br></p>' +
                  //  '<p align = "center" > During the task, you won points equivalent to &pound ' + points2pounds(rew,exp.rate)  +' </p>' +
                  // // '<p align = "center" ><b> You won ' + rew +' points! </b></p>' +
                  // '<p align = "center" > <b> However, remember that this is not your bonus, as you will be paid the bonus of your pupil instead. You will also receive the full designated fixed compensation advertised in the study. </b></p><br><br>'
                  '<p align = "center" > You will receive the full designated fixed compensation of 3 pounds/hour. During the task, you also won several points. <b> However, remember that this points won\'t count towards your bonus, since you will be paid the bonus of your pupil instead.  </b> </p>' +
                  '<p align = "center" > This additional bonus will be paid within one to three weeks. </p>' +
                  // '<p align = "center" ><b> You won ' + rew +' points! </b></p>' +
                  '<p align = "center" > </p><br><br>'

        //$('#Top').html('<div class="row justify-content-center">'+Title+'</div>');
        $('#Stage').html('<div class="row justify-content-center">'+EndText+'</div>');

        let Buttons = '<div align="col m-5"><a href='+ exp.link +' class="btn btn-default myBtn">Return to Prolific</a></div>';
        $('#FinalButton').html(Buttons);

    }

export {end}
