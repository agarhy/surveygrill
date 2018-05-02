import Survey from './SurveyModel'
import { relative } from 'path';


    let listSurvey = (callback) => {
         Survey.find({},(err,resObj)=>{
            callback(err,resObj);
         });
    }

    let addSurvey = (title,callback) => {
     
        // if (!title || title==undefined)
        //     callback(`title ${title}`); 
        
        let newSurvey = new Survey({title});
        newSurvey.save((err)=>{
            callback(err);
        });
    }
    let getSurvey = (id,callback) => {
        Survey.findById(id,(err,resObj)=>{
           callback(err,resObj);
        });
   }
    let removeSurvey = (id,callback) => {
         
        Survey.findByIdAndRemove(id).then((survey)=>{
            callback(survey);
        })
    }


    let updateSurvey = (id,obj,callback) =>{
        Survey.findById(id, (err, survey)=>{
            if(err)
                return callback(err);
                
            Object.assign(survey, obj).save((err, res) => {
                if(err) 
                    return callback(err);

                callback(res)            
            });
        })
    }

module.exports = {
    listSurvey,
    addSurvey,
    getSurvey,
    updateSurvey,
    removeSurvey
};