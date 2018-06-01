import mongoose, { model } from 'mongoose';
const Schema = mongoose.Schema;

const ResponseOptionSchema = new Schema({
    value: String
});

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




module.exports =  { 
    Response:mongoose.model('Response',ResponseSchema),
    ResponseOptions: ResponseOptionSchema
};