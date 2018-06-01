import mongoose, { model } from 'mongoose';
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
    question:{ type:Schema.Types.ObjectId, ref:'Question' },
    options:[ ResponseOptionSchema ]
})

/**
 * Set virtual property "OptionsCount"
 */
ResponseSchema.virtual('OptionsCount').get(function(){
    return this.options.length;
});


const ResponseOptionSchema = new Schema({
    value: String
});

module.exports =  { 
    Response:mongoose.model('Response',ResponseSchema),
    ResponseOptions: ResponseOptionSchema
};