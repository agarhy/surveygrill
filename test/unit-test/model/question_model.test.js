process.env.NODE_ENV = 'test';

require("babel-register")
const config = require('config');
const db = require('../../../src/db');
const mongoose = require("mongoose");
const {ObjectID} = require('mongodb');

const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should;

const Question = require('../../../src/model/QuestionModel');

describe("Question model", ()=>{
    

    describe("Question model CRUD", ()=>{
        beforeEach( (done)=> {
            Question.remove({}).then( () => done()).catch((e)=>done(e));
        });

        afterEach((done)=>{
            done();
        });

   
        it("has a module", (done)=>{
            expect(new Question).to.be.an.instanceof(Question);
            done();
        })

        it("has 0 initial values ",  (done)=>{
            Question.find({}).then((Question)=>{
                expect(Question.length).to.be.equal(0);
                done();
            }).catch((e)=>done(e));
        
        })

        it("should save new Question",  (done)=>{
            const _question= new Question({text:'New Question'});
            _question.save((err)=>{
                Question.findOne().then((res)=>{
                    expect(res.text).to.be.equal('New Question');
                    done();         
                }).catch((e)=>done(e));  
            });
        
        });

        it("should have unique order number",  (done)=>{
         

            Question.find({}).then((res)=>{
                let count=res.length;
                
                const _question1= new Question({text:'New Question 1',order:count++});
                _question1.save();
                const _question2= new Question({text:'New Question 2',order:count++});
                _question2.save((err)=>{
                    Question.find({}).then((res)=>{
                        expect(res.length).to.be.equal(2);
                        done();
                    }).catch((e)=>done(e));    
                });
        
            });
            
        });

        it("should update Question",  (done)=>{
         

            const _question= new Question({text:'New Question'});
            _question.save();
            _question.text="Changed Question Title"
            const update=_question.save();
            update.then((res)=>{
                expect(res.text).to.equal('Changed Question Title');
                done(); 
            }).catch((e)=>done(e));   
            
        })

        it("should remove Question",  (done)=>{
            const _question= new Question({text:'removed Question'});
            _question.save();
            _question.remove();

            Question.findById(_question.id).then((res)=>{        
                expect(res).to.not.be.instanceOf(Question);
                done(); 
            })
            
        
        })
    });

    describe("Question model Validation", ()=>{    

        it("should have title",  (done)=>{
            const _question= new Question({});
            _question.save((err)=>{      
                 expect(err.errors).to.be.an('object');
                 done();        
            });
        
        })
    });
})