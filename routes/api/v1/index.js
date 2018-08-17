var controllers = require(PATH + '/controllers/api/v1/index');
module.exports = function(app) {
    app

    // User
    .get('/v1/user', controllers.User.getUsers)
    .get('/v1/user/:userId', controllers.User.getUserDetail)
    .post('/v1/user', controllers.User.createUser)
    .put('/v1/user/:userId', controllers.User.updateUser)
    .delete('/v1/user/:userId', controllers.User.deleteUser)
    
    .use('/v1', MIDDLEWARE.validateToken, MIDDLEWARE.validateUser) // MIDDLEWARE GOES HERE
}
