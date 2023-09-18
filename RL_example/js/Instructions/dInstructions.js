import {expOrder} from "../order.js";


export class Instructions {

    constructor({maxPage, textInstructions,nextText}={})

    {
      this.maxPage = maxPage;
      this.textInstructions = textInstructions ;
      this.nextText = nextText; // what text to display on the final next button
    }

    init(test){
      // Define main containers needed for the task
      let c_Stage =  "<div class = 'row' id = 'Stage'> </div>";

      $('#ContBox').html(c_Stage);

      //Add buttons
      var buttonNext = '<input align="center" type="button"  class="btn btn-default invisible myBtn" id="bNext" value="Next" >';
      var buttonBack = '<input align="center" type="button"  class="btn btn-default invisible myBtn" id="bBack" value="Back" >';

       $('#Bottom').html(buttonBack+buttonNext);
       let object = this;

      showInstructions(0,object)
    }
  }

function showInstructions(page,object){
        let textInstructions ="";
        for(let i=0;i<object.textInstructions[page].length;i++){
            textInstructions = textInstructions+ '<li>'+object.textInstructions[page][i]+'</li>'
        }
        $('#Stage').html('<div class="col"><ul>'+textInstructions+'</ul></div>');


      // When to display back button - only if there is a page to go back to
        if (page == 0){
          document.getElementById("bBack").className = "btn btn-default m-2 rounded  invisible myBtn";}

        else if (page > 0){
            document.getElementById("bBack").onclick = function(){$('#Stage').empty();showInstructions(page-1,object)};
            document.getElementById("bBack").value = "Back";
            document.getElementById("bBack").className = "btn btn-default m-2 rounded  visible myBtn";
          }

      // When to display next button - only if there is a next page to go to
        if (page < object.textInstructions.length-1){
          document.getElementById("bNext").onclick = function(){$('#Stage').empty();showInstructions(page+1,object)};
          document.getElementById("bNext").value = "Next";
          document.getElementById("bNext").className = "btn btn-default m-2 rounded  visible myBtn";
        }

        else if (page == object.textInstructions.length-1){
          document.getElementById("bNext").className = "btn btn-default m-2 rounded  visible myBtn";
          document.getElementById("bNext").value = object.nextText;
          document.getElementById("bNext").onclick = function(){$('#Stage').empty();endInstructions()};
        }
}

function endInstructions(){
  $('#ContBox, #Bottom').empty();
  expOrder();
}
