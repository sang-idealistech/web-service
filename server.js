const http = require("http");

// fungsi server
const requestListener = (request, response) => {
    response.setHeader("Content-Type", "application/json");
    response.setHeader("X-Powered-By", "ModeJs");

    // destructuring object request
    const { url, method } = request;
    // if path url if method
    if (url === "/") {
        if (method === "GET") {
            response.statusCode = 200;
            response.end(
                JSON.stringify({
                    message: "Ini adalah Home Page!",
                })
            );
        } else {
            response.statusCode = 400;
            response.end(
                JSON.stringify({
                    message: `Halaman tidak dapat diakses dengan ${method} request`,
                })
            );
        }
    } else if (url === "/about") {
        if (method === "GET") {
            response.statusCode = 200;
            response.end(
                JSON.stringify({
                    message: "Halo! Ini adalah halaman about",
                })
            );
        } else if (method === "POST") {
            let body = [];
            request.on("data", (chunk) => {
                body.push(chunk);
            });
            request.on("end", () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(`hello ${name} !!`);
            });
        } else {
            response.statusCode = 400;
            response.end(
                JSON.stringify({
                    message: "Ini adalah Home Page!",
                })
            );
        }
    } else {
        response.statusCode = 404;
        response.end(
            // stringify mengubah json jadi string/stream
            JSON.stringify({
                message: "Halaman tidak ditemukan!",
            })
        );
    }
};

// buat server
const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

// event server
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});
