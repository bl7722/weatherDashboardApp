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
    var queryURLSearch = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ecac000c23218f68d3988ab691ab8a35";
    var queryURLWeek = "https://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=ecac000c23218f68d3988ab691ab8a35";


    $.ajax({
        url: queryURLSearch,
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
        temp.text("Temp: " + Math.round(((((response.main.temp)-273.15)*1.8)+32))+ " F");
   
    // humidity <p> tag 
    var humidity = $("<p>")
        humidity.text("Humidity: " + response.main.humidity);
    
    // wind speed <p> tag 
    var wind = $("<p>");
        wind.text("Wind Speed" + response.wind.speed);
   
    // UV index <p> tag   
    var UV = $("<p>");
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=ecac000c23218f68d3988ab691ab8a35&lat="+lat+"&lon="+lon+"&cnt=1";
        
        $.ajax({
            url: uvURL,
            method:"GET"
        }).then(function(response){
            UV.text("UV Index: " + response[0].value);
        })

    // append to newCard
    newCard.append(title);
    newCard.append(temp);
    newCard.append(humidity);
    newCard.append(wind);
    newCard.append(UV);
    
    //append newCard to newRow
    newRow.append(newCard);
    // append newRow to resultsArea div
    resultsArea.append(newRow);
});

    $.ajax({
        url: queryURLWeek,
        method: "GET"
    }).then(function(response){     

    //  new 5 day forecast second row 
    var newRow2 = $("<div>").addClass("row"); 
    var newRow3 = $("<div>").addClass("row");

    // new 5DF h4 
    var fiveday = $("<h4>");
        fiveday.text("5 Day Forecast");
        newRow2.append(fiveday);
    
    // day 1 div
    var dayOne = $("<div>");
        //  new day 1 card 
        var dayOneCard= $("<div>").addClass("card mr-5 bg-primary text-white");
                var dateOne= $("<p>").text(moment().add(1, 'days').format("MMM Do YYYY"));
                // p temp
                var  tempOne= $("<p>").text("Temp: " + Math.round(((((response.list[1].main.temp)-273.15)*1.8)+32))+ " F");
                // p humidity
                var humidOne= $("<p>").text("Humidity: " + response.list[1].main.humidity);
            // append date, temp, humidity 
            dayOneCard.append(dateOne);
            dayOneCard.append(tempOne);
            dayOneCard.append(humidOne);

        dayOne.append(dayOneCard);
        newRow3.append(dayOne);

    // day 2 div
    var dayTwo = $("<div>");
        //  new day 2 card 
        var dayTwoCard= $("<div>").addClass("card mr-5 bg-primary text-white");
              var dateTwo= $("<p>").text(moment().add(2, 'days').format("MMM Do YYYY"));
              // p temp
              var  tempTwo= $("<p>").text("Temp: " + Math.round(((((response.list[2].main.temp)-273.15)*1.8)+32))+ " F");
              // p humidity
              var humidTwo= $("<p>").text("Humidity: " + response.list[2].main.humidity);
          // append date, temp, humidity 
          dayTwoCard.append(dateTwo);
          dayTwoCard.append(tempTwo);
          dayTwoCard.append(humidTwo);

        dayTwo.append(dayTwoCard);
        newRow3.append(dayTwo);

    // day 3 div
    var dayThree = $("<div>");
        //  new day 3 card 
        var dayThreeCard= $("<div>").addClass("card mr-5 bg-primary text-white");
                var dateThree= $("<p>").text(moment().add(3, 'days').format("MMM Do YYYY"));
                 // p temp
                var  tempThree= $("<p>").text("Temp: " + Math.round(((((response.list[3].main.temp)-273.15)*1.8)+32))+ " F");
                // p humidity
                var humidThree= $("<p>").text("Humidity: " + response.list[3].main.humidity);
            // append date, temp, humidity
            dayThreeCard.append(dateThree);
            dayThreeCard.append(tempThree);
            dayThreeCard.append(humidThree);

        dayThree.append(dayThreeCard);
        newRow3.append(dayThree);

    // day 4 div
    var dayFour = $("<div>");
        //  new day 4 card 
        var dayFourCard= $("<div>").addClass("card mr-5 bg-primary text-white");
                var dateFour= $("<p>").text(moment().add(4, 'days').format("MMM Do YYYY"));
                 // p temp
                var  tempFour= $("<p>").text("Temp: " + Math.round(((((response.list[4].main.temp)-273.15)*1.8)+32))+ " F");
                // p humidity
                var humidFour= $("<p>").text("Humidity: " + response.list[4].main.humidity);
            // append date, temp, humidity
            dayFourCard.append(dateFour);
            dayFourCard.append(tempFour);
            dayFourCard.append(humidFour);

        dayFour.append(dayFourCard);
        newRow3.append(dayFour);

    // day 5 div
    var dayFive = $("<div>");
        //  new day 5 card 
        var dayFiveCard= $("<div>").addClass("card mr-5 bg-primary text-white");
                var dateFive= $("<p>").text(moment().add(5, 'days').format("MMM Do YYYY"));
                 // p temp
                var  tempFive= $("<p>").text("Temp: " + Math.round(((((response.list[5].main.temp)-273.15)*1.8)+32))+ " F");
                // p humidity
                var humidFive= $("<p>").text("Humidity: " + response.list[5].main.humidity);
            // append date, temp, humidity
            dayFiveCard.append(dateFive);
            dayFiveCard.append(tempFive);
            dayFiveCard.append(humidFive); 

        dayFive.append(dayFiveCard); 
        newRow3.append(dayFive);

    // append newRow2 to resultsArea div 
    resultsArea.append(newRow2);
    // append newRow3 to resultsArea div 
    resultsArea.append(newRow3);
    });
    
});