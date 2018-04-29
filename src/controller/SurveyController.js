import mongoose from 'mongoose';
import {ObjectID} from'mongodb';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Survey from './../model/SurveyModel';
import surveyService from './../model/surveyService';


export default ({ config, db }) => {

    let api =Router();

    api.get('/', (req, res, next) => {
        try{
            
            surveyService.listSurvey((err,surveyObj) => {
                res.json(surveyObj);
            });
            
        }catch(e){
            next(e);
        }
    
    });

    api.post('/', (req, res, next) => {
        try{
            
            surveyService.addSurvey(
                req.body.title,
                (err) => {
                 
                    if(err)
                       return res.status(400).json({'status':false,'err':err.message});
                    
                    res.json({'status':true,'message':'New survey created successfully.'})
                }
            );
 
            
        }catch(e){
            next(e);
        }
    
    });

    api.delete('/:id', (req, res, next) => {
        try{
            let id=req.params.id;
            if(!ObjectID.isValid(id))
                return res.status(404).send();

            // Survey.findById(req.params.id).then((survey)=>{
            //     if(!survey){
            //         return res.status(404).send();
            //     } 
            // })
            
            surveyService.removeSurvey(
                req.params.id,
                (survey) => {
               //     console.log(survey);
                    if(!survey)
                       return res.status(400).json({'status':false,'err':'Not Found'});
                    
                    return  res.json({'status':true,survey})
                }
            );
 
            
        }catch(e){
            next(e);
        }
    
    })

    return api;
}