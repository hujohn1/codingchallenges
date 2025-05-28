var http=require('http');

function cyclecallback(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(req.url);
    res.end();
}

const server = http.createServer(cyclecallback);
server.listen(8080);
