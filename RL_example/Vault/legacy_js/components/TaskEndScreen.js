import {expOrder} from "../order.js";
import {exp} from "../ToE_ExpSetting.js"

function endTask(rew){

    // New Clear divs
    let c_Stage =  "<div class = 'row justify-content-center' id = 'Stage'> </div>";
    let c_FinalButton =  "<div class = 'row justify-content-center' id = 'FinalButton'> </div>";

    $('#ContBox').html(c_Stage+c_FinalButton);
    document.getElementById("ContBox").className = "col-12 mt-3 visible" ;

    // Save final Reward to the exp file
    exp.totalReward = exp.totalReward + rew;

    // Write on the matrix end of the trial
     let EndText ='<div class="col"><h5 align = "center"> <br> This is the end of the task!</h5> ' +
 	                '<p align = "center" ><br> Your score is <b>'+rew+'</b> points. <br></p></div>' ;

     let EndBut = '<div align="center"><input type="button"  class="btn btn-default myBtn" id="bEnd" value="Please click here to continue"></div>';

     $('#Stage').html('<div class="row justify-content-center">'+EndText+'</div>');
     $('#FinalButton').html('<div class="row justify-content-center">'+EndBut+'</div>');

     document.getElementById("bEnd").onclick = function(){
             $('#ContBox').empty();
             expOrder(exp);
           };

 }

export {endTask}
