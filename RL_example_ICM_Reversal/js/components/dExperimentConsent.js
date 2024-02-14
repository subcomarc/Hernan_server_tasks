import {expOrder} from "../order.js";
import {exp} from "../BREATH_RL_ExpSetting.js"

var consentForm =  {
  intro: "Il s'agit d'une étude intitulée \"Apprentissage et prise de décision\", dirigée par le professeur XXXXXXXX.  "+
         "L'objectif principal de cette recherche est de comprendre les processus d'apprentissage impliqués dans la prise de décision, " +
         "en mettant l'accent sur le rôle de l'apprentissage par renforcement dans la cognition à court et à long terme au sein de groupes d'individus. "+
         "Nous tenons à souligner que cette étude n'a aucune application immédiate ou valeur clinique, mais elle contribuera à approfondir notre compréhension du comportement humain.",

 procedure: "Vous serez invité(e) à accomplir une tâche cognitives "+
            "ne nécessitant aucune compétence particulière ni connaissance. " +
            "La durée estimée pour mener à bien l'étude est d'environ 10 minutes. " +
            "En fonction de votre performance, vous pourriez gagner entre £2.5 et £5. ",

  participation: "Votre participation à cette recherche est volontaire. Vous pouvez arrêter et retirer votre participation à tout moment. "+
                 "En plus de vos réponses à l'étude, nous collecterons également vos données démographiques essentiels (age et sexe) " +
                 "Tout ensemble de données partagé ou publié ne contiendra pas votre nom ni votre identifiant.",

 publication: "YVous pourrez vérifier les publications résultant de cette étude sur le "+
                "<a href='https://sites.google.com/site/stefanopalminteri/publications' target='_blank'>"+
                "site web</a> suivant. ",
  contact: "Pour toute question ou information supplémentaire, vous pouvez contacter notre équipe de recherche par e-mail à l'adresse suivante : XXXXXXXXXX.",
  ethics: "Cette recherche a été approuvée par le Comité d'éthique de l'Inserm, numéro XXXXXXXXXXXXXXXX",
  consentForm: "Votre participation à cette étude confirme que vous avez lu ces informations et que vous souhaitez y participer volontairement. "+
                "Veuillez cocher toutes les cases pour continuer : ",
  consentCheck: ["J'ai 18 ans ou plus.",
                "Ma participation à cette expérience est volontaire.",
                "Je comprends que mes données collectées resteront confidentielles et que je peux m\'arrêter à tout moment sans justification"],
 init: function(){
   // Define main containers needed
   let c_Stage =  "<div class = 'row justify-content-left' id = 'Stage'> </div>";
   let c_Warning =  "<div class = 'mt-2 row justify-content-center invisible' id = 'Warning'> </div>";
   let c_Buttons =  "<div class = 'row justify-content-between' id = 'respButtons'> </div>";

   $('#ContBox').html(c_Stage+c_Warning+c_Buttons);
   $('#Bottom').html(c_Buttons)

   //Add hidden warning message (in case options are not checked)
   let WarnText ='<div class="col"><p align = "center" class="text-danger">Vous devez cocher toutes les cases pour continuer !<p></div>' ;
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
                    "<h2>Formulaire de consentement</h2>"+
                    "<br>"+
                    "<h4>Objectif de l'étude</h4>"+"<p>"+this.intro+"</p>"+
                    "<h4>Procédure</h4>"+ "<p>"+this.procedure+"</p>"+
                    "<h4>Participation et confidentialité</h4>"+ "<p>"+this.participation+"</p>"+
                    "<h4>Résultats de la recherche et publication</h4>"+ "<p>"+this.publication+"</p>"+
                    "<h4>Contact et informations supplémentaires</h4>"+"<p class='ow'>"+this.contact+"</p>"+
                    "<p>"+this.ethics+"</p>"+
                    "<hr>"+
                    "<h4>Consentement</h4>"+ "<p>"+this.consentForm+"</p>"+
                     consentCheck[0]+consentCheck[1]+consentCheck[2]+
                     '</div>')
   // Show buttons
   var buttonBack = '<input align="center" type="button"  class="btn btn-default invisible rounded m-2 myBtn" id="bBack" value="Retour">';
   var buttonNext = '<input align="center" type="button"  class="btn btn-default rounded visible m-2 myBtn" id="bNext" value="Suivant">';
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
