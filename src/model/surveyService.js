import Survey from './SurveyModel'


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

    let removeSurvey = (id,callback) => {
         
        Survey.findByIdAndRemove(id).then((survey)=>{
            callback(survey);
        })
    }

    // removeSurvey = Survey => (id) =>{
    //     return Survey.remove({_id:id});
    // }

    // updateSurvey = Survey => (id,obj) =>{
    //     Survey.findById(id, (err, survey)=>{
    //         // survey={...obj};
    //         return survey.save({});
    //     })
    // }
// module.exports = Survey =>{
//     return{
//         listSurvey: listSurvey(Survey),
//         addSurvey: addSurvey(Survey),
//         removeSurvey: removeSurvey(Survey),
//         updateSurvey: updateSurvey(Survey)
//     }
// }


module.exports = {
    listSurvey,
    addSurvey,
    removeSurvey
};