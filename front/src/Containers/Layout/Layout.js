import React from 'react';
import Aux from '../../hoc/Aux';

const layout = (props) =>{ 
    return(
        <Aux>
            {/* <topnav />
            <sidenav /> */}
            <br />
            {props.children}
            <br />
            <footer />
        </Aux>
    );
}

export default layout;