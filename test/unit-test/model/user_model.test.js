// process.env.NODE_ENV = 'test';

// require("babel-register")
// const config = require('config');
// const db = require('../../../src/db');
// const mongoose = require("mongoose");
// const {ObjectID} = require('mongodb');

// const chai = require('chai');
// const expect = require('chai').expect;
// const should = require('chai').should;

// const User = require('../../../src/model/UserModel');

// describe("User model", ()=>{
//     before((done) => {
//         User.remove({}).then(() => done());
//     })
//     describe("User model validatino ", (done) => {
//         it("should save user with correct email",(done) =>{
//             const user =new User({
//                 name: "ahmed",
//                 email: "ahmed@domain.com",
//                 password: "mypass123",
//             })

//             user.save((err) => {
              
//                 User.findOne({email:user.email})
//                 .then((user)=>{
//                     expect(user.name).to.be.equal(user.name);
//                     done();
//                 })
//             })
            
//         })

//         it("should not save invalid email",(done) =>{
//             const user =new User({
//                 name: "ahmed",
//                 email: "ahmed2domain.com",
//                 password: "mypass123",
//             })

//             user.save((err) => {
              
//                 expect(err.errors.email.message).to.contain('in not a valid email');
//                 done();        
//             })
            
//         })

//         it("should not save duplicate email",(done) =>{
//             const user =new User({
//                 name: "ahmed",
//                 email: "ahmed@domain.com",
//                 password: "mypass123",
//             })

//             user.save((err) => {
           
//                 expect(err.code).to.be.equal(11000);
//                 done();        
//             })
            
//         })
//     });
// });