import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className='container-fluid mt-5'>
        <div className='row'>
          <div id='loader'>
            <p className='text-center'>Loading...</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;
