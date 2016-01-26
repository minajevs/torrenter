var currentPage = 1;

var getUrl = function(page) {
    var searchQuery = jQuery('#input').val();
    var encodedSearchQuerty = encodeURIComponent(searchQuery);
    var url = 'https://service.smarttorrent.org/api/v1/distribution/search?searchQuery=' + encodedSearchQuerty + "&page="+page;
    return url;
};

var search = function(page) {
    var startTime = new Date().getTime();

    $.getJSON(getUrl(page), function(data) {
        jQuery('#results').empty();
        var items = data.Result;
        var total = data.ReturnedCount;
        $.each(items, function(item) {
            var itDiv =
                '<div class="item"><div class="ui mini image"><a target="_blank" href="' + items[item].link + '"><i class="download icon rounded huge"></i></a></div>'
                + '<div class="content">'
                    + '<a class="ui black header" target="_blank" href="http://rutracker.org/forum/tracker.php?nm=' + items[item].name + '">'
                        + items[item].name
                    + '</a>'
                    + '<div class="description">'
                    + items[item].category + ' | ' + items[item].forum
                    + '</div>'
                    + '<div class="meta">'
                        + '<span><div class="ui label"><i class="calendar icon"></i>  '
                        + items[item].registrationDate
                        + '</div></span>'
                        + '<span><div class="ui label"><i class="disk outline icon"></i>  '
                        + items[item].sizeMb + 'Mb'
                        + '</div></span>'
                    + '</div>'
                + '</div>'
            + '</div>';
            jQuery('#results').append(itDiv);
        });
        var requestTime = new Date().getTime() - startTime;
        jQuery('#resultNum').text(total);
        jQuery('#elapsed').text(requestTime/1000);
        jQuery('#page').text(currentPage + '/' + Math.ceil(total/50));
        jQuery('#stats').slideDown();

    });
};
var doSearch = function(p) {
    search(p, false);
    window.scrollTo(0, 0);
};

$('#search').on('click', function(){
    doSearch(1);
});
