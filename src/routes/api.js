import mongoose from 'mongoose';
import express from 'express';
import Survey from "./../controller/SurveyController"
import Section from "./../controller/SectionController"
import config from 'config';
import initDB from './../db';



let ApiRouter = express(); 
// connect to db
initDB(db => {

    ApiRouter.route('/')
    .all(({req,res})=>{
        res.send({messgae:'Welcone to SurveyGrill API v1.'});
    });


    ApiRouter.use('/survey',Survey({config,db}))
    ApiRouter.use('/section',Section({config,db}))
       
});
  

export default ApiRouter;