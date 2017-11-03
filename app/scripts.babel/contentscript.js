'use strict';

var test = `
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
(function() {
    var jsonResponse;
    var jsonResponseMap;
    var origOpen = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        this.addEventListener('load', function() {
            if (this.responseURL.indexOf("data.json") > -1 && this.status == "200")
            {
                jsonResponse = JSON.parse(this.responseText);
                var jsonResponseMap = jsonResponse.issues.reduce(function(map, obj) {
                    map[obj.key] = obj;
                    return map;
                },{});

                setTimeout(function(){
                    var issueArray = document.querySelectorAll("div.ghx-issue-content");

                    if (issueArray.length == jsonResponse.issues.length)
                    {
                        for (var i in issueArray)
                        {
                            if (issueArray[i].childNodes !== undefined)
                            {
                                var key = issueArray[i].childNodes["0"].children[2].innerText;
                                var issue = jsonResponseMap[key];
                                try{
                                    if (issue.trackingStatistic.statFieldValue.text !== undefined)
                                    {
                                        issueArray[i].childNodes[1].children[2].children[1].innerText = issue.trackingStatistic.statFieldValue.text;
                                    }
                                }
                                catch(ex)
                                {
                                }
                                if (issue.statusName == "In Progress")
                                {
                                    issueArray[i].style.backgroundColor = "cornflowerblue";
                                }
                                else if (issue.statusName.toUpperCase() == "Reopened".toUpperCase())
                                {
                                    issueArray[i].style.backgroundColor = "grey";
                                }
                                else if (issue.statusName.toUpperCase() == "Resolved".toUpperCase())
                                {
                                    issueArray[i].style.backgroundColor = "green";
                                }
                                else if (issue.statusName.toUpperCase() == "Ready for Unit Test".toUpperCase())
                                {
                                    issueArray[i].style.backgroundColor = "yellow";
                                }
                                else if (issue.statusName.toUpperCase() == "Closed".toUpperCase())
                                {
                                    issueArray[i].style.backgroundColor = "green";
                                }
                            }
                        }
                    }
                }, 1000);
            }
        });
        origOpen.apply(this, arguments);
    };
})();
`;

var script = document.createElement('script');
script.textContent = test;
(document.head||document.documentElement).appendChild(script);
script.remove();

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

