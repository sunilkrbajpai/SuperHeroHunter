var name;

function getDetails(){
    name=localStorage.getItem("PageToOpen"); //accessing localstorage
    let url="https://superheroapi.com/api.php/2396548877303023/search/"+name; //url for api
  
    let xhrReq=new XMLHttpRequest(); //create XHR request
    xhrReq.onload=function(){
        let responseJson=JSON.parse(xhrReq.response);
        console.log(responseJson.response);
        if(responseJson.response==="success")  //if successful
      {
            // show data on HTML elements
        document.getElementById("name").innerHTML =responseJson.results[0].name;
      document.getElementById("photo").src=responseJson.results[0].image.url;

      var temp="";

      var myobj=responseJson.results[0].biography;
      for (let [key, value] of Object.entries(myobj)) {
        temp+=(`${key}: ${value}`)+"<br>";
      }      
      document.getElementById("bio").innerHTML=temp;
      temp="";
      // get all powerstats
      var power=responseJson.results[0].powerstats;
      for (let [key, value] of Object.entries(power)) {
        temp+=(`${key}: ${value}`)+"<br>";
      }      
      document.getElementById("powerstats").innerHTML=temp;
      }
      else
      {
        //   if failed
        alert("No name match found. Enter Valid name!!!");
      }
      }
    //   send XHR request
      xhrReq.open('get',url,true);
      xhrReq.send();
    }


// function for adding to favorite
  function addToFav()
  {
    // get all facorites
    var storedNames = JSON.parse(localStorage.getItem("fav"));

    // if it already has name dont add
    if(!storedNames.includes(name))
        storedNames.push(name);

      console.log(storedNames)
      // save it back
    localStorage.setItem("fav", JSON.stringify(storedNames));
    alert("Added to favorites");
  }
    
