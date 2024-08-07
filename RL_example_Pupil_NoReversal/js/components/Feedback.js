import {expOrder} from "../order.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../PUPIL_ExpSetting.js"

function getFeedback(exp){
  let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
  let c_FinalButton =  "<div class = 'row justify-content-center' id = 'FinalButton'> </div>";

  $('#ContBox').html(c_Stage+c_FinalButton);



let Prompt = '<form><div class="form-group">'+
              '<label for="freeText">'+
                    'Please write your lesson in the box below.' +
      	            'Was there anything you liked/disliked about the task? Anything you found difficult or confusing? '+
      	            'Please, let us know!' +
              '</label>'+
              '<textarea class="form-control" id="freeText" rows="15"></textarea>'+
              '</div>'+
              '<form>';

let Buttons = '<div align="col m-5"><input align="left" type="button"  class="btn btn-default rounded myBtn" id="bSubmit" value="Next"></div>';

$('#Stage').html(Prompt);
$('#FinalButton').html(Buttons);


$('#bSubmit').click(function(){
  exp.feedback = document.getElementById('freeText').value;
  sendToDB(0,
        	{ partID: exp.ID,
            prolificID: exp.PID,
          	expID: exp.expID,
          	feedback: exp.feedback},
        'php/InsertDB_Feedback.php')
  exp.expTask++;
  expOrder();
})
}

export {getFeedback}
