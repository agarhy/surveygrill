import Survey from '../model/SurveyModel'

const surveyService = {
    listSurvey : (callback) => {
         Survey.find({},(err,resObj)=>{
            callback(err,resObj);
         });
    },
    addSurvey : (title,callback) => {
     
        // if (!title || title==undefined)
        //     callback(`title ${title}`); 
        
        let newSurvey = new Survey({title});
        newSurvey.save((err)=>{
            callback(err);
        });
    },
    getSurvey : (id,callback) => {
        Survey.findById(id,(err,resObj)=>{
           callback(err,resObj);
        });
    },
    removeSurvey : (id,callback) => {
         
        Survey.findByIdAndRemove(id).then((survey)=>{
            callback(survey);
        })
    },
    updateSurvey : (id,obj,callback) =>{
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
}
export default surveyService;