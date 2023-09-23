const express = require("express");
const handlebars = require("express-handlebars");
const PORT = 5000;
const path = require("path");
const app = express();

// View Engine
app.engine("hbs", handlebars.engine({extname: "hbs"}));
app.set("view engine", "hbs");

//**  MIDDLEWARE start */
// third-party middleware
const bodyParser = express.urlencoded({extended:false});
app.use(bodyParser);
// Global middleware

app.use((req,res ,next) => {
    // 
    console.log(`HTTP REQUEST: ${req.method}, Request Path: ${req.path}`);
    next(

    )
})

// partial routing middleware
app.use("/kittens", (req, res, next) => {
    console.log("Kittens middleware has been invoked!");
    next();
});


// concrete routing middleware
const specificMiddleware = (req, res, next) => {
    console.log("This is the specific route MIDDLEWARE");
    next();
}

//**  MIDDLEWARE end */

//** ROUTING START */


// app http methods - get, post, put, patch, delete (most used)
app.get("/", (req, res) => {
    //
    // res.send("Welcome, this is home page!");
    res.render("home");
});

app.get("/about", (req,res) => {
    res.render("about")
})

app.get("/specific", specificMiddleware, (req, res) => {
    res.send("This is specific route  ;)");
})

// Endpoint -> method, path, ACTION
// get- method
// /kittens - path, route
// action = (req, res) => {}
app.get("/kittens", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <form method="post">
                <label for="name">Name:</label><br />
                <input type="text" id="name" name="name" /><br />
                <label for="age">Age:</label><br />
                <input type="text" id="age" name="age" />
                <input type="submit" value="Create Kitten"/>
            </form>
        </body>
    </html>`)
});

app.get("/kittens/:kittenId", (req,res) => {
    const kittenId = Number(req.params.kittenId);
    console.log(req.params);

    if(!kittenId) {
        res.status(404).send("Bad kitten id: " + req.params.kittenId);
        return;
    }
    // Is not invoking, because the RESPONSE stream has been closed in the upper line
    res.send({id: kittenId, name: "Kircho" + kittenId});
});

app.post("/kittens", (req,res) => {
    res.send(`"Kitten has been created!"`);
})

app.get("/download-png", (req, res) =>{
    // ends the stream by itself
    // res.download("./CaptureFacts.PNG"); // downloads

    // You need to end the stream, because you can attach multiple files.
    // res.attachment("./CaptureFacts.PNG");
    // res.end();
    res.sendFile(path.resolve(__dirname, "./CaptureFacts.PNG"));
})

app.get("/route-that-will-be-redirected", (req,res) => {
    res.redirect("/kittens");
});

// WILDCARD *
//**  ROUTING END */
app.get("*", (req, res) => {
    res.status(404);
    res.send("Sorry page is not found ;(")
})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));