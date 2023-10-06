import {expOrder} from "../order.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../BREATH_RL_ExpSetting.js"

function getWrittenLesson(exp){
  let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
  let c_FinalButton =  "<div class = 'row justify-content-center' id = 'FinalButton'> </div>";

  $('#ContBox').html(c_Stage+c_FinalButton);



let Prompt = '<form><div class="form-group">'+
              '<label for="freeText">'+
                    'Please write your lesson for your future pupil in the box below.' +
              '</label>'+
              '<textarea class="form-control" id="freeText" rows="15"></textarea>'+
              '</div>'+
              '<form>';

let Buttons = '<div align="col m-5"><input align="left" type="button"  class="btn btn-default rounded myBtn" id="bSubmit" value="Next"></div>';

$('#Stage').html(Prompt);
$('#FinalButton').html(Buttons);


$('#bSubmit').click(function(){
  exp.WrittenLesson = document.getElementById('freeText').value;
  sendToDB(0,
        	{ partID: exp.ID,
            prolificID: exp.PID,
          	expID: exp.expID,
          	WrittenLesson: exp.WrittenLesson},
        'php/InsertDB_WrittenLesson.php')
  exp.expTask++;
  expOrder();
})
}

export {getWrittenLesson}
