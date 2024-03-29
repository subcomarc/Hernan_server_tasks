import {expOrder} from "./order.js";
import {exp} from "./TEACH_ExpSetting.js"

if(exp.testMode=="YES"){
  let skipButton = '<div align="center"><input type="button"  class="btn btn-default" id="bSkip" value="Skip" style="background-color: #FFFFFF; color:#3C455C"></div>';
   $('#SkipF').html(skipButton)
   document.getElementById("bSkip").onclick = function(){

           $('#ContBox').empty();
           $('#Bottom').empty();
           exp.expTask++
           expOrder();
         };
}

window.onload=setTimeout(function(){expOrder()},100);
 