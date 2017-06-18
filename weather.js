function getlocation()
{
  $.getJSON("https://ipinfo.io/json").success(function(data) {
      console.log("city::",data.city,data.ip);
      callApi( data.city);
   });
}


var temp;
var unit ="C";
function callApi(city){

var requrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=6170be3e1ce7da0cb315ffc39c393cfb";
$.getJSON(requrl).done(function(data){
	//console.log(data.main['temp']);
	 temp = Math.round(data.main["temp"]);
	var description = data.weather[0].description;
	var icon = "http://openweathermap.org/img/w/"+ data.weather[0].icon +".png";

	document.getElementById("temp").innerHTML = temp;
	document.getElementById("metric").innerHTML = " &#176;C";
	document.getElementById("location").innerHTML = data.name+"<span id='split'> | </span>";
	document.getElementById("description").innerHTML = description;
	$("#icon img").attr("src",icon);
	console.log(temp, description);
	//console.log(data);
}); 
}


$("#temp-wrap").click(function(){
if(unit == "C")
{
	unit="F";
	document.getElementById("temp").innerHTML = Math.round(temp * (9/5) + 35); 
	document.getElementById("metric").innerHTML = " &#176;F";
}else{
	unit = "C";	
	document.getElementById("temp").innerHTML = temp;
	document.getElementById("metric").innerHTML = " &#176;C";
}
});

 


  $('input').on('keyup', function(e) {
      if(e.which == 13 && $('input').val() != "")
      {
        callApi($('input').val());
      }
  });



$(document).ready(function(){

getlocation();
});