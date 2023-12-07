import {expOrder} from "../order.js";
import {exp} from "../BREATH_RL_ExpSetting.js"
import {sendToDB} from "../functions/sendToDB.js";



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
                 	'<label for="formPartID">Renseignez votre numéro d\'identifiant anonyme</label>'+
                	'<input type="text" class="form-control" id="formPartID" placeholder="10 chiffres max" maxlength="10" style="width: 10ch;">'+
                 	'<div class="invalid-feedback">Votre ID anonyme est composé de 10 chiffres</div>'+
                 '</div>'+
                 '<form>';
      
      let Info  = '<form >'+
      '<div class="form-group">'+
      '<label for="formPartSex">S\'il vous plait selectionnez votre sexe biologique</label>'+
      '<div align="left"><input type= "radio" id="GenderFemale" name= "answer" value= "F"> <label for="GenderFemale"> Féminin </label><br>' +
      '<div align="left"><input type= "radio" id="GenderMale" name= "answer" value= "M"> <label for="GenderMale"> Masculin </label>'+
      '<br><br><br><br>' +
      '<br><br></div><div class="col-xs-1 col-md-1"></div></div>';

      let Age =  '<form >'+
      '<div class="form-group">'+
        '<label for="formPartAge">Renseignez votre numéro d\'identifiant anonyme</label>'+
       '<input type="text" class="form-control" id="formPartAge" placeholder="00" maxlength="2" style="width: 2ch;">'+
        '<div class="invalid-feedback">Votre age doit être renseigné en format numérique (2 chiffres)</div>'+
      '</div>'+
      '<form>';

       	       $('#Stage').html(Prompt + Age + Info);


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
          if ($("input:radio:checked").length < 1) {
					  alert('S\'il vous plait cochez l\'une des cases.')}else{
                if(document.getElementById('formPartID').value.length===10 & document.getElementById('formPartAge').value.length===2){;
                  exp.ID = document.getElementById('formPartID').value;
                  exp.partSex = $("input:radio:checked").val();
                  exp.age = document.getElementById('formPartAge').value;
                     $('#ContBox').empty();
                     exp.expTask++
                     expOrder();
                     sendToDB(0,
                      {partID: exp.ID,
                        partSex: exp.partSex,
                        partAge: exp.age,
                        expID: exp.expID},
                    'php/InsertDB_IDstart.php'
                    );
                    }else{
                      formPartID.classList.add('is-invalid');
                    }
       }
      }) 

    }

export {getID}

// send participant data to the database


// SubGender = $("input:radio:checked").attr('value');

let c_Buttons =  "<div class = 'row justify-content-between mt-2' id = 'respButtons'> </div>";

// Show buttons
var buttonBack = '<input align="center" type="button"  class="btn btn-default invisible rounded m-2 myBtn" id="bBack" value="Back">';
var buttonNext = '<input align="center" type="button"  class="btn btn-default rounded visible m-2 myBtn" id="bNext" value="Next">';
$('#respButtons').html(buttonBack + buttonNext);
