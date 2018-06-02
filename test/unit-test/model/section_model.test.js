process.env.NODE_ENV = 'test';

require("babel-register")
const config = require('config');
const db = require('../../../src/db');
const mongoose = require("mongoose");
const {ObjectID} = require('mongodb');

const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should;

const Section = require('../../../src/model/SectionModel');

describe("Section model", ()=>{
    

    describe("Section model CRUD", ()=>{
        beforeEach( (done)=> {
            Section.remove({}).then( () => done()).catch((e)=>done(e));
        });

        afterEach((done)=>{
            done();
        });

   
        it("has a module", (done)=>{
            expect(new Section).to.be.an.instanceof(Section);
            done();
        })

        it("has 0 initial values ",  (done)=>{
            Section.find({}).then((Section)=>{
                expect(Section.length).to.be.equal(0);
                done();
            }).catch((e)=>done(e));
        
        })

        it("should save new section",  (done)=>{
            const _section= new Section({title:'New section'});
            _section.save((err)=>{
                Section.findOne().then((res)=>{
                    expect(res.title).to.be.equal('New section');
                    done();         
                }).catch((e)=>done(e));  
            });
        
        });

        it("should have unique order number",  (done)=>{
         

            Section.find({}).then((res)=>{
                let count=res.length;
                
                const _section1= new Section({title:'New section 1',order:count++});
                _section1.save();
                const _section2= new Section({title:'New section 2',order:count++});
                _section2.save((err)=>{
                    Section.find({}).then((res)=>{
                        expect(res.length).to.be.equal(2);
                        done();
                    }).catch((e)=>done(e));    
                });
        
            });
            
        });

        it("should update section",  (done)=>{
         

            const _section= new Section({title:'New section'});
            _section.save();
            _section.title="Changed Section Title"
            const update=_section.save();
            update.then((res)=>{
                expect(res.title).to.equal('Changed Section Title');
                done(); 
            }).catch((e)=>done(e));   
            
        })

        it("should remove section",  (done)=>{
            const _section= new Section({title:'removed section'});
            _section.save();
            _section.remove();

            Section.findById(_section.id).then((res)=>{        
                expect(res).to.not.be.instanceOf(Section);
                done(); 
            })
            
        
        })
    });

    describe("Section model Validation", ()=>{    

        it("should have title",  (done)=>{
            const _section= new Section({});
            _section.save((err)=>{      
                 expect(err.errors).to.be.an('object');
                 done();        
            });
        
        })
    });

    describe('Virtual Types', ()=>{
        it('QuestionsCount returns number of questions',(done)=>{
            let id=new ObjectID();
            const array= [id];
            const _section = new Section({
                title:'Virtual types section',
                questions: array
            });
             
            _section.save()
                .then(()=> Section.findOne({_id:_section._id}))
                .then((section) => {
                    expect(section.QuestionsCount).to.be.equal(1);
                    done();
                })
        })
    });
})