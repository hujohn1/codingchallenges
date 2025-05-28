var http=require('http');
var mod = require('./demo_module');
var fs=require('fs');
var uc=require('upper-case');
var events=require('events');
var os = require('os');
var util = require('util');

//HTTP request format: request type (GET, POST, PUT, DELETE), etc
//HTTP response format: Protocol version, Status code, Status message, Response Headers, Body

/*status codes:
100-199: information
200-299: good
300-399: redirects
400-499: client error
500-599: server error
*/


var eventEmitter = new events.EventEmitter();
eventEmitter.on('fire', eventHandler);
eventEmitter.emit('fire');

function eventHandler (){
    console.log("run from fire");
}


function cyclecallback(req, res){
    fs.readFile('demofile.html', function(err, data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        res.write(uc.upperCase('hello world'));
        return res.end();
    });
}

const server2 = http.createServer((req, res)=>{

    switch(req.method){
        case 'GET':
            return handleGetRequest(req, res);
        case 'POST':
            return handlePostRequest(req, res);
    }

});


const server = http.createServer(cyclecallback);
server.listen(8080);

//fs.append(file)
//fs.rename()
//fs.unlink()
//fs.open(file);
//fs.write(file);
