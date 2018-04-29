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
    updated_at:{
        type:Date,
        default:Date.now
    },
    type:  {type: Schema.Types.ObjectId, ref: 'QuestionType'},
    section: {type: Schema.Types.ObjectId, ref: 'Section'}
});

module.exports = mongoose.model('Question',QuestionSchema);