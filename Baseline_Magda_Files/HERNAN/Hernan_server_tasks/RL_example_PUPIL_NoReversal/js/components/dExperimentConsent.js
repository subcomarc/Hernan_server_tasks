import {expOrder} from "../order.js";
import {exp} from "../TEACH_ExpSetting.js"

var consentForm =  {
  intro: "This is a study titled 'Learning and Decision-Making,' led by Professor Stefano PALMINTERI. "+
         "The primary goal of this research is to understand the learning processes involved in decision-making, " +
         "focusing on the role of reinforcement learning in short-term and long-term cognition in groups of individuals."+
         "We want to emphasize that this study has no immediate application or clinical value, but it will contribute to deepen our understanding of human behavior.",

 procedure: "You will be asked to complete two cognitive tasks, "+
            "that do not require any particular skill or knowledge. " +
            "The estimated duration to complete the study is approximately 20 minutes. " +
            "Depending oby you performance, you might earn between £2.5 - £5. ",

  participation: "Your participation in this research study is voluntary. You may stop and withdraw your participation at any time. "+
                 "In addition to your responses in the study, we will also collect " +
                 "<a href='https://researcher-help.prolific.co/hc/en-gb/articles/360009391633-Exporting-Prolific-Demographic-Data' target='_blank'>"+
                 "these demographic data</a> that you provided to Prolific when you signed up."+
                 "The collected data will only be used for research purposes. Any shared or published dataset will not contain your name or Prolific ID.",

 publication: "You will be able to check the publications resulting from this study on the following "+
                "<a href='https://sites.google.com/site/stefanopalminteri/publications' target='_blank'>"+
                "website.</a> ",
  contact: "For any questions or additional information, you can contact our research team via email at the following address: humanreinforcementlearning@gmail.com",
  ethics: "This research has been approved by the Inserm Ethical Review Committee / IRB00003888 on November 13th, 2018",
  consentForm: "Your participation in this study confirms that you have read this information, and wish to take part on it freely. "+
                "Please check all boxes to continue:",
  consentCheck: ["I am 18 years old or more",
                "My participation in this experiment is voluntary",
                "I understand that my collected data will remain confidential and I can stop at any time without justification"],
 init: function(){
   // Define main containers needed
   let c_Stage =  "<div class = 'row justify-content-left' id = 'Stage'> </div>";
   let c_Warning =  "<div class = 'mt-2 row justify-content-center invisible' id = 'Warning'> </div>";
   let c_Buttons =  "<div class = 'row justify-content-between' id = 'respButtons'> </div>";

   $('#ContBox').html(c_Stage+c_Warning+c_Buttons);
   $('#Bottom').html(c_Buttons)

   //Add hidden warning message (in case options are not checked)
   let WarnText ='<div class="col"><p align = "center" class="text-danger">You must check all boxes to continue!<p></div>' ;
   $('#Warning').html(WarnText)

   // Add headings and show the text
   var consentCheck = [];
   for (let i = 0; i <= this.consentCheck.length-1; i++){
       consentCheck[i] =
             '<div class="form-check">'+
             '<input align="left" class="form-check-input" type="checkbox" value="" id='+"check"+i+' required>'+
             '<label class="form-check-label" for='+"check"+i+'>' +this.consentCheck[i]+'</label>'+
             '</div>'}

   $('#Stage').html('<div class="col" >'+
                    "<h2>Consent Form</h2>"+
                    "<br>"+
                    "<h4>Aim of the Study</h4>"+"<p>"+this.intro+"</p>"+
                    "<h4>Procedure</h4>"+ "<p>"+this.procedure+"</p>"+
                    "<h4>Participation and Confidentiality</h4>"+ "<p>"+this.participation+"</p>"+
                    "<h4>Research Results And Publication</h4>"+ "<p>"+this.publication+"</p>"+
                    "<h4>Contact And Additional Information</h4>"+"<p class='ow'>"+this.contact+"</p>"+
                    "<p>"+this.ethics+"</p>"+
                    "<hr>"+
                    "<h4>Consent</h4>"+ "<p>"+this.consentForm+"</p>"+
                     consentCheck[0]+consentCheck[1]+consentCheck[2]+
                     '</div>')
   // Show buttons
   var buttonBack = '<input align="center" type="button"  class="btn btn-default invisible rounded m-2 myBtn" id="bBack" value="Back">';
   var buttonNext = '<input align="center" type="button"  class="btn btn-default rounded visible m-2 myBtn" id="bNext" value="Next">';
   $('#respButtons').html(buttonBack + buttonNext);

   $('#bNext').click(function() {
   if ($("input:checkbox:not(:checked)").length == 0) {
               $('#Top').html("<p></p>");
               $('#ContBox').empty();
               $('#Bottom').empty();
               exp.expTask++
               expOrder();
             }
    else{document.getElementById("Warning").className = "mt-2 row justify-content-center visible" ;}
 })
}
}

export {consentForm}
