module.exports = {
    parameterValidator: function(req) {
        return new Promise((resolve, reject) => {
            try {
                req.getValidationResult().then(function(result) {
                    LIBRARY.status.ERROR.MISSING_PARAMETER.PAYLOAD = [];

                    if (result.array().length) {
                        for (var i = 0, arrayLength = result.array().length; i < arrayLength; i++) {
                            var currentError = result.array()[i];
                            LIBRARY.status.ERROR.MISSING_PARAMETER.PAYLOAD.push(currentError);
                        }

                        reject(LIBRARY.status.ERROR.MISSING_PARAMETER);
                    }
                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        })
    },
    customValidators: {
        isSpecificValue: function(params, arrayOfValue) {
            return LIBRARY._.contains(arrayOfValue, params);
        },
        isInRange: function(param, minNum, maxNum) {
            return LIBRARY.valib.Number.inRange(param, minNum, maxNum);
        }
    }
}
