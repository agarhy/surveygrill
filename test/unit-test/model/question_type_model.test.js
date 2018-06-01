// process.env.NODE_ENV = 'test';

// require("babel-register")
// const config = require('config');
// const db = require('../../../src/db');
// const mongoose = require("mongoose");
// const {ObjectID} = require('mongodb');

// const chai = require('chai');
// const expect = require('chai').expect;
// const should = require('chai').should;

// const QuestionType = require('../../../src/model/QuestionTypeModel');

// describe("QuestionType model", ()=>{
//     beforeEach( (done)=> {
//         QuestionType.remove({}).then( () => done()).catch((e)=>done(e));
//     });

//     describe("QuestionType model CRUD", ()=>{
//         it("has a module", (done)=>{
//             expect(new QuestionType).to.be.an.instanceof(QuestionType);
//             done();
//         })

//         it("has 0 initial values ",  (done)=>{
//             QuestionType.find({}).then((QuestionType)=>{
//                 expect(QuestionType.length).to.be.equal(0);
//                 done();
//             }).catch((e)=>done(e));
        
//         })

//         it("should save new QuestionType",  (done)=>{
//             const _QuestionType= new QuestionType({name:'New QuestionType'});
//             _QuestionType.save((err)=>{
//                 QuestionType.findOne().then((res)=>{
//                     expect(res.name).to.be.equal('New QuestionType');
//                     done();         
//                 }).catch((e)=>done(e));
//                 // expect(err).to.not.be.true;
//                 // done();        
//             });
        
//         });

//         it("should retrive all documents",  (done)=>{
//             const _QuestionType1= new QuestionType({name:'New QuestionType1'});
//             _QuestionType1.save();
//             const _QuestionType= new QuestionType({name:'New QuestionType2'});
//             _QuestionType.save((err)=>{
//                 QuestionType.find({}).then((QuestionType)=>{
//                     expect(QuestionType.length).to.be.equal(2);
//                     done();
//                 }).catch((e)=>done(e));    
//             });
        
//         });

//         it("should update QuestionType",  (done)=>{
//             let id=new ObjectID();
//             var hexId= id.toHexString();

//             const _QuestionType= new QuestionType({id:id,name:'New QuestionType'});
//             _QuestionType.save();
//             _QuestionType.name="Changed QuestionType name"
//             const update=_QuestionType.save();
//             update.then((res)=>{
//                 expect(res.name).to.equal('Changed QuestionType name');
//                 done(); 
//             }).catch((e)=>done(e));   
            
//         })

//         it("should remove QuestionType",  (done)=>{
//             const _QuestionType= new QuestionType({name:'removed QuestionType'});
//             _QuestionType.save();
//             _QuestionType.remove();

//             QuestionType.findById(_QuestionType.id).then((res)=>{        
//                 expect(res).to.not.be.instanceOf(QuestionType);
//                 done(); 
//             })
            
        
//         })
//     });

//     describe("QuestionType model Validation", ()=>{    

//         it("should have name",  (done)=>{
//             const _QuestionType= new QuestionType({});
//             _QuestionType.save((err)=>{                
//                 expect(err.errors).to.be.an('object');
//                 done();        
//             });
        
//         })
//     });
// })