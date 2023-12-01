function disableF5(e) {
if ((e.which || e.keyCode) == 116) e.preventDefault();
}

// VISUALS
function addCanvas(target,id,width,height,classInfo) {
  let resp ='<div class="col"><div align = "center"><canvas '+ //canvas class=classInfo
            'id="'+id+'" width="'+width+'" height="'+height+ '"class="'+classInfo+
            '" style="width: 100%; height: auto; max-width:200px;">'+
            '</canvas></div></div>';
  $(target).append(resp);
}

function drawStim(symbol,optionId) {
  let canvas = document.getElementById(optionId)
  let Ax =  canvas.getContext("2d")
  Ax.drawImage(symbol.image,0,0)
  Ax.lineWidth = "1";
  Ax.strokeStyle = "black";
  Ax.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawEmpty(optionId) {
  let canvas = document.getElementById(optionId)
  let Ax =  canvas.getContext("2d")
  Ax.clearRect(0, 0, canvas.width, canvas.height);
  Ax.strokeStyle = "black";
}

function highlightOption(optionId) {
let canvas = document.getElementById(optionId)
let Ax =  canvas.getContext("2d")
// Ax.lineWidth = "5";
Ax.lineWidth = canvas.width*0.05;
Ax.strokeStyle = "black";
Ax.strokeRect(0, 0, canvas.width, canvas.height);
}



// ALL COMBINATION Schedule
function schedule_all(nSymbols,fdb){
  let k = [];
  for (let i = 0; i < nSymbols-1; i++) {
    for (let j = i+1; j < nSymbols; j++) {
      k.push({pair:[i,j],fdb:fdb})
  }}
  return k
}

function schedule_all_range(arr_symID,fdb){
  let k = [];
  for (let i = 0; i < arr_symID.length-1; i++) {
    for (let j = i+1; j < arr_symID.length; j++) {
      k.push({pair:[arr_symID[i],arr_symID[j]],fdb:fdb})
  }}
  return k
}



// ARAYS - USEFUL FUNCTIONS
function shuffle(array) {
  let counter = array.length;

  /* While there are elements in the array */
  while (counter > 0) {
    /* Pick a random index */
    let index = Math.floor(Math.random() * counter);

    /* Decrease counter by 1 */
    counter--;

    /* And swap the last element with it */
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
}

function getLastValue(myArray){
      return(myArray[myArray.length-1])
}

function findCor(index) {
      return index == 0;
    }

// find all values with the same key in a nested object
const recursiveSearch = (obj, searchKey, results = []) => {
   const r = results;
   Object.keys(obj).forEach(key => {
      const value = obj[key];
      if(key === searchKey && typeof value !== 'object'){
         r.push(value);
      }else if(typeof value === 'object'){
         recursiveSearch(value, searchKey, r);
      }
   });
   return r;
};

// CALCULATING PAYMENT
function points2pounds(points,rate) {
  let numb = points*rate;
  numb = numb.toFixed(2);
  return numb
}

// Functions for DRAG and DROP
function dragstart_handler(ev) {
 // Add the target element's id to the data transfer object
 ev.dataTransfer.setData("application/my-app", ev.target.id);
 ev.dataTransfer.effectAllowed = "move";
}

function dragover_handler(ev) {
 ev.preventDefault();
 ev.dataTransfer.dropEffect = "move"
}

function drop_handler(ev) {
 ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
 const data = ev.dataTransfer.getData("application/my-app");
 ev.target.appendChild(document.getElementById(data));
}

export {shuffle, getLastValue,findCor,disableF5,points2pounds,dragstart_handler,dragover_handler,drop_handler,schedule_all,recursiveSearch,schedule_all_range,
  addCanvas,drawStim,drawEmpty,highlightOption}
