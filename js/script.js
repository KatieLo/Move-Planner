
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $nytElem.text("");
    $wikiElem.text("");
    // load streetview

    // YOUR CODE GOES HERE!
    var street = $("#street").val();
    var city = $("#city").val();
    var address = street + ", " + city;

    $greeting.text("So, you want to live at " + address + "?");
    var src = "https://maps.googleapis.com/maps/api/streetview?location=" + address +"&size=600x400";
    var img = '<img class="bgimg" src="'+ src +'">';
    $body.append(img);

    //NYT AJAX request 
    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ encodeURIComponent(city) +'&sort=newest&api-key=333e2c831eb04c241b85f73f8a465bc5:1:70977291';

    $.getJSON(nytURL, function (data) {
        console.log(nytURL);
        $nytHeaderElem.text("New York Times Articles related to " + address);
        articles = data.response.docs;
        for(var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        }
    })
    .error(function(e) {
            $nytHeaderElem.text("Fiddlesticks! We couldn't load any articles about " + address + ".");
    }); 

    //Wikipedia AJAX request 
    var wikiURL = "http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search="+ encodeURIComponent(city) +"&callback=catchWikipedia";
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("On no - couldn't get any wikipedia links!");
    }, 8000);

    $.ajax({
      url: wikiURL,
      dataType: "jsonp",
      // callback function for jsonp
      success: function(data){

        var articleList = data[1]; // from the returned object, the parameter 1 is an array of articles.
         console.log(articleList);
        for(var i = 0; i < articleList.length; i++){
            console.log("in for loop");
            articleString = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleString;
             $('#wikipedia-links').append('<li>' + '<a href="' + url + '">'+ articleString +'</a></li>');
        }
        clearTimeout(wikiRequestTimeout);
      }
    });

    return false;
};

$('#form-container').submit(loadData);


// loadData();
