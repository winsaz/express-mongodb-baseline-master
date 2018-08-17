// var template = require('email-templates').EmailTemplate;
// var path = require('path');
// var templatesDir = path.resolve(__dirname, GLOBAL_PATH, 'email/template/');
var MAILLER = {
    /*
     * verification donor after register
     * @param  {[type]} receiver [description]
     * @param  {[type]} context  [description]
     * @return {[type]}          [description]
     */
    sendSignupEmail: function(parameters) {
        // send to list
        var to = [parameters.receiver];
        // this must relate to a verified SES account
        var from = CONFIG.mailler.sender;
        var params = {
            Destination: {
                BccAddresses: [
                ],
                CcAddresses: [
                ],
                ToAddresses: to
            },
            Message: {
                Body: {
                    Html: {
                        Data: '<html>Your code: '+ parameters.context +'</html>',
                    },
                    Text: {
                        Data: 'Test',
                    }
                },
                Subject: {
                    Data: 'Momoparts Signup Request',
                }
            },
            Source: from,
            ReplyToAddresses: [
            ]
        }

        return sendmailWithContext(params);
    },
    sendForgotPasswordEmail: function(receiver, context) {
        var to = [receiver];
        var from = CONFIG.mailler.sender;

        var params = {
            Destination: {
                BccAddresses: [
                ],
                CcAddresses: [
                ],
                ToAddresses: to
            },
            Message: {
                Body: {
                    Html: {
                        Data: '<html>Reset Password. \n \
                        Your code: '+ context +'</html>',
                    },
                    Text: {
                        Data: 'Test',
                    }
                },
                Subject: {
                    Data: 'Momoparts Reset Password',
                }
            },
            Source: from,
            ReplyToAddresses: [
            ]
        }

        return sendmailWithContext(params);
    },
    sendCompanyEmailRegistration: function(receiver, context) {
        var to = [receiver];
        var from = CONFIG.sesSender;

        var params = {
            Destination: {
                BccAddresses: [
                ],
                CcAddresses: [
                ],
                ToAddresses: to
            },
            Message: {
                Body: {
                    Html: {
                        Data: '<html>Company Email registration. \n \
                        Your code: '+ context +'</html>',
                    },
                    Text: {
                        Data: 'Test',
                    }
                },
                Subject: {
                    Data: 'Momoparts Company Email Registration',
                }
            },
            Source: from,
            ReplyToAddresses: [
            ]
        }

        return sendmailWithContext(params);
    }
};

function sendmailWithContext(context) {
    return new Promise((resolve, reject) => {
        try {
            LIBRARY.ses.sendEmail(context, function(err, data) {
                if(err){
                    reject(err);
                }
                resolve(data);
            });
        } catch (err) {
            reject(err);
        }
    });
}
module.exports = MAILLER;
