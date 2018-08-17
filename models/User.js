var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}

var genderClassification = 'male female'.split(' ');

var userSchema = new Schema({
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
    birthday: Date,
    verificationCode: Number,
    gender: {
        type: String,
        enum: genderClassification,
        default: genderClassification[0]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function(next) {
    var user = this;

    user.updatedAt = Date.now();
    next();
});

userSchema.pre('findOneAndUpdate', function() {
    this.update({}, {
        $set: {
            updatedAt: Date.now()
        }
    });
});

userSchema.pre('findOneAndRemove', function() {
    
});

module.exports = mongoose.model('User', userSchema);
