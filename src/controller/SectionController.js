import mongoose from 'mongoose';
import {ObjectID} from'mongodb';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Survey from './../model/SurveyModel';
import Section from './../model/SectionModel';
import sectionService from './../service/sectionService';
import Joi from 'joi';
import Validator from '../middleware/joiValidator';

export default ({ config, db }) => {

    let api =Router();

    api.get('/', (req, res, next) => {
        try{
            
            sectionService.listSection()
            .then((sectionObj)=>{   
                console.log(sectionObj.length);             
                res.json({results: sectionObj.length ,data:sectionObj});
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
            surveyId: Joi.string().required(),     
        })
    ),(req, res, next) => {
        try{
            
            if(!Survey.findById(req.body.surveyId))
                return res.status(400).send();

            sectionService.addSection(
                req.body.surveyId,
                req.body.title,  
            ).then((Id)=>{                
                res.json({'status':true,'message':'New Section created successfully.','id':Id})
            })
            .catch((err)=>{
                //log err.message
                return res.status(400).json({'status':false,'message':'Request Failed.'});
            });
 
            
        }catch(e){
            next(e);
        }
    
    });

    api.get('/:id', (req, res, next) => {
        try{
            let id=req.params.id;
            if(!ObjectID.isValid(id))
                return res.status(404).send();

            sectionService.getSection(req.params.id)
            .then((sectionObj)=>{                
                res.json(sectionObj);
            })
            .catch((err)=>{
                //log err.message
                return res.status(400).json({'status':false,'message':'Request Failed.'});
            });
            
        }catch(e){
            next(e);
        }
    
    });

    api.put('/', Validator.validate(
        Joi.object().keys({
            sectionId: Joi.string().required(),
            title: Joi.string().min(3).required(),
        })
    ),(req, res, next) => {
        try{
            //console.log(req.body);
            let id=req.body.sectionId;
            if(!ObjectID.isValid(id))
                return res.status(404).send();

            sectionService.updateSection(id,req.body)
            .then((sectionObj)=>{                
                res.json({'status':true,'message':'record updated!', sectionObj})
            })
            .catch((err)=>{
                //log err.message
                return res.status(400).json({'status':false,'message':err.message});
            });
            
        }catch(e){
            next(e);
        }
    
    });

    api.delete('/', Validator.validate(
        Joi.object().keys({
            sectionId: Joi.string().required(),
        })
    ),(req, res, next) => {
        try{
            let id=req.body.sectionId;
            if(!ObjectID.isValid(id))
                return res.status(404).send();

            sectionService.removeSection(id)
            .then((sectionObj)=>{                
                res.json({'status':true,'message':sectionObj.title+' Removed successfully.'})
            })
            .catch((err)=>{
                //log err.message
                return res.status(400).json({'status':false,'message':err.message});
            });
 
 
            
        }catch(e){
            next(e);
        }
    
    })

    return api;
}