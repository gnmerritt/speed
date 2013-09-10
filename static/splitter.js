/**
 * Javascript based page load performance comparator
 */
ss = function(document, window, undefined) {

function leaderChange(e) {
    var url = e.target.contentWindow.location.href;
    $("#follower").attr('src', url);
};

return {
    init:function() {
        $("#leader").load(leaderChange);
    }
};

}(document, window, undefined);
