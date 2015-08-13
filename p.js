var phantom = require('phantomjs');
var page = require('webpage').create();
page.open('http://www.foundersandcoders.com', function(status) {
  console.log("status: " + status);
  if (status === "success") {
    page.render("example.png");
  }
  phantom.exit();
})
