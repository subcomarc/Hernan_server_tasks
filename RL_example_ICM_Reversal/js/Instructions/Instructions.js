import {Instructions} from "./dInstructions.js";

var Welcome = new Instructions(
    {nextText: "Next",
    textInstructions:[//page 0
                      ["<center><p><h1> Bienvenue dans notre projet ! </h1> <br><br><br>",
                      "<h3> Merci d'avoir choisi de participer à cette étude. Nous sommes ravis de vous avoir parmi nous !",
                      "Avec votre aide, nous tenterons de mieux comprendre comment les gens apprennent de nouvelles choses et prennent des décisions..</h3><br>",
                      "<h2>Allons-y !</h2></p><center>"],

                      ]  })

var InstructionsLT = new Instructions(
    {nextText: "Start",
    textInstructions:[//page 0
                      ["<h2>Instructions</h2>",
                      "This study consists of two point-and-click games, in which you will have to choose one out of two symbols displayed on screen. <br></br>",
                      "Here, this is an example of what the symbols can look like:<br>", 
                      '<img src="images/stim2/17.png" style="padding: 1rem; text-align: center"; width= "155"; height= "155"; class = "img-fluid"> <img src="images/stim2/18.png" style="padding: 1rem; text-align: center"; width= "155"; height= "155"; class = "img-fluid"> <img src="images/stim2/19.png" style="padding: 1rem; text-align: center"; width= "155"; height= "155"; class = "img-fluid">', 
                      "<b>Every symbol has a probability of giving you a reward, you want to accumulate as many points as you can!</b>",
                    ],

                      //page 2
                      ["<h2>Instructions</h2>",
                      "At the end of the study, we will convert all collected points into pounds and add them to the fixed bonus provided by Prolific. ",
                      "The conversion rate is 1 point = 1.2 pence. ",
                      "This means that you can double your earnings if you perform well. "],

                      //page 3
                      ["<h2>Instructions</h2>",
                      "<b>Here's the catch!!! READ CAREFULLY </b>",
                      "Once you are done playing these games, we will ask you to <b>write down a set of instructions for the next player</b>. ",
                      "You should try to transmit to them any strategy you may have devised while you were doing the task. Your goal is to teach them how to gain as many points as possible. ",
                      "Keep in mind that the games they'll play will be exactly like yours, with the same choices, probabilities and rewards <b>but they will be represented by different symbols, so conveying the right strategy rather than talking about one symbol in particular here is key.</b>",
                      "Try to help your future student as much as you can! <b>You'll be earning a bonus equivalent to 10% of the winnings of your future pupil!</b> "],

                      //page 5
                      ["<h2>Instructions</h2>",
                      "Here is a slowed-down example of the kind of decisions you'll have to make: ",
                      //'<img src="images/instructions/LT_BR3.gif" style="padding: 1rem; text-align: center" class = "img-fluid">'],
                      '<img src="images/instructions/example_RL_2.gif" style="padding: 1rem; text-align: center" class = "img-fluid">',
                      "This is someone choosing the option on the left, and not winning any points. If this person had chosen the option to the right they would have won 1 point."],
                    
                    ]
  })

    var InstructionsLT_Train = new Instructions(
    {nextText: "Start",
    textInstructions:[//page 1
                     ["<h2>Training</h2>",
                     "Let's start with a few practice trials! ",
                     "Don't pay too much attention to points or anything else at this point, this is just so that you get a feeling for the point-and-clicking. ",
                     "This is why we wont even use our actual symbols for this practice, but rather some random letters",
                     "<br><h4>Note:</h2>"+
                     "Points collected during the practice won't be added to your total payoff. " +
                     "However, you will see your score at the end of the training. ",
                     "<br><br> Click the button below to start. "]
                    ]
  })

  var InstructionsLT2 = new Instructions(
      {nextText: "Start",
      textInstructions:[//page 1
                        ["<h2>First Game</h2>",
                        "You are about to start the first game. ",
                         "<br><h4>Note:</h2>",
                         "From now on, any points you earn will be added to your final payoff. ",
                         "There will be a lot more trials than in the training. ",
                         "The lottery tickets will differ from those used during training. However, the logic will remain the same. ",
                       "<br><br> Click the button below to start. "]
                      ]
    })

var InstructionsPreference = new Instructions(
    {nextText: "Start",
    textInstructions:[//page 1
                    ["<h2>Second Game</h2>",
                    "In the second game, you will see the same symbols again. ",
                    "However, this time they will be presented in different combinations and you will only be able to see the outcome of your chosen option. ",
                    "Please select whichever option you think is more likely to win. ",
                    "<br><br> Click the button below to start. "]

                  ]

  })

  // var InstructionsProbSlider = new Instructions(
    var InstructionsWriteLesson = new Instructions(
      {nextText: "Start",
      // textInstructions:[//page 1
      //                   ["<h2>Third Game</h2>",
      //                   "In the third game, you will see one of the lottery tickets and a slider each round. "+
      //                   "Your goal is to estimate how frequently each ticket won. " ,
      //                   "For example, if you think a particular lottery ticket won (got 1p) in 3 out of 4 trials, you should set the slider to 75%. ",
      //                   "If you do not remember the exact number, give your best guess. "+
      //                   "You will get 1 point for each correct response. ",
      //                   "<br><br> Click the button below to start."]]
      textInstructions:[//page 1
      ["<h2>Teaching task</h2>",
      "Thank you for going over the two point-and-click tasks. "+
      "<b>Now, the time has come for you to transmit your strategies to a future player whe shall consider your pupil.</b> " ,
      "Remember, the options they will have to choose from will have the same value, but they will be represented by different symbols, so <b>focus on the concepts and strategies rather than one concrete symbol's shape or color</b>, since they wont be the same anyways. ",
      "You really want your pupil to succeed! After all, remember <b>you'll be making 10% of their earnings as an extra bonus.</b>"+
      "It may be better to keep your written lesson brief and to the point, but no strict limit for the text is enforced.",
      "<br><br> Click the button below to start."]]
    })


// export {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsProbSlider, Welcome }
export {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsWriteLesson, Welcome }

