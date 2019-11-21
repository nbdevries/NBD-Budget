import React, { Component } from 'react'

// import css
import '../stylesheets/LoadingSpinner.css';

class LoadingSpinner extends Component {
  render () {
    return (
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}

export default LoadingSpinner;
