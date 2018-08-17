module.exports = {
    ERROR: {
        USER_NOT_FOUND: {
            CODE: 43100,
            MESSAGE: 'User does not exist.'
        },
        USER_PASSWORD_NOT_FOUND: {
            CODE: 43101,
            MESSAGE: 'User and password does not match.'
        },
        USER_NOT_VERIFIED: {
            CODE: 43102,
            MESSAGE: 'User has not been verified yet.'
        },
        EMAIL_ALREADY_VERIFIED: {
            CODE: 43103,
            MESSAGE: 'Email has already been verified.'
        },
        EMAIL_NOT_ALLOWED: {
            CODE: 43104,
            MESSAGE: 'Email is not allowed to be registered.'
        },
        USER_ALREADY_EXIST: {
            CODE: 43106,
            MESSAGE: 'User already exist.'
        },
        EMAIL_NOT_FOUND: {
            CODE: 43107,
            MESSAGE: 'Email not found.'
        },

        TOKEN_NOT_MATCH: {
            CODE: 44100,
            MESSAGE: 'Token does not match.'
        },
        TOKEN_EXPIRED: {
            CODE: 44101,
            MESSAGE: 'Token has expired.'
        },
        TOKEN_REQUIRED: {
            CODE: 44102,
            MESSAGE: 'Token required.'
        },
        MISSING_PARAMETER: {
            CODE: 44103,
            MESSAGE: 'Missing Parameter.',
            PAYLOAD: []
        },

        INVALID_DATE: {
            CODE: 45100,
            MESSAGE: 'Date format is wrong.'
        },

        FORBIDDEN: {
            CODE: 40300,
            MESSAGE: 'Forbidden.'
        },
        NOT_AUTHORIZED: {
            CODE: 40301,
            MESSAGE: 'Not authorized.'
        },
        NOT_ALLOWED: {
            CODE: 40302,
            MESSAGE: 'Not allowed.'
        }
    }
};
