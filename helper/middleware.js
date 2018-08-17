module.exports = {
    validateToken: function(req, res, next) {
        var token = req.headers.token || req.body.token || req.query.token;
        var secret = CONFIG.jwt.secret;

        if (!token) {
            return LIBRARY.output.responseError(res, LIBRARY.status.ERROR.TOKEN_REQUIRED, 'validateToken');
        }
        LIBRARY.jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                return LIBRARY.output.responseError(res, LIBRARY.status.ERROR.TOKEN_EXPIRED, 'validateToken');
            } else {
                req.loggedInUser = decoded.user;
                next();
            }
        });
    },
    validateUser: function(req, res, next) {
        var loggedInUser = req.loggedInUser;

        LIBRARY.co(function*() {
            var parameters = {};
            parameters.queryParameters = {};
            parameters.queryParameters._id = loggedInUser._id;
            parameters.filter = '-password';
            var user = yield DAO.User.getUser(parameters);

            if (!user) {
                return yield Promise.reject(LIBRARY.status.ERROR.USER_NOT_FOUND);
            }
            // else if (!user.verified) {
            //     return yield Promise.reject(LIBRARY.status.ERROR.USER_NOT_VERIFIED);
            // }

            return;
        }).then(function(results) {
            next();
        }).catch(function(err) {
            return LIBRARY.output.responseError(res, err, 'validateUser');
        })
    }
}
