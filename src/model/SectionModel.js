import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    descrption:{
        type:String,
    },
    order:{
        type:Number,
        unique:true
    },
    special:{
        type:Boolean,
        is:{
            welcome:{
                type:Boolean
            },
            result:{
                type:Boolean
            },
            html:{
                type:String
            }
        }
    },
    questions_count:{
        type:Number,
        default:0
    },
    crated_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    },
    survey: {type: Schema.Types.ObjectId, ref: 'Survey'},
    questions: [{type: Schema.Types.ObjectId, ref: 'Questoin'}]

});

module.exports = mongoose.model('Section',SectionSchema);