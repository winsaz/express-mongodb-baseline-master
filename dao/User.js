module.exports = {
    getUsers: function (parameters) {
        return new Promise((resolve, reject) => {
            try {
                MODELS.User.find(parameters.queryParameters || '')
                .sort(parameters.sort || '')
                .populate(parameters.populate || '')
                .skip((parameters.perPage || 0) * (parameters.page || 0))
                .limit(parameters.perPage || 0)
                .maxTime(10000).lean()
                .select(parameters.filter || '')
                .exec(function(err, users) {
                    if (err) {
                        reject(err);
                    }
                    resolve(users);
                })
            } catch (error) {
                reject(error);
            }
        })
    },
    getUser: function (parameters) {
        return new Promise((resolve, reject) => {
            try {
                MODELS.User.findOne(parameters.queryParameters || '')
                .sort(parameters.sort || '')
                .populate(parameters.populate || '')
                .maxTime(10000).lean()
                .select(parameters.filter || '')
                .exec(function(err, user) {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                })
            } catch (error) {
                reject(error);
            }
        })
    },
    saveUser: function (user) {
        return new Promise((resolve, reject) => {
            try {
                user.save(function(err, savedUser) {
                    if (err) {
                        reject(err);
                    }
                    resolve(savedUser);
                });
            } catch (error) {
                reject(error);
            }
        })
    },
    updateUser: function (parameters) {
        return new Promise((resolve, reject) => {
            try {
                MODELS.User.findByIdAndUpdate(parameters.queryParameters._id, parameters.queryParameters, {
                    new: true,          // return the modified document instead of the original
                    runValidators: true // if not set to true (default is false), this will ignore any schema validator
                }, function (err, updatedUser) {
                    if (err) {
                        reject(err)
                    }

                    resolve(updatedUser)
                });
            } catch (error) {
                reject(error);
            }
        })
    },
    deleteUser: function (userId) {
        return new Promise((resolve, reject) => {
            try {
                MODELS.User.findByIdAndRemove(userId, function(err, deletedUser) {
                    if (err) {
                        reject(err);
                    }
                    resolve(deletedUser);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}
