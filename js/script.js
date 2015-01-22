
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $nytElem.text("");
    $wikiElem.text("#street");
    // load streetview

    // YOUR CODE GOES HERE!
    var street = $("#street").val();
    var city = $("#city").val();
    var address = street + ", " + city;

    $greeting.text("So, you want to live at " + address + "?");
    var src = "https://maps.googleapis.com/maps/api/streetview?location=" + address +"&size=600x400";
    var img = '<img class="bgimg" src="'+ src +'">';
    $body.append(img);

    //NYT AJAX request -- all query strings return the same 10 articles!? 
    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?[q='+ encodeURIComponent(address) +'&sort=newest&api-key=333e2c831eb04c241b85f73f8a465bc5:1:70977291'
    //
    
    
    $.getJSON(nytURL, function (data) {
        console.log(nytURL);
        $nytHeaderElem.text("New York Times Articles about " + address);
        articles = data.response.docs;
        for(var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        }
    })
    .error(function(e) {
            $nytHeaderElem.text("Fiddlesticks! We couldn't load any articles about " + address + ".");
    }); 

    return false;
};

$('#form-container').submit(loadData);


// loadData();
