import Survey from '../model/SurveyModel'

const surveyService = {
    listSurvey : (offset=0,limit=10) => {
        return new Promise((resolve,reject) => {
            
            Survey.find({}).skip(offset).limit(limit)
                .then((Obj)=> resolve(Obj))
                .catch((err)=> reject(err));
        })
    },
    addSurvey : (title) => {
        return new Promise((resolve,reject) => {
            let newSurvey = new Survey({title});
            newSurvey.save()
                .then((Obj)=> resolve(Obj._id))
                .catch((err)=> reject(err));
        })
    },
    getSurvey : (id) => {
        return new Promise((resolve,reject) => {
            Survey.findById(id)
                .then((Obj)=> resolve(Obj))
                .catch((err)=> reject(err));
        })
    },
    removeSurvey : (id) => {
        return new Promise((resolve,reject) => {
            Survey.findByIdAndRemove(id)
                .then((Obj)=> resolve(Obj))
                .catch((err)=> reject(err));
        })
    },
    updateSurvey : (id,NewObj) =>{
        return new Promise((resolve,reject) => {
            Survey.findById(id)
                .then((survey)=>{
                    return Object.assign(survey, NewObj).save();
                })
                .then((UpdatedObj)=>{
                    resolve(UpdatedObj)
                })
                .catch((err)=> reject(err));
        })
    }
}
export default surveyService;