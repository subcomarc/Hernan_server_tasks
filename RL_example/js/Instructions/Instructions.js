import {Instructions} from "./dInstructions.js";

var Welcome = new Instructions(
    {nextText: "Next",
    textInstructions:[//page 0
                      ["<center> <h1> Welcome to our little task! </h1> <br><br>",
                      "<p><h3> Thank you for choosing to take part in this study. We're happy to have you! </h3><p>",
                      "<p><h3> With your help, we will try to understand a bit better how people learn new things and make decisions.</h3><p><center>"],

                      ]  })

var InstructionsLT = new Instructions(
    {nextText: "Start",
    textInstructions:[//page 0
                      ["<h2>Instructions</h2>",
                      "The study consists of three games. You will see the same eight lottery tickets in each game.",
                      "In the first game, you will be presented with two lottery tickets each trial and you will have to select one of them. "+
                      "After each choice, you will see the outcome of both the chosen lottery ticket (highligted) and the unchosen one. ",
                      "There are only two possible outcomes: you can either win 1 point or get nothing (0 points). ",
                      "As you will find out throughout the study, some of the lottery tickets win more often than others. "+
                      "Your goal is to collect as many points as possible. "],

                      //page 2
                      ["<h2>Instructions</h2>",
                      "At the end of the study, we will convert all collected points into pounds and add them to the fixed bonus provided by Prolific. ",
                      "The conversion rate is 1 point = 1.2 pence. ",
                      "This means that you can double your earnings if you perform well. "],

                      //page 3
                      ["<h2>Instructions</h2>",
                      "<b>Here are some key points to remember:</b>",
                      "You will see the same eight lottery tickets in all three games. ",
                      "Some lottery tickets are more likely to win than the others. ",
                      "The winning probability does not change across games. Lottery tickets that won frequently in one game will win with the same frequency also in the other games. ",
                      "Only the outcomes of the chosen option will count towards your final payoff. ",
                      "The position of the lottery tickets on the screen (left/right) has no impact on their outcome. "],

                      //page 5
                      ["<h2>Instructions</h2>",
                      "Here is an animated example of the first game: ",
                      '<img src="images/instructions/LT_BR3.gif" style="padding: 1rem; text-align: center" class = "img-fluid">',
                      "As you can see, in this case, lottery C wins (gets 1p) more frequently than D and therefore it is the better option. "],

                    ]
  })

    var InstructionsLT_Train = new Instructions(
    {nextText: "Start",
    textInstructions:[//page 1
                     ["<h2>Training</h2>",
                     "Let's start with a few practice trials! ",
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
                    "In the second game, you will see the same lottery tickets again. ",
                    "However, this time they will be presented in different combinations and you will only be able to see the outcome of your chosen option. ",
                    "Feel free to select whichever lottery you think is more likely to win. ",
                    "<br><br> Click the button below to start. "]

                  ]

  })

  var InstructionsProbSlider = new Instructions(
      {nextText: "Start",
      textInstructions:[//page 1
                        ["<h2>Third Game</h2>",
                        "In the third game, you will see one of the lottery tickets and a slider each round. "+
                        "Your goal is to estimate how frequently each ticket won. " ,
                        "For example, if you think a particular lottery ticket won (got 1p) in 3 out of 4 trials, you should set the slider to 75%. ",
                        "If you do not remember the exact number, give your best guess. "+
                        "You will get 1 point for each correct response. ",
                        "<br><br> Click the button below to start."]]
    })


export {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsProbSlider, Welcome }
