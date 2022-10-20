import { AzureFunction, Context, HttpRequest } from "@azure/functions"

type Store = {
    id: string;
    storeName: string;
    postcode: string;
    phoneNumber: string;
}



const httpTrigger: AzureFunction = function (context: Context, req: HttpRequest) {
    let result: Store[] = [];

    // const responseMessage = "Hello World!"
    var Connection = require("tedious").Connection;
    var config = {
        server: "spocksavers.database.windows.net",
        authentication: {
            type: "default",
            options: {
                userName: process.env.Fnuser,
                password: process.env.Fnaccess,
            },
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
            };
            context.done();
        }
        else {
            executeStatement();
        }
    });
    connection.connect();
    var Request = require("tedious").Request;
    var TYPES = require("tedious").TYPES;
    async function executeStatement() {
        let request = new Request(
            "SELECT * from [dbo].[stores]",
            function (err) {
                if (err) {
                    context.res = {
                        status: 500,
                        body: err
                    };
                    context.done();
                }
            }
        );
        // var result = [];
        request.on("row", function (columns) {
            let store: Store = { id: "NA", storeName: "NA", postcode: "NA", phoneNumber: "NA" };
            let rawData: string[] = [];
            columns.forEach(function (column) {
                if (column.value === null) {
                } else {
                    rawData.push(column.value);
                }
                store.id = rawData[0];
                store.storeName = rawData[1];
                store.postcode = rawData[2];
                store.phoneNumber = rawData[3];
            });
            result.push(store);
        });
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            // console.log("request completed.");
            // console.log(context.res.send);
            //console.log(result);
            connection.close();
            context.res = {
                status: 200 /* Defaults to 200 */,
                body: result,
            };
            context.done()
            return;
        });

        connection.execSql(request);
    };
    // console.log("Returning: ")

    // context.res =  {
    //     status: 200 /* Defaults to 200 */,
    //     body: process.env,
    // };
};


export default httpTrigger;