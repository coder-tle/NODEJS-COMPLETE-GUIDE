const http = require('http');

const server = http.createServer((req, res)=> {
    console.log(req.url, req.method, req.headers);
    
    const url = req.url;
    const method = req.method;
    const fs = require('fs');

    if(url === '/')
    {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action = "/message" method = "POST"><input type="text" name = "message"><button type="submit">Send</button></form></body>');
    // we are sending  'post' request to "/message" page    
    res.write('</html>');
    return res.end(); // this marks end of response, nodejs will send the written response to the client
    }
    if(url === '/message' && method === 'POST')
    {
        const body = [];
        req.on('data', chunk=>{
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            
            console.log(parsedBody);
            // fs.writeFileSync('Respone.txt', message); Synchronous way of writing blocks code
            fs.writeFile('Respone.txt', message, err=>{
                res.statusCode = 302; // this implies to browser that redirecting will occur
                res.setHeader('Location', '/');
                return res.end();
            });
        });
        
        // fs.writeFileSync('Respone.txt', 'Dummy response');
        // res.statusCode = 302; // this implies to browser that redirecting will occur
        //res.setHeader('Location', '/');
        // return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page    </title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');

    res.write('</html>');
    res.end();



});

server.listen(3000);
