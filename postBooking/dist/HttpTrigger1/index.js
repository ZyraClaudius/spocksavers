"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpTrigger = function (context, req) {
    let result = ``;
    let validRequest = req.headers.Origin === "localhost:3000" || req.headers.Origin === "https://red-wave-0fd367603.2.azurestaticapps.net/";
    console.log(req.body);
    let booking = req.body;
    console.log(booking);
    console.log(booking.customerEmail);
    // const responseMessage = "Hello World!"
    var Connection = require("tedious").Connection;
    var config = {
        server: "spocksavers.database.windows.net",
        authentication: {
            type: "default",
            // options: {
            //     userName: process.env.Fnuser,
            //     password: process.env.Fnaccess,
            // },
            options: {
                userName: "azureuser",
                password: "StuZeeProject1",
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: "Spocksaver",
        },
    };
    var connection = new Connection(config);
    connection.on("connect", function (err) {
        // If no error, then good to proceed.
        if (err) {
            context.res = {
                status: 500,
                body: {
                    error: err,
                    user: process.env.Fnuser,
                },
                headers: {
                    'Access-Control-Allow-Origin': validRequest ? req.headers.Origin : 'N/A',
                }
            };
            context.done();
        }
        else {
            console.log("Successfully connected!");
            executeStatement();
        }
    });
    connection.connect();
    var Request = require("tedious").Request;
    var TYPES = require("tedious").TYPES;
    function executeStatement() {
        let requestString = `INSERT INTO [dbo].[bookings] (id, customerName, customerEmail, dateAndTime, storeId) OUTPUT Inserted.id VALUES (NEWID(), '${booking.customerName}', '${booking.customerEmail}', '${booking.dateAndTime}', '${booking.storeId}');`;
        console.log(requestString);
        let request = new Request(requestString, function (err) {
            if (err) {
                console.log('error in request');
                console.log(err);
                context.res = {
                    status: 500,
                    body: err,
                    headers: {
                        'Access-Control-Allow-Origin': validRequest ? req.headers.Origin : 'N/A',
                    }
                };
                context.done();
            }
        });
        request.on("row", function (columns) {
            columns.forEach(function (column) {
                if (column.value === null) {
                }
                else {
                    result = result + column.value;
                }
            });
        });
        // var result = [];
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            console.log("request completed!");
            // console.log("request completed.");
            // console.log(context.res.send);
            //console.log(result);
            connection.close();
            context.res = {
                status: 200 /* Defaults to 200 */,
                body: result,
                headers: {
                    'Access-Control-Allow-Origin': validRequest ? req.headers.Origin : 'N/A',
                }
            };
            context.done();
        });
        connection.execSql(request);
    }
    ;
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map