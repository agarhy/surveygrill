process.env.NODE_ENV = 'test';

require("babel-register")
const config = require('config');
const db = require('../../../src/db');
const mongoose = require("mongoose");
const {ObjectID} = require('mongodb');

const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should;

const {Response} = require('../../../src/model/ResponseModel');
const Question = require('../../../src/model/QuestionModel');

describe("Response Model", () => {
   
    describe("Model CRUD - ",()=>{
        let question;
        beforeEach((done)=>{
            
            Response.remove({})
            .then(()=>{
                question = new Question({
                    text: " What is the sea color ? ",
                    order: 1,
                    ResponseType: 'mcq'
                })
    
                return question.save();
                
            })
            .then(()=>{
                done();
            });
        })

        it('should create new response',(done)=>{

            var response = new Response({
                question:question._id
            })
            response.save(()=>{
                Response.find({})
                .then((resp)=>{
                    expect(resp.length).to.be.equal(1);
                    done();
                })
            })
         
        });
    });
})