import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    text:{
        type:String,
        required:true
    },
    order:{
        type:Number,
        unique:true
    },
    responseType:{
        type:[{
            type: String,
            enum: ['mcq', 'text', 'select','range','slider']
        }],
        default:['text']
    },
    conditional:{
        type:Boolean,
        default: false,
        depends:{
            onId:{type: Schema.Types.ObjectId, ref: 'Question'},
            onVale: String
        }
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    //type:  {type: Schema.Types.ObjectId, ref: 'QuestionType'},
    section: {type: Schema.Types.ObjectId, ref: 'Section'},
    responses:[{type: Schema.Types.ObjectId, ref: 'Responses'}]
});

module.exports = mongoose.model('Question',QuestionSchema);