import {Instructions} from "./dInstructions.js";

var Welcome = new Instructions(
    {nextText: "Next",
    textInstructions:[//page 0
                      ["<h1> Welcome to our project! </h1> <br><br><br>",
                      "<center><p><h3> Thank you for choosing to take part in this study. We're happy to have you!",
                      "With your help, we will try to understand a bit better how people learn new things and make decisions.</h3><br>",
                      "<h2>Let's jump right into it !</h2><p><center>"],

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
                      "Here is a slowed-down example of the kind of decisions you'll have to make: ",
                      //'<img src="images/instructions/LT_BR3.gif" style="padding: 1rem; text-align: center" class = "img-fluid">'],
                      '<img src="images/instructions/example_RL_2.gif" style="padding: 1rem; text-align: center" class = "img-fluid">',
                      "This is someone choosing the option on the left, and not winning any points. If this person had chosen the option to the right they would have won 1 point."],

                      //page 5
                      ["<h2>Instructions</h2>",
                      "<b>But wait!!! THERE'S MORE </b>",
                      "Before starting these games <b>you will have to go over a lesson teaching you some strategies to win as many points as possible</b>. ",
                      "Keep in mind that this lesson comes from a teacher <b>who has already done this task, so they are teaching from experience</b>"],

                      //page 6
                      ["<h2>Instructions</h2>",
                      "<b>Here are the instructions from your teacher, take a moment to study them in detail! </b>",
                       "<Lesson>THE LESSON GOES HERE IN ITS OWN SIZE AND FONT TO BE EASILY DISTINGUISHABLE</Lesson>. "],
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
      "You just had the opportunity to do experience the task after studying some strategies coming from a previous user" ,
      "You think you can do better? <b>Go ahead and write your own strategic lesson for the next participant!</b>. ",
      "<b>Focus on the concepts and strategies</b> rather than one concrete symbol's shape or color, since future participants will go over the same choices, but represented by different symbols.",
      "You really want your pupil to succeed! After all, remember <b>you'll be making 10% of their earnings as an extra bonus.</b>"+
      "It may be better to keep your written lesson brief and to the point, but no strict limit for the text is enforced.",
      "<br><br> Click the button below to start."]]
    })


// export {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsProbSlider, Welcome }
export {InstructionsLT,InstructionsLT2,InstructionsLT_Train, InstructionsPreference, InstructionsWriteLesson, Welcome }

