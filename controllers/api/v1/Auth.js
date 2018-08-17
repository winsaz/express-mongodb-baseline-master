module.exports = {
    login: async (req, res) => {
        req.checkBody('email', 'email is not in the right format').isEmail();
        req.checkBody('email', 'required').notEmpty();
        req.checkBody('password', 'required').notEmpty();
        try {
            await LIBRARY.function.parameterValidator(req);

            let construct = {};
            construct.queryParameters = {}
            construct.queryParameters.email = req.body.email.toLowerCase();
            const user = await DAO.User.getUser(construct);

            if (!user)  {
                throw(LIBRARY.status.ERROR.USER_PASSWORD_NOT_FOUND);
            } else {
                const comparePassword = await LIBRARY.bcrypt.compare(req.body.password, user.password);
                if(!comparePassword) {
                    throw(LIBRARY.status.ERROR.USER_PASSWORD_NOT_FOUND);
                }

                construct = {};
                construct.queryParameters = {};
                construct.queryParameters._id = user._id;
                construct.queryParameters.lastLogin = new Date();
                const updatedUser = await DAO.User.updateUser(construct);

                const userObject = {
                    _id: user._id,
                    email: user.email
                }

                const token = LIBRARY.jwt.sign({ user: userObject }, CONFIG.jwt.secret, { expiresIn: CONFIG.jwt.expirationInSeconds});
                delete user.password;

                const data = { token, user };

                LIBRARY.output.responseSuccess(res, data);
            }
        } catch (error) {
            LIBRARY.output.responseError(res, error, 'login');
        }
    },
    requestSignup: async (req, res) => {
        req.checkBody('fullName', 'required').notEmpty();
        req.checkBody('email', 'required').notEmpty();
        req.checkBody('email', 'email is not in the right format').isEmail();
        req.checkBody('phoneNumber', 'required').notEmpty();
        try {
            await LIBRARY.function.parameterValidator(req);

            let construct = {}
            construct.queryParameters = {};
            construct.queryParameters['$or'] = [];
            if (req.body.email) {
                construct.queryParameters['$or'].push({ email: req.body.email.toLowerCase() });
            }
            if (req.body.phoneNumber) {
                construct.queryParameters['$or'].push({ phoneNumber: req.body.phoneNumber });
            }

            const user = await DAO.User.getUser(construct);
            if (user) {
                throw(LIBRARY.status.ERROR.USER_ALREADY_EXIST);
            }

            const verificationCode = Math.floor(Math.random() * 9000) + 1000;

            user = new MODELS.User();
            user.email = req.body.email.toLowerCase();
            user.fullName = req.body.fullName;
            user.phoneNumber = req.body.phoneNumber;
            user.verificationCode = verificationCode;

            let parameters = {};
            parameters.receiver = req.body.email.toLowerCase();
            parameters.context = verificationCode;

            // SEND OTP TO EMAIL
            await LIBRARY.mailler.sendSignupEmail(parameters);
            await DAO.User.saveUser(user);
            
            LIBRARY.output.responseSuccess(res);
        } catch (error) {
            LIBRARY.output.responseError(res, error, 'requestSignup');
        }
    },
}