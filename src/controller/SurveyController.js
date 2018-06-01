import mongoose from 'mongoose';
import {ObjectID} from'mongodb';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Survey from './../model/SurveyModel';
import surveyService from './../service/surveyService';
import Joi from 'joi';
import Validator from '../middleware/joiValidator';

export default ({ config, db }) => {

    let api =Router();

    api.get('/', Validator.validate(
        Joi.object().keys({
            offset: Joi.number(),     
            limit: Joi.number(),     
        })
    ), (req, res, next) => {
        try{
            
            surveyService.listSurvey(0,3)
            .then((surveyObj)=>{                
                res.json(surveyObj);
            })
            .catch((err)=>{
                //log err.message
                return res.status(400).json({'status':false,'message':'Request Failed.'});
            });
            
        }catch(e){
            next(e);
        }
    
    });

    api.post('/', Validator.validate(
        Joi.object().keys({
            title: Joi.string().min(3).required(),     
        })
    ), (req, res, next) => {
        try{
            
            surveyService.addSurvey(req.body.title)
            .then((Id)=>{                
                res.json({'status':true,'message':'New survey created successfully.','id':Id})
            })
            .catch((err)=>{
                //log err.message
                return res.status(400).json({'status':false,'message':'Request Failed.'});
            });
           
            
        }catch(e){
            //log err.message
            next(e);
        }
    
    });

    api.get('/:id',(req, res, next) => {
        try{

            if(!req.params.id)
                return  res.status(404)

            surveyService.getSurvey(req.params.id)
            .then((surveyObj)=>{                
                res.json(surveyObj);
            })
            .catch((err)=>{
                //log err.message
                return res.status(400).json({'status':false,'message':'Request Failed.'});
            });
            
        }catch(e){
            next(e);
        }
    
    });

    api.put('/:id',  Validator.validate(
        Joi.object().keys({
            title: Joi.string().min(3).required(),     
        })
    ),(req, res, next) => {
        try{
            //console.log(req.body);
            if(!req.params.id)
                return  res.status(404)

            surveyService.updateSurvey(req.params.id,req.body)
            .then((surveyObj)=>{                
                res.json({'status':true,'message':'record updated!', surveyObj})
            })
            .catch((err)=>{
                //log err.message
                return res.status(400).json({'status':false,'message':'Request Failed.'});
            });
            
        }catch(e){
            next(e);
        }
    
    });

    api.delete('/:id', (req, res, next) => {
        try{
            let id=req.params.id;
            if(!ObjectID.isValid(id))
                return res.status(404).send();
            
            surveyService.removeSurvey(req.params.id)
            .then((surveyObj)=>{                
                res.json({'status':true,'message':surveyObj.title+' Removed successfully.'})
            })
            .catch((err)=>{
                //log err.message
                return res.status(400).json({'status':false,'message':'Request Failed.'});
            });
 
            
        }catch(e){
            next(e);
        }
    
    })

    return api;
}