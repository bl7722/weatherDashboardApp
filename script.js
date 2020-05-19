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
    