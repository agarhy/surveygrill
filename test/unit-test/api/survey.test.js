process.env.NODE_ENV = 'test';

require("babel-register")

//const request = require('supertest');
// const expect = require('expect');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const should = require('chai').should;
const sinon = require('sinon');

const {ObjectID} = require('mongodb');

const Survey = require('../../../src/model/SurveyModel');
let server=require('../../../src/index');
chai.use(chaiHttp);


describe('Server API', ()=>{
    beforeEach( (done)=> {
        Survey.remove({}).then( () => done()).catch((e)=>done(e));
    });

    describe('GET /survey', ()=>{
        it('should return an array of surveys', (done)=>{
            chai.request(server)            
            .get('/v1/survey')
            .end((err,res)=>{              
                expect(res.status).to.be.eql(200);
                expect(res.body).to.be.an('Array');
                expect(res.body.length).to.be.equal(0);            
                done();
            });
        })
    });

    describe('POST /survey', ()=>{
       
        const surveySeeder=[{
            _id:new ObjectID(),
            'title':"Survey 1"
        },{
            _id:new ObjectID(),
            'title':"Survey 2"
        }]

        beforeEach((done)=>{
            Survey.remove({}).then(()=>{
                return Survey.insertMany(surveySeeder);        
            }).then( () => done());
        })

        it('should create new survey with title', (done)=>{
            var title="New Title";

            chai.request(server)     
            .post('/v1/survey')
            .send({title})
            .end((err,res)=>{      
                if(err){
                    return done(err);
                }

                expect(res.status).to.be.eql(200);
                expect(res.body.status).to.be.true;
                Survey.find({title}).then((survey)=>{
                    expect(survey.length).to.be.equal(1);
                    expect(survey[0].title).to.equal(title);
                    done();
                }).catch((e)=> done(e));
            })
        
        });
  

        it('should return 404 status if no title given', (done)=>{    

            chai.request(server)  
            .post('/v1/survey')
            .send({})
            .end((err,res)=>{            
                expect(err.status).to.be.eql(400);                
                done();
            });                
        })

    });

    describe('GET /survey/:id', ()=>{
        it('should get a survey by given id', (done) => {
            const survey=new Survey({title : "Demo survey"});
            survey.save().then(()=>{
                chai.request(server)
                .get('/v1/survey/'+survey.id)
                .end((err,res)=>{
                    if(err)
                        return done(err);
                    
                    expect(res.status).to.be.eql(200);
                    expect(res.body._id).to.be.eql(survey.id);
                    done();
                })
            });            
           
        });

        it('should return 404 if inccorrect id given', (done) => {
                const randID=new ObjectID();                
                chai.request(server)
                .get('/v1/survey/'+randID)
                .end((err,res)=>{
                    
                    expect(err.status).to.be.eql(404);
                    expect(res.body).to.be.eql(null);
                    done();
                })
            
        });

        it('should return 404 if  null id given', (done) => {
                const randID=null;
        
                chai.request(server)
                .get('/v1/survey/'+randID)
                .end((err,res)=>{
                    
                    expect(err.status).to.be.eql(404);                
                    done();
                })
            
        });

        //check if user can request uri
        //check if user have access to survey
    })

    describe('PUT /survey/:id', ()=>{
        it('it should update survey with a given id', (done) => {
            let survey = new Survey({title: 'The Survey'})
            survey.save((err, res) => {
                    chai.request(server)
                    .put('/v1/survey/' + survey.id)
                    .send({title: 'The survey updatd'})
                    .end((err, res) => {
                        expect(res.status).to.be.eql(200);  
                        expect(res.body).to.be.an('Object');
                        expect(res.body).to.have.property('message').to.be.eql('record updated!');       
                      done();
                    });
              });
        });

        // it('should return 404 if inccorrect id given', (done) => {
        //         const randID=new ObjectID();                
        //         chai.request(server)
        //         .put('/v1/survey/'+randID)
        //         .end((err,res)=>{
                    
        //             expect(err.status).to.be.eql(404);
        //             expect(res.body).to.be.eql(null);
        //             done();
        //         })
            
        // });

        // it('should return 404 if  null id given', (done) => {
        //         const randID=null;
        
        //         chai.request(server)
        //         .put('/v1/survey/'+randID)
        //         .end((err,res)=>{
                    
        //             expect(err.status).to.be.eql(404);                
        //             done();
        //         })
            
        // });
    })

    describe('DELETE /survey/:id', ()=>{

        const surveySeeder=[{
            _id:new ObjectID(),
            'title':"Survey 1"
        },{
            _id:new ObjectID(),
            'title':"Survey 2"
        }]

        beforeEach((done)=>{
            Survey.remove({}).then(()=>{
                return Survey.insertMany(surveySeeder);        
            }).then( () => done());
        })

        it('should remove a survey',(done)=>{
             var hexId= surveySeeder[0]._id.toHexString();

             chai.request(server)
             .delete(`/v1/survey/${hexId}`)
             .end((err,res)=>{
                 if(err)
                    return done(err)

                expect(res.status).to.be.eql(200);
                expect(res.body.survey._id).to.be.equal(hexId);
                Survey.find({_id:hexId}).then((survey)=>{
                    expect(survey.length).to.be.equal(0);
                    done();
                }).catch((e)=>done(e));
             })

         });

        //  it('should return 404 if survey not found',(done)=>{

        // });

        // it('should return 404 if object id is invalud',(done)=>{

        // });
    });
});
