process.env.NODE_ENV = 'test';

require("babel-register")
const config = require('config');
const db = require('../../../src/db');
const mongoose = require("mongoose");
const {ObjectID} = require('mongodb');

const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should;

const Survey = require('../../../src/model/SurveyModel');

xdescribe("Survey model", ()=>{
    beforeEach( (done)=> {
        Survey.remove({}).then( () => done()).catch((e)=>done(e));
    });

    describe("Survey model CRUD", ()=>{
        it("has a module", (done)=>{
            expect(new Survey).to.be.an.instanceof(Survey);
            done();
        })

        it("has 0 initial values ",  (done)=>{
            Survey.find({}).then((survey)=>{
                expect(survey.length).to.be.equal(0);
                done();
            }).catch((e)=>done(e));
        
        })

        it("should save new survey",  (done)=>{
            const _survey= new Survey({title:'New survey'});
            _survey.save((err)=>{
                Survey.findOne().then((res)=>{
                    expect(res.title).to.be.equal('New survey');
                    done();         
                }).catch((e)=>done(e));
                // expect(err).to.not.be.true;
                // done();        
            });
        
        });

        it("should retrive all documents",  (done)=>{
            const _survey1= new Survey({title:'New survey1'});
            _survey1.save();
            const _survey= new Survey({title:'New survey2'});
            _survey.save((err)=>{
                Survey.find({}).then((survey)=>{
                    expect(survey.length).to.be.equal(2);
                    done();
                }).catch((e)=>done(e));    
            });
        
        });

        it("should update survey",  (done)=>{
            let id=new ObjectID();
            var hexId= id.toHexString();

            const _survey= new Survey({id:id,title:'New survey'});
            _survey.save();
            _survey.title="Changed Survey Title"
            const update=_survey.save()
                .then((res)=>{
                    expect(res.title).to.equal('Changed Survey Title');
                    done(); 
                }).catch((e)=>done(e));   
                
        })

        it("should remove survey",  (done)=>{
            const _survey= new Survey({title:'removed survey'});
            _survey.save(()=>{
                _survey.remove(()=>{
                    Survey.findById(_survey.id).then((res)=>{        
                        expect(res).to.not.be.instanceOf(Survey);
                        done(); 
                    })
                });
            });
            

            
        
        })
    });

    describe("Survey model Validation", ()=>{    

        it("should have title",  (done)=>{
            const _survey= new Survey({});
            _survey.save((err)=>{                
                 expect(err.errors.title.message).to.to.equal('Title is required');
                 done();        
            });
        
        })
    });

    describe('Virtual Types', ()=>{
        it('SectionsCount returns number of sections',(done)=>{
            let id=new ObjectID();
            const array= [id];
            const _survey = new Survey({
                title:'Virtual types survey',
                sections: array
            });
             
            _survey.save()
                .then(()=> Survey.findOne({_id:_survey._id}))
                .then((survey) => {
                    expect(survey.SectionsCount).to.be.equal(1);
                    done();
                })
        })
    });
})

