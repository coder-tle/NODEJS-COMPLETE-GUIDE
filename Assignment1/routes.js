const fs = require('fs');

const requestHandler = (req,res)=>{
    const url = req.url;
    const method = req.method;
    console.log(url, method);
    // res.write('<html>')
    // res.write('<body><h1>"Server loading "</h1></body>')
    // res.write('</html')  
    // res.end()

    if(url === '/')
    {
        // redirect to greeting message
        
        // I missed to add header detail

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<h1>Antonian Server</h1>');
        res.write('<form action ="/create-user" method = "POST"><input type = "text" name = "username"> <button type = "submit"> Send </button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/users')
    {
        // redirect to greeting message
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><ul><li>User 1 : Coder Alam</li></ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/create-user'&& method === 'POST')
    {
        const fs = require('fs');
        const body = []
        req.on('data', chunk=>{
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            console.log(message);

            fs.writeFile('User-details.txt', message , err=>{
                res.statusCode = 302; // this implies to browser that redirecting will occur
                res.setHeader('Location', '/');
                return res.end();
            });

        });
    
    }
}

module.exports = requestHandler;