import {expOrder} from "../order.js";
import {exp} from "../ToE_ExpSetting.js"



function getID(exp) {
  // Define main containers needed
    let c_Stage =  "<div class = 'row justify-content-center mt-4' id = 'Stage'> </div>";

    $('#ContBox').html(c_Stage);

    // Show buttons
    var buttonBack = '<input align="center" type="button"  class="btn btn-default rounded invisible mt-2 mb-2 myBtn" id="bBack" value="Back">';
    var buttonNext = '<input align="center" type="button"  class="btn btn-default rounded visible mt-2 mb-2 myBtn" id="bNext" value="Next">';
    $('#Bottom').html(buttonBack + buttonNext);



     	let Prompt =  '<form >'+
                 '<div class="form-group">'+
                 	'<label for="formPartID">Please enter your Prolific ID</label>'+
                	'<input type="text" class="form-control" id="formPartID" placeholder="24-digit prolific ID" maxlength="24" style="width: 27ch;">'+
                 	'<div class="invalid-feedback">You must enter your Prolific ID (24 digits)</div>'+
                 '</div>'+
                 '<form>';

       	       $('#Stage').html(Prompt);


	let params = new URLSearchParams(location.search);
	exp.PID = params.get('PROLIFIC_PID');

// test function -> progress on ENTER
  document.getElementById('formPartID').addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("bNext").click();
  }
});

// ON CLICK CHECK THAT THE ENTRY WAS VALID:

       $('#bNext').click(function() {

         if(document.getElementById('formPartID').value.length===24){
            exp.ID = document.getElementById('formPartID').value;

                     $('#ContBox').empty();
                     exp.expTask++
                     expOrder();
                   }
          else{formPartID.classList.add('is-invalid');}
       })
     }



export {getID}



let c_Buttons =  "<div class = 'row justify-content-between mt-2' id = 'respButtons'> </div>";

// Show buttons
var buttonBack = '<input align="center" type="button"  class="btn btn-default invisible rounded m-2 myBtn" id="bBack" value="Back">';
var buttonNext = '<input align="center" type="button"  class="btn btn-default rounded visible m-2 myBtn" id="bNext" value="Next">';
$('#respButtons').html(buttonBack + buttonNext);
