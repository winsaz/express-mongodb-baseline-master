module.exports = {
    getUsers: async (req, res) => {
        try {
            var parameters = {};
            parameters.queryParameters = {};
            var users = await DAO.User.getUsers(parameters);

            LIBRARY.output.responseSuccess(res, users);
        } catch (error) {
            LIBRARY.output.responseError(res, error, 'getUsersFailed');
        }
    },
    getUserDetail: async (req, res) => {
        req.checkParams('userId', 'must be mongoId').isMongoId();
        try {
            await LIBRARY.function.parameterValidator(req);
    
            var parameters = {};
            parameters.queryParameters = {};
            parameters.queryParameters._id = req.params.userId;
            var user = await DAO.User.getUser(parameters);
            if (!user) {
                throw(LIBRARY.status.ERROR.USER_NOT_FOUND);
            }
    
            LIBRARY.output.responseSuccess(res, results);
        } catch (error) {
            LIBRARY.output.responseError(res, error, 'getUserDetailFailed');
        }
    },
    createUser: async (req, res) => {
        req.checkBody('name', 'required').notEmpty();
        req.checkBody('gender', 'required').notEmpty();
        try {
            await LIBRARY.function.parameterValidator(req);

            let newUser = new MODELS.User();
            newUser.name = req.body.name;
            newUser.gender = req.body.gender;
            const savedUser = await DAO.User.saveUser(newUser);

            LIBRARY.output.responseSuccess(res, savedUser);
        } catch (error) {
            LIBRARY.output.responseError(res, error, 'createUserFailed');
        }
    },
    updateUser: async (req, res) => {
        req.checkBody('name', 'required').notEmpty();
        req.checkBody('gender', 'required').notEmpty();
        req.checkParams('userId', 'required').isMongoId();

        try {
            await LIBRARY.function.parameterValidator(req);

            let parameters = {};
            parameters.queryParameters = {};
            parameters.queryParameters._id = req.params.userId;
            const user = await DAO.User.getUser(parameters);
            if (!user) {
                throw(LIBRARY.status.ERROR.USER_NOT_FOUND);
            }

            let construct = {};
            construct.queryParameters = {};
            construct.queryParameters._id = user._id;
            construct.queryParameters.name = req.body.name;
            construct.queryParameters.gender = req.body.gender;
            const updatedUser = await DAO.User.updateUser(construct);

            LIBRARY.output.responseSuccess(res, updatedUser);
        } catch (error) {
            LIBRARY.output.responseError(res, error, 'updateUserFailed');
        }
    },
    deleteUser: async (req, res) => {
        req.checkParams('userId', 'required').isMongoId();
        try {
            await LIBRARY.function.parameterValidator(req);

            let parameters = {};
            parameters.queryParameters = {};
            parameters.queryParameters._id = req.params.userId;
            const user = await DAO.User.getUser(parameters);
            if (!user) {
                return await Promise.reject(LIBRARY.status.ERROR.USER_NOT_FOUND);
            }

            await DAO.User.deleteUser(user);

            LIBRARY.output.responseSuccess(res);
        } catch (error) {
            LIBRARY.output.responseError(res, error, 'deleteUserFailed');
        }
    }
}
