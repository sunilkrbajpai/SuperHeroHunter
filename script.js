var list = document.querySelector('ul');
var search=document.getElementById('Input');
const suggestionPanel=document.querySelector('.suggestions');

// create array storing information from API
var superheroDetails=[];

// if localStorage for fav is not made then make it
// only run first time
var check = localStorage.getItem("fav");
if (check === null) {
  var fav = [];
  localStorage.setItem("fav", JSON.stringify(fav));
  console.log("created")
}

// function to get eventtarger and LI clicked
function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement; 
}
// add onclick event on LI items
  list.onclick = function(event) {
  var target = getEventTarget(event);

  // get name to open details
  var str=target.innerText;

  // store name in localStorage for opening its details
  localStorage.setItem("PageToOpen",str);
  // open details page and show details
  window.location.href = "details.html";
};

// function called onload of body
function getDetails(){
for(let id=1;id<=731;id++)
{
  getName(id);
}
  // create url for fetching names

//   // create xhr request
//   let xhrReq=new XMLHttpRequest();

//   xhrReq.onload=function(){
//     // onload
//     let responseJSON=JSON.parse(xhrReq.response);
//     // add names of characters to array
//     superheroDetails.push(responseJSON);
//   }
//   xhrReq.open('get',url,true);
//   xhrReq.send();
// }
}
async function getName(id)
{
let url="https://superheroapi.com/api.php/2396548877303023/"+id;

try{var response=await fetch(url)

  var data=await response.json();
  superheroDetails.push(data.name);
}catch(error){
  console.log("error",error);
};

console.log(superheroDetails);

// using keyup for making suggestions list because keyup gives the full string entered in input
search.addEventListener('keyup',function(){
  // suggestionPanel emptied
  suggestionPanel.innerHTML="";
  const input= search.value;

  // filter the values of input and array
  const suggestions=superheroDetails.filter(function(superHero){
    return superHero.toLowerCase().startsWith(input);
  });

  // for each suggestion add to list
  suggestions.forEach(function(suggested)
  {
    // created LI elements
    const li=document.createElement('li');
    li.innerHTML=suggested;
    suggestionPanel.appendChild(li);
 
  });
  if(input==="")
  {
    // when textbox emptied list suggestions hide
    suggestionPanel.innerHTML="";
  }

});
}
