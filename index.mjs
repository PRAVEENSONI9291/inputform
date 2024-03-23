import http from 'http';
import fs from 'fs';






const server = http.createServer((req, res) => {
    
    const url = req.url;
    const method = req.method;
    // console.log("request method is", method);


    if (url === '/') {
        fs.readFile("data.txt", "utf-8", (err, data) => {

            if (err) {
                console.log(err);
            }
            // console.log("data from file", data);
            res.write('<html>');
            res.write("<head><title>enter message</title></head>");
            res.write(`<body>${data}</body>`);
            res.write(`<body><form action="/message" method="POST"  ><input type="text" name="message"><button type="submit">send</button></form></body>`);
            res.write("</html>")
            return res.end();
        })
    }
    else if (url === '/message' && method === 'POST') {
        const body = [];

        req.on("data", (chunk) => {
            body.push(chunk);
            // console.log(chunk);
        console.log("body is", body.toString('utf-8'));

        });

        return req.on("end", () => {
            // const parsedbody = Buffer.concat(body).toString();
            // console.log("parsedbody>>>>>>", parsedbody);
            // const message = parsedbody.split("=")[1];
             
            const message = body.toString('utf-8').split("=")[1];


            fs.writeFile('./data.txt', message, (err) => {
                if (err) {
                    console.log(err);
                }
                // console.log("in the fs.writefile");
                res.statusCode = 302;
                res.setHeader('location', '/');
                return res.end();

            })
        })
    }
    else {
        res.setHeader("Content-Type", "text/html");
        res.write('<html>');
        res.write("<head><title>my first page</title></head>");
        res.write(`<body><h1>hello from node</h1></body>`);
        res.write("</html>")
        res.end();
    }

})



server.listen(7000, "127.0.0.1", () => {

    console.log("listening");

})