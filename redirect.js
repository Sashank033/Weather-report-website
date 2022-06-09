function openPage(pageName,elmnt,color) {
  
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
   
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
  
    elmnt.style.backgroundColor = color;
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click()
  if(document.getElementById("today")){
    // $(document).ready(function(){
      $("#moreinfo").click(function(){
        $(".more_info").toggle('slow');
      });
    // }); 
        var locationName= localStorage.getItem("location")
       var url="https://maps.googleapis.com/maps/api/geocode/json?address="+locationName+"&key=AIzaSyBMFrotbCjiKI8VuA9K4mrMeNQCz9nM-GA"
      //  var url="http://dev.virtualearth.net/REST/v1/Locations?q="+locationName+"&o=json&key=AuggBcmgV6APqHxGv9guNppt6jvUYkEanx9MA35f4bCpmX1LGD2GzAQopJDZh8Af"
      var lat
      var long
       var todayWeather
        $.ajax(
            data={ "async": true,
               "crossDomain": true,"url":url,"method": "GET"}

        ).done(function (response) {
            console.log('response',response)
             lat=response.results[0].geometry.location.lat
    
long=response.results[0].geometry.location.lng
console.log(lat,long)
require(["esri/config","esri/Map", "esri/views/MapView",  "esri/Graphic",
"esri/layers/GraphicsLayer"], function (esriConfig,Map, MapView, Graphic, GraphicsLayer) {

  esriConfig.apiKey = "AAPK87238b2115f249d28e48b4ce69204d11D-IerhkLo3AVaSq115V2YV3tXCoXHgENXg5P04Osh1y45kkYP_3kxrfMUDNlK7N-";

  const map = new Map({
    basemap: "hybrid" // Basemap layer service
  });

  const view = new MapView({
    map: map,
    center: [long, lat], // Longitude, latitude
    zoom:12, // Zoom level
    container: "viewDiv" // Div element
  
  });
const graphicsLayer = new GraphicsLayer();
 map.add(graphicsLayer);
 const point = { //Create a point
  type: "point",
  longitude: long,
  latitude: lat
};
const simpleMarkerSymbol = {
  type: "simple-marker",
  color: [199, 19, 19],  // Orange
  outline: {
      color: [255, 255, 255], // White
      width: 1
  }
};
const pointGraphic = new Graphic({
  geometry: point,
  symbol: simpleMarkerSymbol
});
graphicsLayer.add(pointGraphic);

});

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://weatherbit-v1-mashape.p.rapidapi.com/current?lat="+lat+"&lon="+long,
    "method": "GET",
    "headers": {
      "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
      "X-RapidAPI-Key": "0f7d899408mshd9df5911e84caecp1a21b2jsn68fb068f76c5"
    }
};

$.ajax(settings).done(function (response) {
   
    todayWeather = response.data[0]
document.getElementById("today_uv_value").innerText=todayWeather.uv;
document.getElementById("today_temp_value").innerText=todayWeather.app_temp;
document.getElementById("today_pressure_value").innerText=todayWeather.slp;
document.getElementById("today_dew_value").innerText=todayWeather.dewpt;
document.getElementById("country_code_value").innerText=todayWeather.country_code;
// document.getElementById("city_name_value").innerText=todayWeather.city_name;
document.getElementById("rh_value").innerText=todayWeather.rh;
document.getElementById("aq_value").innerText=todayWeather.aqi;
document.getElementById("tz_value").innerText=todayWeather.timezone;
if(todayWeather.app_temp > 38){
  today_temp_value.style.color ='#cc0404';   
}else{
  today_temp_value.style.color = '#04cc29';
}
if(todayWeather.uv > 8){
  today_uv_value.style.color = '#cc0404';
}else if(5 < todayWeather.uv && todayWeather.uv < 8 ){
  today_uv_value.style.color = '#ccae04';  
}
else {
  today_uv_value.style.color = '#04cc29';
}
if(todayWeather.aqi < 51){
  aq_value.style.color = '#04cc29';
}else if(50 < todayWeather.aqi && todayWeather.aqi < 101 ){
  aq_value.style.color = '#ccae04';  
}
else if(100 < todayWeather.aqi && todayWeather.aqi < 201) {
  aq_value.style.color = '#f08605';
}
else{
  aq_value.style.color = '#cc0404';
}
});
current_time()
var time = new Date();
var cur_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
if(cur_time <"4:00 PM" && cur_time > '10:00 AM'){
  document.getElementById("today_img").src = "10AM- 4 PM.jpg";
}
else if('5:01 PM'< cur_time && cur_time > '3:59 PM'){
  document.getElementById("today_img").src = "4PM - 5 PM.jpg";

}
else if('6:01 PM'< cur_time && cur_time > '4:59 PM'){
  document.getElementById("today_img").src = "5PM-6PM.jpg";

}
else if(cur_time < '5:50 AM' && cur_time > '6:00 PM'){
  document.getElementById("today_img").src = "NIGHT.jpg";

}
else if( '7:01 AM'> cur_time && cur_time > '5:49 AM'){
  document.getElementById("today_img").src = "6AM-7AM.jpg";

}

        })
        
        

}

function current_time(){
var today = new Date();
var time = today.toLocaleString({hour12:true})
// var time = "TIME: "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
document.getElementById("current_time_value").innerText=time;
// var hour ="HOUR: "+today.getHours()
// document.getElementById("hour_time_value").innerText=hour;
    

}

if(document.getElementById("hourly")){
  
 
   
  var locationName= localStorage.getItem("location")
  var url="https://maps.googleapis.com/maps/api/geocode/json?address="+locationName+"&key=AIzaSyBMFrotbCjiKI8VuA9K4mrMeNQCz9nM-GA"
 //  var url="http://dev.virtualearth.net/REST/v1/Locations?q="+locationName+"&o=json&key=AuggBcmgV6APqHxGv9guNppt6jvUYkEanx9MA35f4bCpmX1LGD2GzAQopJDZh8Af"
 var lat
 var long
  var todayWeather
   $.ajax(
       data={ "async": true,
          "crossDomain": true,"url":url,"method": "GET"}

   ).done(function (response) {
       console.log('response',response)
        lat=response.results[0].geometry.location.lat

long=response.results[0].geometry.location.lng
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lat="+lat+"&lon="+long+"&hours=24",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
	  "X-RapidAPI-Key": "0f7d899408mshd9df5911e84caecp1a21b2jsn68fb068f76c5"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
  var hourlyWeather=response.data
  var blog = $('#blog');
  $.each(hourlyWeather, function(i,item){
    var blogpost = '<div class="card"  data-role="collapsible" data-collapsed="true" data-content-them="f"><h1>➼ '+new Date(item.timestamp_utc).toLocaleString({hour12:true})+'</h1><h1>'+item.app_temp+'°C</h1><div class="row1_data"><p><b>➼ PRECIPITATION: </b>'+item.precip+'</p><p id="hourly_solar"><b>➼ SOLAR RADIATION:</b> '+item.solar_rad+'</p><p><b>➼ SNOW: '+item.snow+'</b></p></div><div class="row2_data"><p><b>➼ SNOW-DEPTH:</b> '+item.snow_depth+'</p><p><b>➼ WIND DIRECTION:</b> '+item.wind_cdir_full+'</p><p id ="hour_wind_'+i+'"><b>➼ WIND SPEED: </b>'+item.wind_spd+'</p></div><div class="row3_data"><p id ="hour_uv_'+i+'"><b>➼ UV:</b> '+item.uv+'</p>'
   + '<p><b>➼ DEW POINT:</b> '+item.dewpt+'</p><p><b>➼ PRESSURE:</b> '+item.slp+'</p></div></div><br><br>';
 
   blog.append(blogpost);
   var hour_uv = document.getElementById("hour_uv_"+i);
   var hour_wind = document.getElementById("hour_wind_"+i);
  //  console.log('hour_uv',hour_uv)
   if(item.uv > 8){ 
      hour_uv.style.color = '#cc0404';
    }else if(5 < item.uv && item.uv < 8 ){
      hour_uv.style.color = '#ccae04';  
    }
    else {
      hour_uv.style.color = '#04cc29';
    }
    if(item.wind_spd > 1 && item.wind_spd < 4 ){ 
      hour_wind.style.color = '#5744eb';
    }else if(3 < item.wind_spd && item.wind_spd < 8 ){
      hour_wind.style.color = '#64b8e8';  
    }
    else if(7 < item.wind_spd && item.wind_spd < 13 ){
      hour_wind.style.color = '#9ddafc';  
    }
    else if(12 < item.wind_spd && item.wind_spd < 19 ){
      hour_wind.style.color = '#6ff2e1';  
    }
    else if(18 < item.wind_spd && item.wind_spd < 25 ){
      hour_wind.style.color = '#0a6b0f';  
    }
    else if(24 < item.wind_spd && item.wind_spd < 32 ){
      hour_wind.style.color = '#6ff276';  
    }
    else if(31 < item.wind_spd && item.wind_spd < 39 ){
      hour_wind.style.color = '#ebe2d1';  
    }
    else if(38 < item.wind_spd && item.wind_spd < 47 ){
      hour_wind.style.color = '#fcc762';  
    }
    else if(46 < item.wind_spd && item.wind_spd < 55 ){
      hour_wind.style.color = '#c9a379';  
    }
    else if(54 < item.wind_spd && item.wind_spd < 64 ){
      hour_wind.style.color = '#ab600e';  
    }
    else if(63 < item.wind_spd && item.wind_spd < 76 ){
      hour_wind.style.color = '#8a0f34';  
    }
    else {
      hour_wind.style.color = '#df64e3';
    }
    // var ctx = document.getElementById("examChart").getContext("2d");
   
    //   var myChart = new Chart(ctx, {
    //     type: 'line',
    //     options: {
    //       scales: {
    //         xAxes: [{
    //           type: 'time',
    //         }]
    //       }
    //     },
    //     data: {
    //       labels: ["2015-03-15T13:03:00Z", "2015-03-25T13:02:00Z", "2015-04-25T14:12:00Z"],
    //       datasets: [{
    //         label: 'Demo',
    //         data: [{
    //             t: '2015-03-15T13:03:00Z',
    //             y: 12
    //           },
    //           {
    //             t: '2015-03-25T13:02:00Z',
    //             y: 21
    //           },
    //           {
    //             t: '2015-04-25T14:12:00Z',
    //             y: 32
    //           }
    //         ],
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(255, 206, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(153, 102, 255, 0.2)',
    //           'rgba(255, 159, 64, 0.2)'
    //         ],
    //         borderColor: [
    //           'rgba(255,99,132,1)',
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 206, 86, 1)',
    //           'rgba(75, 192, 192, 1)',
    //           'rgba(153, 102, 255, 1)',
    //           'rgba(255, 159, 64, 1)'
    //         ],
    //         borderWidth: 1
    //       }]
    //     }
    //   });

   


    

 });


});
})
}

if(document.getElementById("daily")){
  
 
   
  var locationName= localStorage.getItem("location")
  var url="https://maps.googleapis.com/maps/api/geocode/json?address="+locationName+"&key=AIzaSyBMFrotbCjiKI8VuA9K4mrMeNQCz9nM-GA"
 
 var lat
 var long
  var todayWeather
   $.ajax(
       data={ "async": true,
          "crossDomain": true,"url":url,"method": "GET"}

   ).done(function (response) {
       console.log('response',response)
        lat=response.results[0].geometry.location.lat

long=response.results[0].geometry.location.lng
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat="+lat+"&lon="+long+"&hours=24",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
	  "X-RapidAPI-Key": "0f7d899408mshd9df5911e84caecp1a21b2jsn68fb068f76c5"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
  var dailyWeather=response.data
  var blog = $('#daily_data');
  $.each(dailyWeather, function(i,item){
    var dailyData = '<div class="card"  data-role="collapsible" data-collapsed="true" data-content-them="f"><h1>DATE: '+new Date(item.valid_date).toDateString()+'</h1><h1>'+item.app_max_temp+'°C</h1><div class="row1_data"><p><b>➼ PRECIPITATION: </b>'+item.precip+'</p><p><b>➼ HIGH TEMPERATURE:</b> '+item.high_temp+'</p><p><b>➼ SNOW: '+item.snow+'</b></p></div><div class="row2_data"><p><b>➼ SNOW-DEPTH:</b> '+item.snow_depth+'</p><p><b>➼ WIND DIRECTION:</b> '+item.wind_cdir_full+'</p><p><b>➼ WIND SPEED: </b>'+item.wind_spd+'</p></div><div class="row3_data"><p><b>➼ UV:</b> '+item.uv+'</p>'
   + '<p><b>➼ DEW POINT:</b> '+item.dewpt+'</p><p><b>➼ PRESSURE:</b> '+item.slp+'</p></div></div><br><br>';
 
   blog.append(dailyData);
 });
  

});
})
}
if(document.getElementById("minutely")){
  
 
   
  var locationName= localStorage.getItem("location")
  var url="https://maps.googleapis.com/maps/api/geocode/json?address="+locationName+"&key=AIzaSyBMFrotbCjiKI8VuA9K4mrMeNQCz9nM-GA"
 
 var lat
 var long
  var todayWeather
   $.ajax(
       data={ "async": true,
          "crossDomain": true,"url":url,"method": "GET"}

   ).done(function (response) {
       console.log('response',response)
        lat=response.results[0].geometry.location.lat

long=response.results[0].geometry.location.lng
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely?lat="+lat+"&lon="+long+"&hours=24",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
	  "X-RapidAPI-Key": "0f7d899408mshd9df5911e84caecp1a21b2jsn68fb068f76c5"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
  var minutelyWeather=response.data
  var blog = $('#minute_data');
  $.each(minutelyWeather, function(i,item){
    var minutelyData = '<div class="card"  data-role="collapsible" data-collapsed="true" data-content-them="f"><h1>➼ TIME & DATE: '+new Date(item.timestamp_utc).toLocaleString({hour12:true})+'</h1><h1>'+item.temp+'°C</h1><div class="row1_data"><p><b>➼ PRECIPITATION: </b>'+item.precip+'</p><p><b>➼ SNOW: '+item.snow+'</b></p></div></div><br><br>';
 
   blog.append(minutelyData);
 });
  

});
})
}



