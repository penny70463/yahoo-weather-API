$(document).ready(function(){
  $('#submit').click(function(){
     
    var city = $('#city').val();
  var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'"
  
  $('#city').val('');
    
  //城市溫度
  $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json").success(function(data){
   console.log(data);
   $('#temp').html(data.query.results.channel.item.condition.temp + "°C");
   $('#area').html(city+' City<br>now');
   $('#weather').text(data.query.results.channel.item.condition.text);
   var a = new Date();
var b = a.getHours();
 var ampm=(b>12)?'n':'d';  $('#code').attr('src',"http://l.yimg.com/a/i/us/nws/weather/gr/"+data.query.results.channel.item.condition.code+ampm+".png")
  })
   
   //濕度
  var searchhumid="select atmosphere.humidity from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'"
  $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchhumid + "&format=json").success(function(data){
   console.log(data);
   $('#humidity').html(data.query.results.channel.atmosphere.humidity+'%');
  });
    //日出日落
   var searchsunrise="select astronomy.sunrise from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'"
   var searchsunset="select astronomy.sunset from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'"
  $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchsunrise + "&format=json").success(function(data){
   console.log(data);
    var sunrisetime=data.query.results.channel.astronomy.sunrise;
    var y=sunrisetime.toString();
    var Regex = /\:\d{2}/;
    var arr=y.split('');arr.splice(2,0,'0');var y1=arr.join('');
    Regex.test(y)? $('#sunrise').text(sunrisetime+'/'):$('#sunrise').text(y1+'/');
 
  });
  $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchsunset + "&format=json").success(function(data){
   console.log(data);
    var sunsettime=data.query.results.channel.astronomy.sunset;
    var x=sunsettime.toString();
    var Regex = /\:\d{2}/;
    var arr=x.split('');arr.splice(2,0,'0');var x1=arr.join('');
    Regex.test(x)? $('#sunset').text(sunsettime):$('#sunset').text(x1);
  });
    //一周天氣
    var searchdate = "select item from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'" 
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchdate + "&format=json").success(function(data){
   console.log(data);
      $('ul').empty();
   var datetoday= data.query.results.channel.item.forecast[0].date;
   var lowtoday=data.query.results.channel.item.forecast[0].low;
   var hightoday=data.query.results.channel.item.forecast[0].high;
   var weattoday=data.query.results.channel.item.forecast[0].text;
   var daytoday=data.query.results.channel.item.forecast[0].day;
   $('ul').append("<li  class='today'>"+daytoday+"<br>"+datetoday+"<br>"+hightoday+"°C / "+lowtoday+"°C<br>"+weattoday+"</li>");
   for(var i=1;i<=6;i++){
   var date= data.query.results.channel.item.forecast[i].date;
   var low=data.query.results.channel.item.forecast[i].low;
   var high=data.query.results.channel.item.forecast[i].high;
   var weat=data.query.results.channel.item.forecast[i].text;
   var day=data.query.results.channel.item.forecast[i].day;
  $('ul').append("<li id='day'>"+day+"<br>"+date+"<br>"+high+"°C / "+low+"°C<br>"+weat+"</li>");
      } 
  
  });
    
  });
  });