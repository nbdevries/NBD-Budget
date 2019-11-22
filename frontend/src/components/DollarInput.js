import React, { Component } from 'react'

const initialState = {
  value: 0,
  hover: false
}

class DollarInput extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount () {
    this.setState({
      value: this.props.defaultValue || "0"
    })
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleUpdate = (e) => {
    if (e.key === 'Enter' && this.props.handleUpdate) {
      this.props.handleUpdate(this.state.value)
    }
  }

  render () {

    const defaultStyle = {
      backgroundColor: "#606060",
      padding: "5px"
    }

    const inputStyle = {
      background: "transparent",
      border: "none",
      fontSize: "x-large",
      color: "white",
      width: "100px"
    }

    const dollarSignStyle = {
      fontSize: "x-large"
    }

    return (
      <div style={defaultStyle}>
        <span style={dollarSignStyle}>$</span>
        <input style={inputStyle} value={this.state.value || ""} type="number" onChange={this.handleChange} onKeyDown={this.handleUpdate}/>
      </div>
    )
  }
}

export default DollarInput;
