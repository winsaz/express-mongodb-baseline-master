module.exports = {
    responseSuccess: function(res, data) {
        return res.json({ status: 'Success', statusCode: 200, data });
    },
    responseError: function(res, error, tags) {
        console.log(tags) // => FOR DEBUGGING PURPOSE
        console.log(error)
        
        var message = 'Unexpected Error';
        var statusCode = 400;
        var errorCode = 40404;
        var payload;
        if (error) {
            if (typeof(error) === 'object') {
                message = error.MESSAGE;
                errorCode = error.CODE;

                if (errorCode == 44101 || errorCode == 44102 || errorCode == 44100) {
                    statusCode = 401;
                } else if (errorCode == 40300 || errorCode == 40301) {
                    statusCode = 403;
                } else if (error.message) {
                    message = error.message;
                    errorCode = 88888;
                } else if (error[0]) {
                    message = error;
                    errorCode = 89898;
                } else if (errorCode == 44103) {
                    payload = error.PAYLOAD;
                }
            } else {
                message = error.message;
                errorCode = 40405;
            }
        }

        return res.status(statusCode).send({
            status: 'Error',
            statusCode,
            errorCode,
            message,
            payload
        });
    }
}
