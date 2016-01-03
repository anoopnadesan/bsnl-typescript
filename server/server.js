var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
exports.io = io;

// Run server to listen on port 3001.
http.listen(3001, function(){
  console.log('listening on *:3001');
});

/* Callback function to get latest events data */
function loadData(dataPath, callback) {
	eventsData = fs.readFile(__dirname + dataPath, "utf-8", function(error, data){
		if (error){
			callback("Cannot read the data file", null);
		}
		else{
			callback(null, data);
		}
	});
}

// Periodically raise events with list of data.
setInterval( function() {
	loadData("\\data\\events\\events.json", function (err, eventsData) {
		// send new data to the client
		io.emit('eventsDataList', eventsData);
	});
	loadData("\\data\\directory\\directory.json", function (err, directoryData) {
		// send new data to the client
		io.emit('directoryDataList', directoryData);
		//console.log(directoryData);
	});
}, 1000);