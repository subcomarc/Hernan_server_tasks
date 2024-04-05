import {Instructions} from "./dInstructions.js";
import {exp} from "../PUPIL_ExpSetting.js";
import {GetLessons} from './components/GetLessons.js';

var Welcome = new Instructions(
    {nextText: "Next",
    textInstructions:[//page 0
                      ["<center><h1> Welcome! </h1> <br><br>",
                      "<p><h3> Thank you for choosing to take part in this study. We're happy to have you!<br>",
                      "With your help, we will try to understand a bit better how people learn new things and make decisions.</h3><br>",
                      "<h2>Let's jump right into it !</h2><p><center>"],

                      ]  })

var InstructionsLTp1 = new Instructions(
    // {nextText: "Start",
    {nextText: "Next",
    textInstructions:[//page 0
                      ["<h2>Instructions</h2>",
                      "This study consists of a point-and-click game, in which you will have to choose one out of two symbols displayed on screen. <br></br>",
                      "You will win points if you choose the correct symbol. Here is an example of what these symbols can look like:<br>", 
                      '<img src="images/stim2/17.png" style="padding: 1rem; text-align: center"; width= "155"; height= "155"; class = "img-fluid"> <img src="images/stim2/18.png" style="padding: 1rem; text-align: center"; width= "155"; height= "155"; class = "img-fluid"> <img src="images/stim2/19.png" style="padding: 1rem; text-align: center"; width= "155"; height= "155"; class = "img-fluid">', 
                    ],

 
                      //page 1
                      ["<h2>Instructions</h2>",
                      "Here is a slowed-down example of the kind of decisions you'll have to make: ",
                      //'<img src="images/instructions/LT_BR3.gif" style="padding: 1rem; text-align: center" class = "img-fluid">'],
                      '<img src="images/instructions/example_RL_2.gif" style="padding: 1rem; text-align: center" class = "img-fluid">',
                      ],

                    ]
  })

  var InstructionsLTp2 = new Instructions(
    // {nextText: "Start",
    {nextText: "Next",
    textInstructions:[//page 0

                      ["<h2>Instructions</h2>",
                      "Here's the catch!!! <b>READ CAREFULLY </b>",
                      "A <b>teacher with vast experience<b> in this task has writen down <b>a set of instructions specifically for you</b>. ",
                      "Keep in mind that <b>the teacher knows the task, and wants you to win as many points as possible!!</b>",
                      '<img src="images/instructions/Pupil_board.png" style="padding: 1rem; text-align: center" class = "img-fluid">',
                      "Read their instructions closely! They will help you win as many points as possible. "],

                      //page 1
                     ["<h2>Instructions</h2>",
                     "At the end of the study, we will convert all collected points into pounds and add them to the fixed bonus provided by Prolific. ",
                     "The conversion rate is 1 point = 1.2 pence. ",
                     "If your performance is good, you could even double your earnings!"],

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

  var Instructions_FROMTEACHER = new Instructions(
    {nextText: "Next",
    textInstructions:[exp.instructionText]
  })

  var InstructionsLT2 = new Instructions(
      {nextText: "Start",
      textInstructions:[//page 1
                        ["<h2>The point-and-click game is about to start</h2>",
                        "Give it your best! ",
                         "<br><br><br><h4>Press start whenever you are ready</h2>"]
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

    var InstructionsWriteLesson = new Instructions(
      {nextText: "Start",
      textInstructions:[//page 1
      ["<h2>Teaching task</h2>",
      "Thank you for going over the point-and-click tasks. "+
      "<b>Now, the time has come for you to transmit your strategies to your future pupil.</b> " ,
      '<img src="images/instructions/Teacher_SingleStudent.png" style="padding: 1rem; text-align: center" class = "img-fluid">',
      "Remember, they wont have access to any instructions from us. <b>ALL INSTRUCTIONS WILL COME FROM YOU.</b> ",
      "Also important, the options they will have to choose from will have the same value as yours, but they will be represented by different symbols, so <b>focus on the concepts and strategies rather than one concrete symbol's shape or color</b>, since they wont be the same anyways. ",
      "You really want your pupil to succeed! After all, remember <b>your extra bonus depends on their performance. </b>"+
      "Also remember that a good teaching text is at least 250 characters, <b>but of course you can extend yourself as much as you want.</b> Don't hesitate to share tips, strategies or any other piece of information that you think will help your pupil. ",
      "<br><br> Click the button below to start."]]
    })

    // var InstructionsProbSlider = new Instructions(
    //     {nextText: "Start",
    //     textInstructions:[//page 1
    //                        ["<h2>Good job! You finished the game and the teaching task! Now, before we end the experiment...</h2>",
    //                        "You will see the symbols you just played with one more time, on top of a slider you can operate with your mouse. "+
    //                        '<img src="images/instructions/Slider.png" style="padding: 1rem; text-align: center" class = "img-fluid">',
    //                        "Your goal is to use this slider to indicate how often you feel like each symbol gave you a rewarding outcome (or at least did not harm you)." ,
    //                        "For example, if you think a particular symbol rewarded you (got 1p) in 3 out of 4 trials, you should set the slider to 75%. ",
    //                        "Or, if a symbol would normally take points away from you, but in 1 out of 4 trials it spared you (e.g. got 0p penalty instead of -1p), you should set the slider to 25%. ",
    //                        "If you do not remember the exact number, give it your best guess! "+
    //                        "You will get 1 point for each correct response. ",
    //                        "<br><br> Click the button below to start."]]
    
    //   })
  

    var InstructionsProbSlider = new Instructions(
      {nextText: "Start",
      textInstructions:[//page 1
                         ["<h2>Good job! You finished the game and the teaching task! Now, before we end the experiment...</h2>",
                         "You will see the symbols you just played with one more time. Under each symbol you will see a set of buttons showing different rewards (above) and probabilities (below): "+
                         '<img src="images/instructions/MC_choice.png" style="padding: 1rem; text-align: center" class = "img-fluid">',
                         "You may remember that during the experiment options sometimes led to winning/losing points, but sometimes they led to a zero outcome (i.e. just the number 0)." ,
                         "Your goal is to estimate as best you can what was each symbol's outcome (other than 0), and the probability of obtaining said outcome." ,
                         "For example, if you think the symbol being shown rewarded you with 1 point, 3 out of 4 times you clicked on it, you should select the 1p and 75% buttons. ",
                         "Or, if you estimate that symbol caused you to lose 10 points every time you chose it, you should select the -10p and 100% buttons. ",
                         "Please remember to always indicate both point and probability outcome! "+
                         "<br><br> Click the button below to start."]]
  
    })

// export {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsProbSlider, Welcome }
// export {InstructionsLT,InstructionsLT2,InstructionsLT_Train,InstructionsPreference,InstructionsWriteLesson,InstructionsProbSlider,Welcome}
export {InstructionsLTp1,InstructionsLTp2,InstructionsLT2,InstructionsWriteLesson,InstructionsProbSlider,Welcome, Instructions_FROMTEACHER}

