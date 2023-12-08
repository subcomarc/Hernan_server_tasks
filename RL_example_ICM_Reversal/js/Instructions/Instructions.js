import {Instructions} from "./dInstructions.js";

var Welcome = new Instructions(
    {nextText: "Suivant",
    textInstructions:[//page 0
                      ["<center><p><h1> Soyez le/la bienvenu(e) ! </h1> <br><br><br>",
                      "<h3> Merci d'avoir choisi de participer à cette étude. Nous sommes ravis de vous avoir parmi nous !",
                      "Avec votre aide, nous tenterons de mieux comprendre comment les gens apprennent de nouvelles choses et prennent des décisions. </h3><br>",
                      "<h2>Allons-y !</h2></p><center>"],

                      ]  })

var InstructionsLT = new Instructions(
    {nextText: "Commencer",
    textInstructions:[//page 0
                     ["<h2>Instructions</h2>",
                      "Cette étude se compose d\'un jeux du style \"point-and-click\", dans lequel vous devrez choisir l'un des deux symboles affichés à l'écran. <br></br>",
                      "Voici un exemple d'à quoi les symboles peuvent ressembler :<br>", 
                      '<img src="images/stim2/17.png" style="padding: 1rem; text-align: center"; width= "155"; height= "155"; class = "img-fluid"> <img src="images/stim2/18.png" style="padding: 1rem; text-align: center"; width= "155"; height= "155"; class = "img-fluid"> <img src="images/stim2/19.png" style="padding: 1rem; text-align: center"; width= "155"; height= "155"; class = "img-fluid">', 
                      "<b>IMPORTANT: Chaque symbole a une probabilité de vous donner une certaine récompense (ceci determine sa valeur). Retenez bien que, en moyenne, toujours l'un des symboles affichés sur l'écran vous donnera plus de points que l'autre. Le côté d'affichage (gauche/droite) n'a aucune importance.<br>",
                      "Vous pouvez donc maximiser vos gains en choisissant à chaque fois le symbole avec la plus grande valeur en moyenne.<br><br></H3> Cherchez à accumuler autant de points que possible !</b>" ],

                      //page 2
                      ["<h2>Instructions</h2>",
                      "À la fin de l'étude, nous convertirons tous les points collectés en euros et les ajouterons au bonus fixe. ",
                      "Le taux de conversion est de 1 point = 1,2 centîmes d'euros. ",
                      "Cela signifie que vous pouvez doubler vos gains si vous vous en sortez bien."],

                      // //page 3
                      // ["<h2>Instructions</h2>",
                      // "<b>Voici le piège !!! LISEZ ATTENTIVEMENT </b>",
                      // "Une fois que vous aurez terminé de jouer à ces jeux, nous vous demanderons de <b>noter une série d'instructions pour le prochain joueur</b>. ",
                      // "Vous devriez essayer de leur transmettre toute stratégie que vous auriez élaborée pendant que vous réalisiez la tâche. Votre objectif est de leur apprendre comment gagner autant de points que possible. ",
                      // "Gardez à l'esprit que les jeux auxquels ils joueront seront exactement comme les vôtres, avec les mêmes choix, probabilités et récompenses <b>mais ils seront représentés par des symboles différents, donc transmettre la bonne stratégie plutôt que parler d'un symbole en particulier est essentiel ici.</b>",
                      // "Essayez d'aider votre futur étudiant autant que possible ! <b>Vous gagnerez un bonus équivalent à 10% des gains de votre futur élève !</b> "],

                      //page 5
                      ["<h2>Instructions</h2>",
                      "Voici un exemple ralenti du type de décisions que vous devrez prendre : ",
                      //'<img src="images/instructions/LT_BR3.gif" style="padding: 1rem; text-align: center" class = "img-fluid">'],
                      '<img src="images/instructions/example_RL_2.gif" style="padding: 1rem; text-align: center" class = "img-fluid">',
                      "Il s'agit de quelqu'un choisissant l'option de gauche et ne gagnant aucun point. Si cette personne avait choisi l'option de droite, elle aurait gagné 1 point."],
                    
                    ]
  })

    var InstructionsLT_Train = new Instructions(
    {nextText: "Commencer",
    textInstructions:[//page 1
             ["<h2>Entraînement</h2>",
              "Commençons par un peu de pratique ! ",
              "Ne faites pas trop attention aux points ou à quoi que ce soit d'autre à ce stade, il s'agit simplement de vous familiariser avec le point-and-click. ",
              "C'est pourquoi nous n'utiliserons même pas nos symboles réels pour cette pratique, mais plutôt quelques lettres aléatoires",
              "<br><h4>Attention :</h2>"+
              "Les points collectés pendant la pratique ne seront pas ajoutés à votre gain total. " +
              "Cependant, vous verrez votre score à la fin de l'entraînement. ",
              "<br><br> Cliquez sur le bouton ci-dessous pour commencer."]
   
                    ]
  })

  var InstructionsLT2 = new Instructions(
      {nextText: "Commencer",
      textInstructions:[//page 1
              ["<h2>Tâche point-and-click</h2>",
              "Vous êtes sur le point de commencer le vrai jeu. ",
              "<br><h4>Remarque :</h2>",
              "Dès maintenant, tous les points que vous gagnerez seront ajoutés à votre gain final. ",
              "Il y aura beaucoup plus d'essais que pendant l'entraînement. ",
              "Les symbols différeront de ceux utilisés pendant l'entraînement. Cependant, la logique restera la même. ",
              "<br><br> Cliquez sur le bouton ci-dessous pour commencer."]
     
                      ]
    })

var InstructionsPreference = new Instructions(
    {nextText: "Commencer",
    textInstructions:[//page 1
              ["<h2>Deuxième jeu</h2>",
              "Dans le deuxième jeu, vous verrez à nouveau les mêmes symboles. ",
              "Cependant, cette fois-ci, ils seront présentés dans des combinaisons différentes et vous ne pourrez voir que le résultat de l'option que vous avez choisie. ",
              "Veuillez sélectionner l'option que vous pensez être la plus susceptible de gagner. ",
              "<br><br> Cliquez sur le bouton ci-dessous pour commencer."]
   

                  ]

  })

  // var InstructionsProbSlider = new Instructions(
    // var InstructionsWriteLesson = new Instructions(
    var InstructionsStartDyspnoea = new Instructions(
      {nextText: "Commencer",
      // textInstructions:[//page 1
      //                   ["<h2>Third Game</h2>",
      //                   "In the third game, you will see one of the lottery tickets and a slider each round. "+
      //                   "Your goal is to estimate how frequently each ticket won. " ,
      //                   "For example, if you think a particular lottery ticket won (got 1p) in 3 out of 4 trials, you should set the slider to 75%. ",
      //                   "If you do not remember the exact number, give your best guess. "+
      //                   "You will get 1 point for each correct response. ",
      //                   "<br><br> Click the button below to start."]]
      // textInstructions:[//page 1
      // ["<h2>Teaching task</h2>",
      // "Thank you for going over the two point-and-click tasks. "+
      // "<b>Now, the time has come for you to transmit your strategies to a future player whe shall consider your pupil.</b> " ,
      // "Remember, the options they will have to choose from will have the same value, but they will be represented by different symbols, so <b>focus on the concepts and strategies rather than one concrete symbol's shape or color</b>, since they wont be the same anyways. ",
      // "You really want your pupil to succeed! After all, remember <b>you'll be making 10% of their earnings as an extra bonus.</b>"+
      // "It may be better to keep your written lesson brief and to the point, but no strict limit for the text is enforced.",
      // "<br><br> Click the button below to start."]]
      textInstructions:[//page 1
      ["<h2>Avant de commencer le vrai jeu...</h2>",
      "L'expérimentateur va vous guider à travers une intervention respiratoire."+
      "<b>Suivez toutes les instructions attentivement. Soyez assuré(e), cette intervention est totalement inoffensive.</b> " ,
      "Si l'expérimentateur n'est pas dans la pièce, veuillez lui avertir que vous avez atteint cette étape et ils viendront vous voir promptement."+
      "<br><br> Appuyez sur 'Commencer' pour lancer l'intervention."]]
    })


// export {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsProbSlider, Welcome }
// export {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsWriteLesson, Welcome }
export {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsStartDyspnoea, Welcome }

