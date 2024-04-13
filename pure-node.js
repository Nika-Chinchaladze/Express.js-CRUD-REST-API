const http = require("http");


const server = http.createServer((request, response) => {
    // request section
    let body = [];
    request.on("data", (chunck) => {
        body.push(chunck);
    });

    request.on("end", () => {
        body = Buffer.concat(body).toString();
        let userName = "Undefined User";

        if (body) {
            userName = body.split("=")[1];
        }

        // response section
        const form = `
            <h3>Hello, ${userName}</h3>
            <form method="POST" action="/">
                <input type="text" name="username">
                <button type="submit">Send</button>
            </form>
        `;
        response.setHeader("Content-Type", "text/html");
        response.write(form);
        response.end();
    });

});

server.listen(3000);
