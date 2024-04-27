// Require the express web application framework (https://expressjs.com)
var express = require('express');
const winston = require('winston');

// Create a new web application by calling the express function
var app = express();

// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'));

function padTwoDigits(num) {
    return num.toString().padStart(2, "0");
}

function dateInYyyyMmDdHhMmSs() {
    var date = new Date();
    // The function takes a Date object as a parameter and formats the date as YYYY-MM-DD hh:mm:ss.
    // 👇️ 2023-04-11 16:21:23 (yyyy-mm-dd hh:mm:ss)
    //console.log(dateInYyyyMmDdHhMmSs(new Date()));
    return (
      [
        date.getFullYear(),
        padTwoDigits(date.getMonth() + 1),
        padTwoDigits(date.getDate()),
      ].join("-") +
      " " +
      [
        padTwoDigits(date.getHours()),
        padTwoDigits(date.getMinutes()),
        padTwoDigits(date.getSeconds()),
      ].join(":")
    );
  }

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({
            filename: 'logs/error.log', level:
                'error'
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// define the function for parsing input arguments
function parseArguments(num, name) {
    const result = parseFloat(num);

    // if the parsed num is nan, add the error log and throw the exception
    if (result === NaN) {
        logger.log({level: "error", message: "Time: " + dateInYyyyMmDdHhMmSs() + " Parsing " + name + " error!"});
        throw new Error("Parsing " + name + " error");
    }

    // if the parsed num is nan, add the error log and throw the exception
    if (isNaN(result)) {
        logger.log({level: "error", message: "Time: " + dateInYyyyMmDdHhMmSs() + " Invalid " + name + "!"});
        throw new Error("Invalid " + name + "!");
    }

    return result;
}

// Define a route for the form page
app.get('/addition', (req, res) => {
    try {
        // parse the frist and second number considering the name in the URL
        const num1 = parseArguments(req.query.num1, "num1");
        const num2 = parseArguments(req.query.num2, "num2");

        // add the two number and log the info to the file and return the result
        const result = num1 + num2;
        logger.log({level: "info", message: "Time: " + dateInYyyyMmDdHhMmSs() + " Addition: " + num1 + " + " + num2 + " = " + result});
        res.status(200).json({ statusCode: 200, data: result });
    }
    catch (error) {
        logger.log({level: "error", message: {statusCode: 500, msg: error.toString()}});
        res.status(500).json({ statusCode: 500, msg: error.toString() })
    }
});


// Define a route for the form page
app.get('/subtraction', (req, res) => {
    // Serve the HTML form page
    try {
        // parse the frist and second number considering the name in the URL
        const num1 = parseArguments(req.query.num1, "num1");
        const num2 = parseArguments(req.query.num2, "num2");

        // subtract the two number and log the info to the file and return the result
        const result = num1 - num2;
        logger.log({level: "info", message: "Time: " + dateInYyyyMmDdHhMmSs() + " Subtraction: " + num1 + " - " + num2 + " = " + result});
        res.status(200).json({ statusCode: 200, data: result });
    }
    catch (error) {
        logger.log({level: "error", message: {statusCode: 500, msg: error.toString()}});
        res.status(500).json({ statusCode: 500, msg: error.toString() })
    }
});


// Define a route for the form page
app.get('/multiplication', (req, res) => {
    // Serve the HTML form page
    try {
        // parse the frist and second number considering the name in the URL
        const num1 = parseArguments(req.query.num1, "num1");
        const num2 = parseArguments(req.query.num2, "num2");

        // multiply the two number and log the info to the file and return the result
        const result = num1 * num2;
        logger.log({level: "info", message: "Time: " + dateInYyyyMmDdHhMmSs() + " Multiplication: " + num1 + " * " + num2 + " = " + result});
        res.status(200).json({ statusCode: 200, data: result });
    }
    catch (error) {
        logger.log({level: "error", message: {statusCode: 500, msg: error.toString()}});
        res.status(500).json({ statusCode: 500, msg: error.toString() })
    }
});


// Define a route for the form page
app.get('/division', (req, res) => {
    // Serve the HTML form page
    try {
        // parse the frist and second number considering the name in the URL
        const num1 = parseArguments(req.query.num1, "num1");
        const num2 = parseArguments(req.query.num2, "num2");

        // divide the two number and log the info to the file and return the result
        const result = num1 / num2;
        logger.log({level: "info", message: "Time: " + dateInYyyyMmDdHhMmSs() + " Division: " + num1 + " / " + num2 + " = " + result});
        res.status(200).json({ statusCode: 200, data: result });
    }
    catch (error) {
        logger.log({level: "error", message: {statusCode: 500, msg: error.toString()}});
        res.status(500).json({ statusCode: 500, msg: error.toString() })
    }
});


// Tell our application to listen to requests at port 3000 on the localhost
port = 3000;
app.listen(port, function () {
    // When the application starts, print to the console that our app is
    // running at http://localhost:3000  (where the port number is 3000 by
    // default). Print another message indicating how to shut the server down.
    console.log(`Web server running at: http://localhost:${port}}`)
    logger.log({level: "info", message:`Web server running at: http://localhost:${port}}`})
    console.log("Type Ctrl+C to shut down the web server")
    logger.log({level: "info", message: "Type Ctrl+C to shut down the web server"})

})
