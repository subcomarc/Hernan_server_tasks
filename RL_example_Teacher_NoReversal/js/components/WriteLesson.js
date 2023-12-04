import {expOrder} from "../order.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../TEACH_ExpSetting.js"

function getWrittenLesson(exp){
  let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
  let c_FinalButton =  "<div class = 'row justify-content-center' id = 'FinalButton'> </div>";

  $('#ContBox').html(c_Stage+c_FinalButton);



let Prompt = '<form><div class="form-group">'+
              '<label for="freeText">'+
                    'Please write your lesson for your future pupil in the box below.' +
              '</label>'+
              '<textarea class="form-control" id="freeText" rows="15" minlength="250" placeholder="At least 250 characters..."></textarea>'+
              '</div>'+
              '<form>';

let teachtext = '<style>'+
              '#freeText::placeholder {'+
              'color: lightgray;'+
              '}'+
              '</style>';
 
 $('head').append(teachtext);

let Buttons = '<div align="col m-5"><input align="left" type="button"  class="btn btn-default rounded myBtn" id="bSubmit" value="Next" disabled></div>';

$('#Stage').html(Prompt);
$('#FinalButton').html(Buttons);

$('#freeText').on('input', function() {
  if($(this).val().length >= 250) {
    $('#bSubmit').prop('disabled', false);
  } else {
    $('#bSubmit').prop('disabled', true);
  }
});

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
