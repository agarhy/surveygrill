import mongoose from 'mongoose';
import {ObjectID} from'mongodb';
import { Router } from 'express';
import bodyParser from 'body-parser';
import User from './../model/UserModel';
import authenticate from './../middleware/authenticate';
import {_} from 'lodash';

export default ({ config, db }) => {

    let api =Router();

    api.get('/me', authenticate, (req, res, next) => {
        try{
           res.send(req.user)
        }catch(e){
            next(e);
        }
    
    });

    api.post('/', (req, res, next) => {
        try{
            
            let newuser = new User(req.body);
    
           newuser.save().then((user)=> {
               return user.generateAuthToken();
           })
           .then((token)=>{
                res.header('x-auth',token).send(newuser);
           })
           .catch((err)=>{
                res.status(400).send(err);
           })
            
        }catch(e){
            next(e);
        }
    
    });

    api.post('/login', (req, res, next) => {
        try{
            let body = _.pick(req.body,['email','password']);
            
            User.findByCredentials(body.email, body.password)
                .then((user)=>{
                    user.generateAuthToken()
                        .then((token)=>{
                            res.header('x-auth', token).send(user);
                        })
                }).catch((e)=>{
                    res.status(400).send();
                })
            
        }catch(e){
            next(e);
        }
    
    });

    api.delete('/logout', authenticate, (req, res, next) => {
        try{
          req.user.removeToken(req.token)
            .then(()=>{
                res.status(200).send();
            })
            .catch(()=>{
                res.status(400).send();
            })
        }catch(e){
            next(e);
        }
    
    });

   

    return api;
}