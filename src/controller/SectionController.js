import mongoose from 'mongoose';
import {ObjectID} from'mongodb';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Section from './../model/SectionModel';
import sectionService from './../model/sectionService';


export default ({ config, db }) => {

    let api =Router();

    api.get('/', (req, res, next) => {
        try{
            
            sectionService.listSection((err,SectionObj) => {
                res.json(SectionObj);
            });
            
        }catch(e){
            next(e);
        }
    
    });

    api.post('/', (req, res, next) => {
        try{
            
            sectionService.addSection(
                req.body.survey,
                req.body.title,            
                (err,section) => {
                 
                    if(err)
                       return res.status(400).json({'status':false,'err':err.message});
                    
                    res.json(section)
                }
            );
 
            
        }catch(e){
            next(e);
        }
    
    });

    api.get('/:id', (req, res, next) => {
        try{
            if(!req.params.id)
                return  res.status(404)

            sectionService.getSection(req.params.id,(err,SectionObj) => {
                
                if(!SectionObj)
                  return  res.status(404).json(SectionObj);            
                
                res.json(SectionObj);
            });
            
        }catch(e){
            next(e);
        }
    
    });

    api.put('/:id', (req, res, next) => {
        try{
            //console.log(req.body);
            if(!req.params.id)
                return  res.status(404)

            const data={
                title:req.body.title
            }
            sectionService.updateSection(req.body.id,data,(err,SectionObj) => {
                //validate inputs
                // id
                // key:data
                res.json({ message: 'record updated!', SectionObj });
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

            Section.findById(req.params.id).then((Section)=>{
                if(!Section){
                    return res.status(404).send();
                } 

                sectionService.removeSection(
                    req.params.id,
                    (Section) => {
                   //     console.log(Section);
                        if(!Section)
                           return res.status(400).json({'status':false,'err':'Not Found'});
                        
                        return  res.json({'status':true,Section})
                    }
                );
            })
            
            
 
            
        }catch(e){
            next(e);
        }
    
    })

    return api;
}