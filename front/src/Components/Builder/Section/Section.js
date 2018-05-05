import React, { Component } from 'react';

import Question from './Question/Question'
import API from '../../../Models/ApiService'

class Section extends Component {
    
    state ={
        id:'',
        title:''
    }

    componentDidMount = () =>{
        API.Section().getOne({id:this.props.id}).then((res)=>{
            if(res.data){
                this.setState({
                    id:res.data._id,
                    title:res.data.title
                })      
            }          
        })
    }

    changeTitleHandler = (event) => {
    
        const updatedSection = this.state;
        updatedSection.title=event.target.value;

        API.Section().update({id:this.state.id},updatedSection).then((res)=>{
            if(res.data){
                this.setState({title:updatedSection.title});    
            }          
        })
    
      
        
      }
    
      shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps);
        console.log(nextState);
        return true;
    }
    
    render (){
        //console.log('section rednered:'+this.state.id);
        // const questions =this.props.questions.map((q,i)=>{
        //     return <Question 
        //             key={i}
        //             text={q.text}
        //             />
        // })
        
        return(
            <div className="card" >                
                <div className="card-body">
                <button 
                    className="btn btn-sm btn-default float-right"
                >
                    {this.props.i}
                    <i className="material-icons ">settings</i>
                </button>

                <button 
                    className="btn btn-danger btn-sm float-right"
                    onClick={this.props.deleteHandler}
                >
                {this.state.id}
                    <i className="material-icons">delete_forever</i>
                </button>
                <h5 className="card-title">{this.state.title}</h5>  
                <input type='text' value={this.state.title} onChange={(e) => this.changeTitleHandler(e)} />      
                </div>
                <ul className="list-group list-group-flush">
                    {/* {questions}          */}
                </ul>
                <div className="card-body">
                <button  className="btn btn-primary">Add New Question</button>                
                </div>
                <br/>                
            </div>
        );
    }
}

export default Section;