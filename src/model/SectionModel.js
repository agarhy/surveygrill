import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    title:{
        type:String,
        required:"Title is required",
        minlength: 3,
        maxlength: 200
    },
    descrption:{
        type: String,
        maxlength: 500
    },
    order:{
        type:Number,
        //unique:true
    },
    special:{
        type:Boolean,
        default: false
    },
    specialPage:{
        type:[{
            type: String,
            enum: ['welcome', 'result']
        }],
        html:{
            type:String
        }
    },
    questions_count:{
        type:Number,
        default:0
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    survey: {type: Schema.Types.ObjectId, ref: 'Survey'},
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]

});

/**
 * Set virtual property "QuestionsCount"
 */
SectionSchema.virtual('QuestionsCount').get(function(){
    return this.questions.length;
});

/**
 * Update updateAt date after save event
 */
SectionSchema.post('save', function(error, doc, next){
  this.update({},{ $set: { updatedAt: new Date() } });
  next();
})



/**
 * Instance method for appending new Question to section
 * @param String QId - Question Id to be added
 * @param function done - callback function
 */
SectionSchema.methods.addQuestion = function (QId, done) {
    this.update({_id:this._id}, { $push: { questions: QId } }, { multi: true }, function(res){
        done(res);
    });
};

/**
 * Instance method for removing Question(s) from section
 * @param Array QIds - Array of questions Id's to be removed
 * @param function done - callback function
 */
SectionSchema.methods.removeQuestions = function (QIds, done) {
    this.update({_id:this._id}, { $pull: { questions: { $in: QIds } } }, { multi: true }, function(res){
        done(res);
    });
};


module.exports = mongoose.model('Section',SectionSchema);