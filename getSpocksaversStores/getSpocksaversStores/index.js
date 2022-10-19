module.exports = async function (context, req) {
    const responseMessage = "Hello World!"

    context.res = {
        status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}