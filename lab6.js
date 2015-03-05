var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/cs360/";
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  //Install route for getcity
  //console.log(urlObj);
  if(urlObj.pathname.indexOf("getcity") != -1) {
		fs.readFile('cities.dat.txt', function(err, data){
			if (err) {
			  res.writeHead(404);
			  res.end(JSON.stringify(err));
			  return;
			}
			var cities = data.toString().split('\n');
			var myRe = new RegExp("^"+urlObj.query['q']);
			var returnCities = [];
			for(var i in cities){
				var result = cities[i].search(myRe);
				if (result != -1){
					returnCities.push({city: cities[i]});
				}
			}
			res.writeHead(200);
			res.end(JSON.stringify(returnCities));
		});
  }
  else{
	  fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
		if (err) {
		  res.writeHead(404);
		  res.end(JSON.stringify(err));
		  return;
		}
		res.writeHead(200);
		res.end(data);
	  });
  }
}).listen(80);


/*
var options = {
    hostname: 'localhost',
    port: '80',
    path: '/hello.html'
  };
function handleResponse(response) {
  var serverData = '';
  response.on('data', function (chunk) {
    serverData += chunk;
  });
  response.on('end', function () {
    console.log(serverData);
  });
}
http.request(options, function(response){
  handleResponse(response);
}).end();
*/
