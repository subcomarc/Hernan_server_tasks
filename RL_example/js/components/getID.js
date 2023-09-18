import {expOrder} from "../order.js";



function getID(exp) {
  // Define main containers needed
    let c_Stage =  "<div class = 'row justify-content-center mt-4' id = 'Stage'> </div>";
    let c_Buttons =  "<div class = 'row justify-content-center' id = 'GameButton'> </div>";

  $('#ContBox').html(c_Stage+c_Buttons);

     	let Prompt =  '<form >'+
                 '<div class="form-group">'+
                 	'<label for="formPartID">Please enter your Prolific ID</label>'+
                	'<input type="text" class="form-control" id="formPartID" placeholder="24-digit prolific ID" maxlength="24" style="width: 27ch;">'+
                 	'<div class="invalid-feedback">You must enter your Prolific ID (24 digits)</div>'+
                 '</div>'+
                 '<form>';

       	let Buttons = '<div align="col m-5"><input align="left" type="button"  class="btn btn-default rounded myBtn" id="bStart" value="Next" ></div>';

       $('#Stage').html(Prompt);
       $('#GameButton').html(Buttons);

	let params = new URLSearchParams(location.search);
	exp.PID = params.get('PROLIFIC_PID');

       $('#bStart').click(function() {

         if(document.getElementById('formPartID').value.length===24){
            exp.ID = document.getElementById('formPartID').value;

                     $('#ContBox').empty();
                     expOrder();
                   }
          else{formPartID.classList.add('is-invalid');}
       })
     }



export {getID}
