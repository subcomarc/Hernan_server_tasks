//uses underscore functions (called in Index.html)

// SYMBOLS FOR TRAINING
  var tSymbols = [
//     {id:0,reward:1,prob:0.25,loss:0, outSchedule: _.shuffle([0,0,0,1]),track:0},
//     {id:1,reward:1,prob:0.75,loss:0, outSchedule: _.shuffle([0,1,1,1]),track:0},
//     {id:2,reward:1,prob:0.75,loss:0, outSchedule: _.shuffle([1,1,1,0]),track:0},
//     {id:3,reward:1,prob:0.25,loss:0, outSchedule: _.shuffle([0,0,0,1]),track:0}
// ];
{id:0,reward:1,prob:0.25,loss:0},
{id:1,reward:1,prob:0.75,loss:0},
{id:2,reward:10,prob:0.75,loss:0},
{id:3,reward:10,prob:0.25,loss:0}
];
 addSymImage(tSymbols,0,"images/stimTrain/",'.jpg')


export{tSymbols} //fSymbols2


function addSymImage(obj,i0,path,ext){
let ID = _.shuffle(_.range(i0,i0+obj.length));

  for (let i = 0; i <= obj.length-1; i++){
    obj[i].imageID = ID[i];
    obj[i].image = new Image();
    obj[i].image.src = path +ID[i]+ext;}
}
