import {Instructions} from "./dInstructions.js";


var InstructionsGeneral = new Instructions(
    {maxPage:1,
    nextText: "Next",
    textInstructions:[//page 1
                      ["This study consists of a learning task, where you will get to know 8 symbols, and several memory tasks that will test how well you remember them.",
                      "Your bonus payment will depend on how many points you collect during this study. At the end of the study, we will convert the accumulated points into pounds and add them to the fixed compensation provided by Prolific.",
                      "The conversion rate is: 100 points  = ? pence",
                      "Depending on your performance, you can win up to £6 including the fixed compensation."]]
  })

var InstructionsLT = new Instructions(
    {maxPage:6,
    nextText: "Start",
    textInstructions:[//page 1
                      ["In the first task you will see 8 symbols.",
                      "Each trial, we will ask you to decide between two of those symbols.",
                      "You can choose by clicking on the symbol. "],
                      //page 2
                      ["Symbols can either have positive outcomes (you will win between 0 and 90 points) or negative outcomes (you will lose between 0 and 90 points).",
                      "This means that the same symbol will never give 30p in one trial and lose 30p in the other. However, all symbols will sometimes get 0.",
                      "Your goal is to score as many points as possible across all the trials. ",
                      "Please note that the side on which the symbols are displayed does not matter."],
                      //page 3
                      ["After each choice, the symbol you chose will be highlighted and you will see the outcome of your decision. That is, how many points you have won or lost.",
                      "You will also see how many points you could have won or lost if you had chosen the other option.",
                      "Please remember that only the outcome of the chosen option will count toward your total score."],
                      //page 3
                      ["Note that all symbols will sometimes get 0p (no win or loss). How frequent the 0p outcome differs between the symbols. ",
                      "If you get 0p in one trial, it does not necessarily mean that you will get 0 all the time. In the next trial, you can get 30p or -30p.",
                      "Similarly, if you win 30p, it does not necessarily mean that you will get 30p all the time, you can sometimes get 0p (BUT: you can never get -30p)"],
                      //page 4
                      ["Here is an example:",
                      "In the first trial, you chose symbol B and you scored 0 points. If you had chosen A, you would have won 30 points.",
                      "This does not mean that you will get 0 points every time you choose B, and 30 points everytime you choose A."],
                      //page 5
                      ["Here is an example:",
                      "Indeed, in the second trial, you chose A and you scored 30 points. If you chose B you would have got 30 points as well "],
                      //page 6
                      ["Let’s practice!",
                      "If you want to, you can repeat the practice twice. But points collected in practice trials do not count towards the final payoff."]
                    ]
  })

var InstructionsPreference = new Instructions(
    {maxPage:3,
    nextText: "Start",
    textInstructions:[//page 1
                    [  "In this task, you will see the same symbols as in the as in the first task and they will have the same chances of winning or losing points as in the first task.",
                      "However, they will be presented in new combinations.",
                      "Please select symbols that had on average better outcomes.",
                      "You will get 30 points if you correctly identify the symbol with better average outcome."],
                      //page2
                    [  "Here is an example:",
                      "Symbol A won 30 points 80% of time and otherwise got 0" ,
                      "Symbol D lost 30 points 20% of time and otherwise got 0",
                      "The correct choice is A, as A won points while D lost them" ],
                      //page3
                      ["Here is an example:",
                      "Symbol B lost 30 points 80% of time and otherwise got 0" ,
                      "Symbol D lost 30 points 20% of time and otherwise got 0",
                      "The correct choice is D, as it on average lost less points than B."]]
  })


var InstructionsValuationValence = new Instructions(
    {maxPage:2,
    nextText: "Start",
    textInstructions:[//page 1
                      ["In this task, you will see the same symbols as in the as in the first task.",
                      "Some of them had positive outcomes (0 or winning points) while others had negative outcomes (0 or losing points)",
                      "Can you remember which symbols led to wins and which symbols led to losses?"],
                      //page 2
                      ["Every trial, you will see one symbol on the screen.",
                      "If you think the symbol had a negative outcome (lost points) please click on the negative button",
                      "If you think the symbol had a positive outcome (won points) please click on the positive  button.",
                      "You will be rewarded 30p for each correct response."]]
  })

  var Instructions2Sliders = new Instructions(
      {maxPage:4,
      nextText: "Start",
      textInstructions:[//page 1
                        ["In this task, you will see the same symbols as in the as in the first task.",
                        "If you remember, some of them had positive outcomes (0 or winning points) while others had negative outcomes (0 or losing points)",
                        "Do you remember what was the non-zero outcome for each symbol?",
                        "And do you remember how frequent the non-zero outcome was?"],
                        //page 2
                        ["Each trial, you will see one symbol and 2 sliders.",
                        "Please use the upper slider to select the non-zero outcome",
                        "And the lower slider to  select the frequency"],
                        //page 3
                        ["Here is an example:",
                        "Symbol A lost 30p in about 50% trials, and otherwise got 0p.",
                        "You should hence select -30p in the first row and 50% in the other."],
                        //page 4
                        ["You will be rewarded 0-30p depending on how close you get the correct response.",
                        "Try to be as accurate as possible. "]]
    })

    var InstructionsEVSlider = new Instructions(
        {maxPage:3,
        nextText: "Start",
        textInstructions:[//page 1
                          ["In this task, you will see the same symbols as in the as in the first task.",
                          "All symbols differed in how many points they won or lost on average. ",
                          "Can you estimate the average number of points each symbol won or lost?"],
                          //page 2
                          ["Here is an example:" ,
                          "Symbol A lost 30p in about 50% trials, and otherwise got 0. The average outcome for symbols A is near to -15.",
                          "Symbol B won 30p in 80% trials, and otherwise got 0. The average outcome for symbols A is 24."],
                          //page 3
                          ["It’s ok if you don’t remember exactly how frequent the non-zero outcome was.",
                          "Try your best guess! "]]
      })


    var InstructionsButtonsOnly = new Instructions(
        {maxPage:4,
        nextText: "Start",
        textInstructions:[//page 1
                          ["In this task, you will see the same symbols as in the as in the first task.",
                          "If you remember, some of them had positive outcomes (0 or winning points) while others had negative outcomes (0 or losing points)",
                          "Do you remember what was the non-zero outcome for each symbol?",
                          "And do you remember how frequent the non-zero outcome was?"],
                          //page 2
                          ["Each trial, you will see one symbol and 2 rows of buttons",
                          "Please use the upper button row to select the non-zero outcome",
                          "And the lower button row to  select the frequency"],
                          //page 3
                          ["Here is an example:",
                          "Symbol A lost 30p in about 50% trials, and otherwise got 0p.",
                          "You should hence select -30p in the first row and 50% in the other."],
                          //page 4
                          ["You will be rewarded 0-30p depending on how close you get the correct response.",
                          "Try to be as accurate as possible. "]]
      })


var InstructionsValuationOrder = new Instructions(
    {maxPage:4,
    nextText: "Start",
    textInstructions:[//page 1
                      ["In this task, you will see the same symbols as in the as in the first task.",
                      "Can you order them from the best symbol (i.e. symbol that won on average the most points) to the worst (i.e. the symbol that lost on average the most points)?"],
                    //page 2
                    ["Here is an example",
                    "Imagine symbols A,B,C,D." ,
                    "Symbol A won 30 points 80% of time and otherwise got 0",
                    "Symbol B lost  30 points 80% of time and otherwise got 0",
                    "Symbol C won 30 points 20% of time and otherwise got 0",
                    "Symbol D lost  30 points 20% of time and otherwise got 0",
                    "The correct order of the symbols would be ACDB"],
                  //page 3
                  ["Please order the symbols by dragging them to the available positions.",
                  "You can drop the symbol to any empty position, and move it between the positions",
                  "Press Submit once you are satisfied with the order or Restart if you want to restart the task."],
                  //page4
                  ["You will get 0-240p depending on how close you get the correct response.",
                  "Try to be as accurate as possible!"]]
    })

var InstructionsShape = new Instructions(
    {maxPage:1,
    nextText: "Start",
    textInstructions:[//page 1
                      ["Each round you will see two black and white symbols",
                      "One of the symbols will have the same shape as the symbol from the first task while the other will be brand new.",
                      "Please select the symbol from the first task."]]
  })

var InstructionsColor = new Instructions(
  {maxPage:1,
  nextText: "Start",
  textInstructions:[//page 1
                    ["Each round you will see two colours",
                    "One of the colours was taken from a symbol in the first task, while the other was randomly generated",
                    "Please select the colour from the first task."]]
  })

export {InstructionsGeneral, InstructionsLT, InstructionsPreference,
        Instructions2Sliders, InstructionsEVSlider, InstructionsButtonsOnly,
        InstructionsValuationValence, InstructionsValuationOrder,
        InstructionsShape, InstructionsColor}
