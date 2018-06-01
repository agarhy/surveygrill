import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name:{
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true,

    },
    email:{
        type: String,
        minlength: 8,
        maxlength: 300,
        trim: true,
        unique: true,
        required: true,
        validate:{
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: "{VALUE} in not a valid email"
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 3
    },
    tokens:[{
        access:{
            type: String,
            required: true
        },
        token:{ 
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user=this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email','tokens[0].token','tokens[0].access']);
};

UserSchema.methods.generateAuthToken= function (){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();

    user.tokens.push({access,token});

    return user.save().then(()=>{
        return token;
    })

}

UserSchema.methods.removeToken = function (token){
    var User = this;

    return User.update({
        $pull:{
            tokens:{token}
        }
    });

};

UserSchema.statics.findByToken = function (token){
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token,'abc123');
    }catch(e){
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};



UserSchema.statics.findByCredentials = function (email,password){

    var User = this;
    return User.findOne({email})
        .then((user)=>{
            
            if(!user){
                return Promise.reject();
            }

            return new Promise((resolve, reject)=>{
                bcrypt.compare(password, user.password, (err,res)=>{
                    
                    if(res){
                        resolve(user);
                    }else{
                        reject(); 
                    }
                })
            })
        })


  
};

UserSchema.pre('save',function (next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(user.password, salt, (err,hash)=>{
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }

});

module.exports = mongoose.model('User',UserSchema);