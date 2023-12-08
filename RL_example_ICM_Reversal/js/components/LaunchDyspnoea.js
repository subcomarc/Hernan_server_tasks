import {expOrder} from "../order.js";
import {sendToDB} from "../functions/sendToDB.js";
import {exp} from "../BREATH_RL_ExpSetting.js"

function LaunchDyspnoea(exp){
  let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
  let c_FinalButton =  "<div class = 'row justify-content-center' id = 'FinalButton'> </div>";

  $('#ContBox').html(c_Stage+c_FinalButton);



let Dysp = '<form><div class="col">'+
              '<H2>Procedure en cours. Cliquez sur la touche \'Suivant\' quand l\'experimentateur vous l\indiquera. Ceci va vous permettre de commencer le jeu point-and-click.</H2>'+
              '<img src="images/instructions/clipLungs.png" style="padding: 1rem; text-align: center"; width= "155"; height= "155"; class = "img-fluid"> ' +
              '</div><form>'

let Buttons = '<div align="col m-5"><input align="left" type="button"  class="btn btn-default rounded myBtn" id="bSubmit" value="Suivant"></div>';

$('#Stage').html(Dysp);
$('#FinalButton').html(Buttons);


$('#bSubmit').click(function(){
  exp.expTask++;
  expOrder();
})
}

export {LaunchDyspnoea}
