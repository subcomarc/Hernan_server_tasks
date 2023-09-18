import {expOrder} from "../order.js";

var consentForm =  {
  study: "The domain-general role of reinforcement learning-based training in cognition across short and long time-spans",
  researcher: "Pr. Stefano PALMINTERI",
  intro: "You are being invited to take part in a research study. Before you decide to participate, it is "+
         "important that you understand why the research is being conducted and what it will involve. "+
         "Please take time to read the following information carefully.",

  aim: "This study aims to understand the learning processes in decision-making, in particular the "+
          "cognitive mechanisms of these learning and decision-making processes. "+
          "<br><br>The following experiment has no immediate application or clinical value. "+
          "However, it will allow us to improve our understanding of the functioning brain.",

  procedure: "You will be asked to complete 2 cognitive tasks, "+
            "neither or which requires any particular skill or knowledge. " +
            "The study will likely take you 25-30 min. " +
            "If you complete it, you will receive between 3€ - 6€ depending on your choices during the tasks. ",

  participation: "Your participation in this research study is voluntary " +
                "and you may stop and withdraw at any time without prejudice or justification. ",

confidentiality: "In addition to your responses, we will also collect " +
                "<a href='https://researcher-help.prolific.co/hc/en-gb/articles/360009391633-Exporting-Prolific-Demographic-Data' target='_blank'>"+
                "these demographic data</a> if you provided them to Prolific. "+
                "In order to preserve your identity and the confidentiality, the identification of "+
                "each file will be coded, thus preserving the anonymity of your answers."+
                "<br><br> The collected data will be accessible to the researcher in charge and his staff "+
                "and will be only used for research purposes in order to answer the scientific objectives of the project. "+
                "The data may be published in scientific journals and shared within the scientific community, "+
                "in which case no publication or scientific communication will contain any identifying information. ",

  publication: "You will be able to check the publications resulting from this study on the following "+
                "<a href='https://sites.google.com/site/stefanopalminteri/publications' target='_blank'>"+
                "website.</a> ",
  contact: "humanreinforcementlearning@gmail.com",
  ethics: "This research has received a favorable opinion from the Inserm Ethical Review Committee / IRB00003888 on November 13th, 2018",
  consentForm: "Your participation in this research confirms that you have read this information and wish to participate in the research study. "+
                "Please check all boxes to continue:",
  consentCheck: ["I am 18 years old or more",
                "My participation in this experiment is voluntary",
                "I understand that my data will be kept confidential and I can stop at any time without justification"],
 init: function(){
   // Define main containers needed
   let c_Stage =  "<div class = 'row justify-content-left' id = 'Stage'> </div>";
   let c_Warning =  "<div class = 'mt-2 row justify-content-center invisible' id = 'Warning'> </div>";
   let c_Buttons =  "<div class = 'row justify-content-between' id = 'respButtons'> </div>";

   $('#ContBox').html(c_Stage+c_Warning+c_Buttons);

   //Add hidden warning message (in case options are not checked)
   let WarnText ='<div class="col"><p align = "center" class="text-warning">You must check all boxes to continue!<p></div>' ;
   $('#Warning').html(WarnText)

   // Add headings and show the text
   var consentCheck = [];
   for (let i = 0; i <= this.consentCheck.length-1; i++){
       consentCheck[i] =
             '<div class="form-check">'+
             '<input align="left" class="form-check-input" type="checkbox" value="" id='+"check"+i+' required>'+
             '<label class="form-check-label" for='+"check"+i+'>' +this.consentCheck[i]+'</label>'+
             '</div>'}

   $('#Top').html("<h4  style='color:#FFFFFF'>Consent</h4>")
   $('#Stage').html('<div class="col" >'+
                    "<h5>Title of the Study: </h5>"+"<p><b>"+this.study+"</b></p>"+
                    "<h5>Researcher in Charge: </h5>"+"<p><b>"+this.researcher+"</b></p>"+
                    "<p>"+this.intro+"</p>"+
                    "<h5>What is the aim of this study?</h5>"+ "<p>"+this.aim+"</p>"+
                    "<h5>What will happen if I take part?</h5>"+ "<p>"+this.procedure+"</p>"+
                    "<h5>Can I withdraw from the study?</h5>"+ "<p>"+this.participation+"</p>"+
                    "<h5>Confidentiality - Who will access the data?</h5>"+ "<p>"+this.confidentiality+"</p>"+
                    "<h5>Research Results And Publication</h5>"+ "<p>"+this.publication+"</p>"+
                    "<h5>Contact And Additional Information</h5>"+"<p class='ow'><b>Email: </b>"+this.contact+"</p>"+
                    "<p>"+this.ethics+"</p>"+
                    "<h5>Consent</h5>"+ "<p>"+this.consentForm+"</p>"+
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
               expOrder();
             }
    else{document.getElementById("Warning").className = "mt-2 row justify-content-center visible" ;}
 })
}
}

export {consentForm}
