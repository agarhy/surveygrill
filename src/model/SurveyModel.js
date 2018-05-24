import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SurveySchema = new Schema ({
    title:{
        type:String,
        required:"Title is required"
    },
    questions_count:{
        type:Number,
        default:0
    },
    status:{
        type:[{
            type: String,
            enum: ['draft', 'puplished', 'archived']
        }],
        default:['draft']
    },
    descrption:{
        type:String,
    },
    slug:{
        type:String
    },
    crated_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    },
    _sections: [{type: Schema.Types.ObjectId, ref: 'Section'}]
})

// SurveySchema.statics.addSection = function (surveyId,sectionId, done) {
//     this.update({_id:surveyId}, { $push: { _sections: sectionId } }, { multi: false }, function(a){
//       console.log("addSection", a);
//       done(a);
//     });
//   };
module.exports = mongoose.model('Survey',SurveySchema);