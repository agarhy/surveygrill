import React, { Component} from 'react';

import Section from './Section/Section';
import API from '../../Models/ApiService'

class Builder extends Component {

    state = {       
        id:'',
        title:'',
        status:'',
        questions_count:0,
        sections:[]        
    }

    //lifeCycleHooks
    
     componentDidMount = () => {
       const Response = API.Survey().getOne({id:'5ae9c55871687b149c386d70'}).then((res)=> {
           //console.log(res.data);

         
            const SureveyData= {
                id:res.data._id,
                title:res.data.title,
                status:res.data.status[0],
                questions_count:res.data.questions_count,
                sections:res.data._sections
           }

           this.setState({
              ...SureveyData
           })
           //console.log(SureveyData);
       })      
    }
    
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps);
        console.log(nextState);
        return true;
    }
    // Custom Handlers
    addSectionHandler = () =>{

        const Response = API.Section().create({survey:this.state.id,title:"Demo Section from React"}).then((res)=> {
            //console.log(res.data);
            const newSection =res.data._id;
            const prevSections=this.state.sections;
            this.setState({
                sections:  [...prevSections, newSection]
                
            })
 
    
        })  

       
    }

    deleteSectionHandler =  (e,i) =>{
        // await API.Section().delete({id:id}).then((res)=>{
            
        // });

        console.log(i);
        
        const newSections= [...this.state.sections];
        newSections.splice(i,1);
    
        this.setState({
            sections:newSections
        })
        console.log(this.state.sections);

        // console.log(id);
        // const newSections = this.state.sections.filter(sec =>{
                
        //     return sec !== id;
        // })
        // console.log(newSections);
        // this.setState({
        //     sections:[...newSections]
        // });
        // console.log(this.state.sections);
        
       // console.log(section);
    }


    render(){
        let sections;
        //console.log(this.state);
        if(this.state.sections.length > 0 ){
            sections = this.state.sections.map((section,i)=>{            
                return <Section 
                            key={i}
                            i={i}
                            id={section}
                            name={section}     
                            deleteHandler={(e) =>  this.deleteSectionHandler(e,i)}
                        />
            })
        }else{
            sections = <div> No Sections </div>
        }
        return (

            <div className='container'>
                <div>
                    <button 
                        className="btn btn-sm btn-primary float-right"
                    >
                        <i className="material-icons ">settings</i>
                    </button>
                    <h2>{this.state.title}</h2>  
                    <small>{this.state.id}</small>              
                </div>
                {sections}

                <button className="btn btn-block btn-primary" onClick={this.addSectionHandler}>Add New Section</button>
            </div>
        )
    }
}

export default Builder;