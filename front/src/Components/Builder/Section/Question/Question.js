import React, { Component } from 'react';

class Question extends Component {


    render (){
        return(
            <li className="list-group-item">
                <button 
                    className="btn btn-danger btn-sm float-right"
                >
                    <i className="material-icons">delete_forever</i>
                </button>
                {this.props.text}
            </li>
        );
    }
}

export default Question;