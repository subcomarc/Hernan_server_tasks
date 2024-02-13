//uses underscore functions (called in Index.html)

import {auxexp} from "../components/getID.js";


// to do, export and import the picID array from expSettings -> for multiday studies

var symbols = [
// {id:0,reward:1,prob:1,loss:0, outSchedule: _.shuffle([1,1,1,1]),track:0},
// {id:1,reward:1,prob:0.5,loss:0, outSchedule: _.shuffle([1,1,0,0]),track:0},
// {id:2,reward:1,prob:0.5,loss:0, outSchedule: _.shuffle([1,1,0,0]),track:0},
// {id:3,reward:1,prob:0,loss:0, outSchedule: _.shuffle([0,0,0,0]),track:0},
// {id:4,reward:1,prob:1,loss:0, outSchedule: _.shuffle([1,1,1,1]),track:0},
// {id:5,reward:1,prob:0.5,loss:0, outSchedule: _.shuffle([1,1,0,0]),track:0},
// {id:6,reward:1,prob:0.5,loss:0, outSchedule: _.shuffle([1,1,0,0]),track:0},
// {id:7,reward:1,prob:0,loss:0, outSchedule: _.shuffle([0,0,0,0]),track:0}
// ];

// {id:0,reward:1,prob:0.75,loss:0},
// {id:1,reward:1,prob:0.25,loss:0},
// {id:2,reward:-1,prob:0.75,loss:0},
// {id:3,reward:-1,prob:0.25,loss:0},
// {id:4,reward:10,prob:0.75,loss:0},
// {id:5,reward:10,prob:0.25,loss:0},
// {id:6,reward:-10,prob:0.75,loss:0},
// {id:7,reward:-10,prob:0.25,loss:0}
// ];

{id:0,reward:1, prob:-1, probS:0.75, probR:0.75,loss:0, counter:0, isreversed:0},
{id:1,reward:1,prob:-1,probS:0.25, probR:0.25,loss:0, counter:0, isreversed:0},
{id:2,reward:10,prob:-1,probS:0.75, probR:0.75,loss:0, counter:0, isreversed:0},
{id:3,reward:10,prob:-1,probS:0.25, probR:0.25,loss:0, counter:0, isreversed:0},
{id:4,reward:1,prob:-1,probS:0.75, probR:0.25,loss:0, counter:0, isreversed:0},
{id:5,reward:1,prob:-1,probS:0.25, probR:0.75,loss:0, counter:0, isreversed:0},
{id:6,reward:10,prob:-1,probS:0.75, probR:0.25,loss:0, counter:0, isreversed:0},
{id:7,reward:10,prob:-1,probS:0.25, probR:0.75,loss:0, counter:0, isreversed:0}
];


// addSymImage(symbols,0,"images/stim/",'.gif')

 //CHANGE PATH TO IMAGES DEPENDING ON EXPERIMENT
 if (auxexp.expSession === 'A'){
   addSymImage(symbols,0,"images/stim/Exp1/",'.gif')}else{
     addSymImage(symbols,0,"images/stim/Exp2/",'.gif')
   }

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


export{symbols,tSymbols} //fSymbols2


function addSymImage(obj,i0,path,ext){
let ID = _.shuffle(_.range(i0,i0+obj.length));

  for (let i = 0; i <= obj.length-1; i++){
    obj[i].imageID = ID[i];
    obj[i].image = new Image();
    obj[i].image.src = path +ID[i]+ext;}
}
