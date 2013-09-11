/**
 * Javascript based page load performance comparator
 */
ss = function(document, window, undefined) {

function getFollowerUrl(url) {
    var regexpStr = $("input[name='leaderMatch']").val()
    , re = new RegExp(regexpStr)
    , replacement = $("input[name='followReplace']").val()
    ;
    return url.replace(re, replacement);
};

/**
 * Loads the leader iframe from the inputted Url
 */
function loadFromInput() {
    var suffix = $("#setUrl").val()
    , url;
    if ( suffix.indexOf("/") == 0 ) {
        url = suffix;
    }
    else {
        url = "http://" + suffix;
    }
    time("#leader", url);
};

function refreshIframes() {
    var url = $("#leader").attr("src");
    time("#leader", url);
    sync(url);
}

/**
 * Update the follower pane to match the leader
 */
function sync(leaderUrl) {
    var followUrl = getFollowerUrl(leaderUrl)
    ;
    time("#follower", followUrl);
};

/**
 * Time the load time of a pane and report it to the DOM
 */
function time(selector, url) {
    var ele = $(selector)
    , iframeId = ele.attr("id")
    , timeEle = $(".timer[data-for='" + iframeId + "']")
    , start = new Date().getTime()
    , loadFunc = function(e) {
        var loadTime = new Date().getTime() - start
        ;
        timeEle.find(".time").html("Loaded in " + loadTime + " ms");
        timeEle.find(".url").html("At URL: " + ele.attr("src"));
        timeEle.removeClass("loading");
    }
    ;
    ele.one("load", loadFunc);
    timeEle.addClass("loading");
    ele.attr("src", url);
};

return {
    init:function() {
        $("#leader").load(function(e) {
            var url = e.target.contentWindow.location.href;
            sync(url);
        });
        $("input").not("#setUrl").change(function() {
            sync($("#leader").attr("src"));
        });
        $("#setUrl").change(loadFromInput);
        $("#reload").click(refreshIframes);

        // and kick off the first load
        loadFromInput();
    }
};

}(document, window, undefined);
