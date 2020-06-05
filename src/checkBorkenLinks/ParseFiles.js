// var filePath = "17MarchHtmlTest-FR.json";
var filePath = "HtmlTopic.json";
var regex = "(http|https)://(www)*(.|w|/|-|=|&|%|(|))*";
var text = "";
var uriCount = 0;
var number = 0;
var processedUriCount = 0;

var urlRes = [];
function returnUrl(res) {
  urlRes = res;
}

function insertLabel(status, url, index) {
  if (text.indexOf(url) !== -1) {
    return;
  }
  if (status === 200) {
    text += "<p>" + "<b><a href='" + url + "'>" + url + "</a></b>: valid</p>";
  } else {
    text += "<p>" + "<b><a href='" + url + "'>" + url + "</a></b> invalid</p>";
  }
}

function readFile() {
  (function (data) {
    var matches = /(http|https):\/\/(\w+)(\.|\w|\/|-|\?|=|&|%|\(|\))*/g.execAll(
      JSON.stringify(data)
    );
    document.getElementById("demo").innerHTML =
      "Validating uris, please wait...";

    console.log(matches);
    matches.forEach(function (element, index) {
      var url = element.toString().split(",")[0];
      document.getElementById("demo").innerHTML +=
        "<br/>Verifying " + url + index;
      validateUrl(url, index);
    });

    console.log(number);
  })(urlRes);
}

function validateUrl(url, index) {
  number += 1;
  $.ajax({
    async: false,
    type: "get",
    cache: false,
    url: url,
    dataType: "jsonp",
    processData: false,
    timeout: 1000,
    complete: function (data) {
      if ("function" === typeof insertLabel) {
        console.log(url);
        insertLabel(data.status, url, number);
        document.getElementById("demo").innerHTML = text;
      }
    },
  });
}

// Return all pattern matches with captured groups
RegExp.prototype.execAll = function (string) {
  var match = null;
  var matches = new Array();
  while ((match = this.exec(string))) {
    var matchArray = [];
    for (i in match) {
      if (parseInt(i) == i) {
        matchArray.push(match[i]);
      }
    }
    matches.push(matchArray);
  }
  return matches;
};
