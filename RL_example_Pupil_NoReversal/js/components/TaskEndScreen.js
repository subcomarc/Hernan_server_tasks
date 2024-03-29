import {expOrder} from "../order.js";
import {exp} from "../PUPIL_ExpSetting.js"

function endTask(rew,addRew=1){

    // New Clear divs
    let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
    let c_Buttons =  "<div class = 'row justify-content-between mt-2' id = 'respButtons'> </div>";

    $('#ContBox').html(c_Stage+c_Buttons);

    // Show buttons
    var buttonBack = '<input align="center" type="button"  class="btn btn-default invisible rounded mt-2 mb-2 myBtn" id="bBack" value="Back">';
    var buttonNext = '<input align="center" type="button"  class="btn btn-default rounded visible mt-2 mb-2 myBtn" id="bNext" value="Next">';


    document.getElementById("ContBox").className = "col-12 mt-3 visible" ;

    if(addRew===1){
      // Save final Reward to the exp file
      exp.totalReward = exp.totalReward + rew;
    }


    // Write on the matrix end of the trial
     let EndText ='<div class="col"><h3 align = "center"> <br> This is the end of the task!</h3> ' +
 	                // '<p align = "center" ><br> Your score is <b>'+rew+'</b> points. <br></p></div>' ;
                   '<p align = "center" ><br> Your score is <b>'+rew+'</b> points. <br></p></div>' ;

    $('#Stage').html('<div class="row justify-content-center">'+EndText+'</div>');
    $('#Bottom').html(buttonBack + buttonNext);

     document.getElementById("bNext").onclick = function(){
             $('#ContBox').empty();
             $('#Bottom').empty();
             exp.expTask++
             expOrder();
           };

 }

export {endTask}
