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

function sync( leaderUrl ) {
    var followUrl = getFollowerUrl( leaderUrl )
    , followerS
    ;
    $("#follower").attr("src", followUrl);
};

return {
    init:function() {
        $("#leader").load(function(e) {
            var url = e.target.contentWindow.location.href;
            sync( url );
        });
        $("input").not("#setUrl").change(function() {
            sync( $("#leader").attr("src") );
        });
        $("#setUrl").change(function() {
            var url = "http://" + $(this).val();
            $("#leader").attr( "src", url );
            sync( url );
        });
    }
};

}(document, window, undefined);
