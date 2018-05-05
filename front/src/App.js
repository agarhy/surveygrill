import React, { Component } from 'react';

import Layout from './Containers/Layout/Layout';
import Builder from './Components/Builder/Builder';

class App extends Component {

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.messgae }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch('/v1');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  render() {
    return (
      <div>
        <Layout>
            <Builder/>
        </Layout>
      </div>
    );
  }
}

export default App;