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
  // create url for fetching names
  let url="https://superheroapi.com/api/2396548877303023/"+id;

  // create xhr request
  let xhrReq=new XMLHttpRequest();

  xhrReq.onload=function(){
    // onload
    let responseJSON=JSON.parse(xhrReq.response);
    // add names of characters to array
    superheroDetails.push(responseJSON);
  }
  xhrReq.open('get',url,true);
  xhrReq.send();
}

// console.log(superheroDetails);

// using keyup for making suggestions list because keyup gives the full string entered in input
search.addEventListener('keyup',function(){
  // suggestionPanel emptied
  suggestionPanel.innerHTML="";
  const input= search.value;

  // filter the values of input and array
  const suggestions=superheroDetails.filter(function(superHero){
    return superHero.name.toLowerCase().startsWith(input);
  });

  // for each suggestion add to list
  suggestions.forEach(function(suggested)
  {
    // created LI elements
    const li=document.createElement('li');
    li.innerHTML=suggested.name;
    suggestionPanel.appendChild(li);
 
  });
  if(input==="")
  {
    // when textbox emptied list suggestions hide
    suggestionPanel.innerHTML="";
  }

});
}