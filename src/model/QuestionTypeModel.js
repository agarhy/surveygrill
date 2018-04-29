import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QuestionTypeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    crated_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('QuestionType',QuestionTypeSchema);