var i;
var count=document.getElementById("count");
// get all del icons
var close = document.getElementsByClassName("del");

// getting favorites names
var storedNames = JSON.parse(localStorage.getItem("fav"));
  
// Here array.values() function is called. 
var iterator = storedNames.values(); 
  
// Here all the elements of the array is being printed. 
for (let elements of iterator) { 
  createItem(elements);
} 


function createItem(item) 
{
  // create LI for favorites
  var li = document.createElement("li");
  var t = document.createTextNode(item);
  li.appendChild(t);
  document.getElementById("task-items").appendChild(li);

  // add icon to delete at last
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "del";
  span.appendChild(txt);
  li.appendChild(span);

  // add event listener for deleting
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement.innerText;
      div=div.substring(0,div.length-2);
      // get string in var div
      let arr=JSON.parse(localStorage.getItem("fav"));
      // if it matches to element in array get its index
      var index = arr.indexOf(div);
      // Array.splice the element
      if (index !== -1) arr.splice(index, 1);
      // again store it back
      localStorage.setItem("fav", JSON.stringify(arr));
      
      // page reload
      location.reload();

    }
  }
}
    