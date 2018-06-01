import Section from './SectionModel'
import Survey from './SurveyModel'
import mongoose from 'mongoose';

import { relative } from 'path';


    let listSection = (callback) => {
         Section.find({},(err,resObj)=>{
            callback(err,resObj);
         });
    }

    let addSection =  (surveyId,title,callback) => {

        let newSection = new Section({survey:surveyId,title:title});
        
        Survey.findById(surveyId,(err,survey)=>{
            if(err)
                return callback(err,{});

            survey._sections.push(newSection);

            survey.save((err,survey)=>{
                if(err)
                return callback(err,{});
            });

            newSection.save((err,section)=>{
                callback(err,section);
            })
            
        });
  
        
    }
    let getSection = (id,callback) => {
        Section.findById(id,(err,resObj)=>{
           callback(err,resObj);
        });
   }
    let removeSection = (id,callback) => {
         
        Section.findByIdAndRemove(id,(err,Section)=>{
            //console.log(Section);
            Survey.findById(Section.survey,(err,survey)=>{
                if(err)
                    return callback(err,{});
    
                survey._sections.remove(id);
    
                survey.save((err,survey)=>{
                    if(err)
                    return callback(err,{});
                });
    
                callback(Section);
                
            });
       
        })
    }


    let updateSection = (id,obj,callback) =>{
        Section.findById(id, (err, Section)=>{
            if(err)
                return callback(err);
                
            Object.assign(Section, obj).save((err, res) => {
                if(err) 
                    return callback(err);

                callback(res)            
            });
        })
    }

module.exports = {
    listSection,
    addSection,
    getSection,
    updateSection,
    removeSection
};