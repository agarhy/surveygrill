import Section from '../model/SectionModel'
import Survey from '../model/SurveyModel'
import mongoose from 'mongoose';

const sectionService = {
    listSection : (offset=0,limit=20) => {
         return new Promise((resolve,reject) => {
            Section.find({}).skip(offset).limit(limit)
                .then((Obj)=> resolve(Obj))
                .catch((err)=> reject(err));
        })
    },

    addSection : (surveyId,title) => {
        return new Promise((resolve,reject) => {
            let newSection = new Section({survey:surveyId,title:title});
            newSection.save()
                .then((sectionObj)=> {
                    Survey.findById(surveyId)
                    .then((surveyObj)=>{
                        return surveyObj.addSection(sectionObj._id)
                    })
                    .then(()=> resolve(sectionObj._id))
                })
                .catch((err)=> reject(err));
        })
  
    },
    getSection : (id) => {
        return new Promise((resolve,reject) => {
            Section.findById(id)
                .then((Obj)=> resolve(Obj))
                .catch((err)=> reject(err));
        })
    },
    removeSection : (id) => {
        return new Promise((resolve,reject) => {
            Section.findById(id,(err,sectionObj)=>{
             
                Section.findByIdAndRemove(id)
                .then(()=>{
                    Survey.findById(sectionObj.survey)
                    .then((surveyObj)=>{
                        let removeArr= Array(id);
                        return surveyObj.removeSections(removeArr);
                    })
                })
                .then(()=> resolve(sectionObj))
                .catch((err)=> reject(err));
            });
            
        })
    },
    updateSection : (id,NewObj) =>{
        return new Promise((resolve,reject) => {
            Section.findById(id)
                .then((sectionObj)=>{
                    return Object.assign(sectionObj, NewObj).save();
                })
                .then((section)=>{
                    resolve(section);
                })
                .catch((err)=> reject(err));
        })
    }
};

export default sectionService;