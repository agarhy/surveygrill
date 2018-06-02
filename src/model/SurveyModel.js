import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SurveySchema = new Schema ({
    title:{
        type:String,
        required:"Title is required",
        minlength: 5,
        maxlength: 200
    },
    description:{
        type: String,
        maxlength: 500
    },
    status:{
        type:[{
            type: String,
            enum: ['draft', 'puplished', 'archived']
        }],
        default:['draft']
    },
    slug:{
        type:String,
        minlength: 5,
        maxlength: 200
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    sections: [{type: Schema.Types.ObjectId, ref: 'Section'}]
})


/**
 * Set virtual property "SectionsCount"
 */
SurveySchema.virtual('SectionsCount').get(function(){
    return this.sections.length;
})
/**
 * Set virtual property "QuestionsCount"
 */
SurveySchema.virtual('QuestionsCount').get(function(){
    //return Section.getQuestionsCount({});
})
/**
 * Update updateAt date after save event
 */
SurveySchema.post('save', function(error, doc, next){
  this.update({},{ $set: { updatedAt: new Date() } });
  next();
})

/**
 * Instance method for appending new sectionID to survey sections list
 * @param String sectionId -  section Id to be added
 * @param function done - callback function
 */
SurveySchema.methods.addSection = function (sectionId) {
    this.update( { $push: { sections: sectionId } }, { multi: false }, function(res){
    });
};

/**
 * Instance method for removing sectionID from survey sections list
 * @param Array sectionIds - Array of sections Id's to be removed
 * @param function done - callback function
 */
SurveySchema.methods.removeSections = function (sectionIds) {
    this.update( { $pull: { sections: { $in: sectionIds } } }, { multi: true }, function(res){
    });
};


module.exports = mongoose.model('Survey',SurveySchema);