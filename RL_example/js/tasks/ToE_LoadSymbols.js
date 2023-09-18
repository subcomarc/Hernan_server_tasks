//uses underscore functions (called in Index.html)

// to do, export and import the picID array from expSettings -> for multiday studies

var symbols = {
  nStim: 8,
  S0:{id:0,reward:60,prob:0.75,loss:0},
  S1:{id:1,reward:60,prob:0.25,loss:0},
  S2:{id:2,reward:30,prob:0.75,loss:0},
  S3:{id:3,reward:30,prob:0.25,loss:0},
  S4:{id:4,reward:-30,prob:0.25,loss:0},
  S5:{id:5,reward:-30,prob:0.75,loss:0},
  S6:{id:6,reward:-60,prob:0.25,loss:0},
  S7:{id:7,reward:-60,prob:0.75,loss:0}
};
 addSymImage(symbols,0,"images/stim/",'.gif')
 addBWImage(symbols ,0,"images/stimBW/",'.gif')

 var colsS =  ["#7d45e8","#7d45e8","#7d45e8","#7d45e8",
               "#7d45e8","#7d45e8","#7d45e8","#7d45e8"];

addColor(symbols,colsS )

// SYMBOLS FOR TRAINING
  var tSymbols = {
    nStim: 4,
    S0:{id:0,reward:30,prob:0.75,loss:0},
    S1:{id:1,reward:30,prob:0.25,loss:0},
    S2:{id:2,reward:-30,prob:0.25,loss:0},
    S3:{id:3,reward:-30,prob:0.75,loss:0}
  };
 addSymImage(tSymbols,0,"images/stimTrain/",'.jpg')

 //FAKE symbols
 var fSymbols = {
   nStim: 8,
   S0:{id:8},
   S1:{id:9},
   S2:{id:10},
   S3:{id:11},
   S4:{id:12},
   S5:{id:13},
   S6:{id:14},
   S7:{id:15}
 }
 addSymImage(fSymbols,8,"images/stim/",'.gif')
 addBWImage(fSymbols ,8,"images/stimBW/",'.gif')

 var colsF =  ["#7d45e8","#7d45e8","#7d45e8","#7d45e8",
               "#7d45e8","#7d45e8","#7d45e8","#7d45e8",
               "#bb2a98","#bb2a98","#bb2a98","#bb2a98",
               "#bb2a98","#bb2a98","#bb2a98","#bb2a98"];

addColor(fSymbols,colsF)

 //FAKE symbols 2
 var fSymbols2 = {
   nStim: 8,
   S8:{id:8},
   S9:{id:9},
   S10:{id:10},
   S11:{id:11},
   S12:{id:12},
   S13:{id:13},
   S14:{id:14},
   S15:{id:15}}

let ID = _.shuffle(_.range(8,8+fSymbols2.nStim));

 for (let i = 0; i <= fSymbols2.nStim-1; i++){
   fSymbols2['S'+(i+8)].imageID = ID[i];
   fSymbols2['S'+(i+8)].image = new Image();
   fSymbols2['S'+(i+8)].image.src = "images/stim/" +ID[i]+'.gif';}

   var colsF =  ["#7d45e8","#7d45e8","#7d45e8","#7d45e8",
                 "#7d45e8","#7d45e8","#7d45e8","#7d45e8",
                 "#297195","#297195","#297195","#297195",
                 "#297195","#297195","#297195","#297195"];


export{symbols,tSymbols,fSymbols,fSymbols2}


function addSymImage(obj,i0,path,ext){
//  let ID = _.shuffle([...Array(obj.nStim).keys()]);
let ID = _.shuffle(_.range(i0,i0+obj.nStim));

  for (let i = 0; i <= obj.nStim-1; i++){
    obj['S'+i].imageID = ID[i];
    obj['S'+i].image = new Image();
    obj['S'+i].image.src = path +ID[i]+ext;}
}

function addBWImage(obj,i0,path,ext){
  for (let i = 0; i <= obj.nStim-1; i++){
    let ID = obj['S'+i].imageID
    obj['S'+i].imageBW = new Image();
    obj['S'+i].imageBW.src = path +ID+ext;}
}

function addColor(obj,colors){
  for (let i = 0; i <= obj.nStim-1; i++){
    let ID = obj['S'+i].imageID
    obj['S'+i].color = colors[ID];
  }
}
