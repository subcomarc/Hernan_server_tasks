import {expOrder} from "../order.js";
import {exp} from "../PUPIL_ExpSetting.js"

var Quiz_RL =  {
  Title: "Please answer the following questions",
  Intro: "(If you do not answer all questions correctly, you will be redirected back to the instructions.)",
  Questions: [
    {id:"Q0",Text:"Some symbols are better (will give you better rewards) than others", Responses:["True","False"], Correct:0},
    {id:"Q1",Text:"You will see the outcome of the symbol you clicked on, but NOT of the symbol you did not click on:", Responses:["True","False"], Correct:0},
  ],

 init: function(){
   // Define main containers needed
   let c_Stage =  "<div class = 'row justify-content-left' id = 'Stage'> </div>";
   let c_Buttons =  "<div class = 'row justify-content-between mt-2' id = 'respButtons'> </div>";

   var obj = this;

   $('#ContBox').html(c_Stage+c_Buttons);

   $('#Stage').append('<h3>'+obj.Title+'</h3><p>'+obj.Intro+'</p>')

  for (let i = 0; i <= obj.Questions.length-1; i++){AddResponses(obj.Questions[i])}



   // Show buttons
   var buttonBack = '<input align="center" type="button"  class="btn btn-default invisible rounded mt-2 mb-2 myBtn" id="bBack" value="Back">';
   var buttonNext = '<input align="center" type="button"  class="btn btn-default rounded visible mt-2 mb-2 myBtn" id="bNext" value="Next">';
   $('#respButtons').html(buttonBack + buttonNext);

   $('#bNext').click(function() {
     var resp = 0;
     for (var i = 0; i < obj.Questions.length; i++) {
       if($('input[name='+obj.Questions[i].id+']:checked').val() == obj.Questions[i].Correct) {
         resp = resp + 0
       } else{
         resp++
       }
     }

   $('#Top').html("<p></p>");
   $('#ContBox').empty();
   if (resp == 0 ) {exp.expTask++;expOrder();} else {exp.expTask=exp.expTask-1,expOrder()}
 })
}
}

export {Quiz_RL}

function AddResponses(question) {
  var formQ = document.createElement('div')
  formQ.className = "form-group mt-2 mb-2 p-2 border rounded w-100";

  var legend = document.createElement('p')
  var text = document.createTextNode(question.Text)
  legend.appendChild(text );

  Stage.appendChild(formQ)
  formQ.appendChild(legend);


  for(let r=0; r< question.Responses.length; r++){


    var radiobox = document.createElement('input');
        radiobox.type = 'radio';
        radiobox.id = question.id+question.Responses[r];
        radiobox.value = r;
        radiobox.name = question.id;

        var label = document.createElement('label')
        label.htmlFor = question.id+question.Responses[r];

        var description = document.createTextNode(question.Responses[r]);
        label.appendChild(description);

        var newline = document.createElement('br');

        formQ.appendChild(radiobox);
        formQ.appendChild(label);
        formQ.appendChild(newline);
  }

}
