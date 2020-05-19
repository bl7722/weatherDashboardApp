// global variables
var searchBtn = $(".searchBtn");
var resultsArea = $(".resultsArea")
var newCity = $(".newCity");

// searchBtn click event listener function
searchBtn.on("click", function(event){
    event.preventDefault();
    
    var cityButton = $("<button>");
    cityButton.text($("#searchBar").val());
    cityButton.addClass("citybutton btn btn-primary col align-self-end border border-white");

    newCity.append(cityButton);
});


$(document).on("click", ".citybutton",function(event){
    event.preventDefault();
    resultsArea.empty();
    var city = $(this).text();
    var date = moment().format("MMM Do YYYY");
    var queryurlSearch = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2d91d7d9be19dd3bb1c0b154fb2ca123";
    var queryurlWeek = "https://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=2d91d7d9be19dd3bb1c0b154fb2ca123";


    $.ajax({
        url: queryurlSearch,
        method: "GET"
    }).then(function(response){

    // new card and new row for card
    var newCard = $("<div>").addClass("card w-100");
    var newRow = $("<div>").addClass("row");
    
    // new h4 tag showing place and today's date 
    var title = $("<h4>");
        title.text(city + " (" + date + ")");
   
    // temp <p> tag
    var temp = $("<p>");
        temp.text(Math.round(((((response.main.temp)-273.15)*1.8)+32))+ " F");
   
    // humidity <p> tag 
    var humidity = $("<p>")
        humidity.text("Humidity: " + response.main.humidity);
    
    // wind speed <p> tag 
    var wind = $("<p>");
        wind.text(response.wind.speed);
   
    // UV index <p> tag   
    var UV = $("<p>");
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        var uvurl = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=2d91d7d9be19dd3bb1c0b154fb2ca123&lat="+lat+"&lon="+lon+"&cnt=1";
        
        $.ajax({
            url: uvurl,
            method:"GET"
        }).then(function(response){
            console.log(response)
            UV.text("UV Index: " + response[0].value);
        })

    // appending to newCard
    newCard.append(title);
    newCard.append(temp);
    newCard.append(humidity);
    newCard.append(wind);
    newCard.append(UV);
    newRow.append(newCard);
    resultsArea.append(newRow);
});

    // search api for 5 day forecast (fDF)
    $.ajax({
        url: queryurlWeek,
        method: "GET"
    }).then(function(response){     

    //  new fDF second row 
    var newRow2 = $("<div>").addClass("row"); 
    var newRow3 = $("<div>").addClass("row");

    // new fDF h4 
    var fiveday = $("<h4>");
        fiveday.text("5 Day Forecast");
        newRow2.append(fiveday);
    
    // day 1 div
    var dayOne = $("<div>");
        //  new day 1 card 
        var dayOneCard= $("<div>").addClass("card mr-5 bg-primary text-white");
                var dateOne= $("<p>").text(moment().add(1, 'days').format("MMM Do YYYY"));
                // p temp
                var  tempOne= $("<p>").text(Math.round(((((response.list[1].main.temp)-273.15)*1.8)+32))+ " F");
                // p humidity
                var humidOne= $("<p>").text("Humidity: " + response.list[1].main.humidity);
            // append date, temp, humidity 
            dayOneCard.append(dateOne);
            dayOneCard.append(tempOne);
            dayOneCard.append(humidOne);

        dayOne.append(dayOneCard);
        newRow3.append(dayOne);

    
    
});