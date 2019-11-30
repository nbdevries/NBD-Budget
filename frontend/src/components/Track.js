import React, { Component } from 'react'

import LoadingSpinner from './LoadingSpinner'
import DollarInput from './DollarInput'

import { apiEndpoint } from './helpers'

import axios from 'axios'

const initialState = {
  loading: false,
  type: "expense",
  category: "",
  name: "",
  value: 0,
  expenseCategories: [],
  incomeCategories: [],
  obligationCategories: []
}

class Track extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount () {
    this.getCategories()
  }

  getCategories = () => {
    this.setState({loading: true} , () => {
      axios({
        method: 'get',
        url: apiEndpoint('track')
      })
      .then(response => {
        console.log(response)
        this.setState({ loading: false, ...response.data }, () => {
          this.setState({ category: this.state.expenseCategories.length > 0 ? this.state.expenseCategories[0].id : "" })
        })
      })
      .catch(error => console.log(error))
    })
  }

  updateValue = (value) => {
    this.setState({
      value: value
    })
  }

  updateName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleTypeChange = (e) => {
    this.setState({
      type: e.target.value,
      category: this.state[e.target.value + "Categories"].length > 0 ? this.state[e.target.value + "Categories"][0].id : ""
    })
  }

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    })
  }

  submit = () => {
    this.setState({loading: true} , () => {
      axios({
        method: 'post',
        url: apiEndpoint('track/submit'),
        data: {
          type: this.state.type,
          category_id: this.state.category,
          name: this.state.name,
          value: this.state.value
        }
      })
      .then(response => {
        console.log(response)
        this.setState({ loading: false }, this.getList)
      })
      .catch(error => console.log(error))
    })
  }

  render () {
    if (this.state.loading) {
      return (<LoadingSpinner/>)
    }

    const tableStyle = {
      textAlign: "right",
      margin: "0 auto"
    }

    const inputWrapperStyle = {
      backgroundColor: "#606060",
      padding: "5px"
    }

    const inputStyle = {
      background: "transparent",
      border: "none",
      fontSize: "x-large",
      color: "white",
      width: "215px"
    }

    const buttonStyle = {
      color: "white",
      width: "60px",
      padding: "10px",
      backgroundColor: "#555555"
    }

    return (
      <table style={tableStyle}><tbody>
        <tr>
          <td>Type?</td>
          <td style={inputWrapperStyle}>
            <select onChange={this.handleTypeChange} style={{width: "100%"}}>
              <option value={"expense"}>Expense</option>
              <option value={"obligation"}>Obligation</option>
              <option value={"income"}>Income</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Category?</td>
          <td style={inputWrapperStyle}>
            <select onChange={this.handleCategoryChange} style={{width: "100%"}}>
              { this.state[this.state.type + "Categories"].map(x =>
                <option key={x.id} value={x.id}>{x.name}</option>
              )}
            </select>
          </td>
        </tr>
        <tr>
          <td>Name?</td>
          <td style={inputWrapperStyle}>
            <input style={inputStyle} onChange={this.updateName}/>
          </td>
        </tr>
        <tr>
          <td>Amount?</td>
          <td>
            <DollarInput defaultValue={this.state.value} width={"200px"}
                         handleChange={(value) => this.updateValue(value)}/>
          </td>
        </tr>
        <tr><td colSpan={2}><br/><br/></td></tr>
        <tr>
          <td colSpan={2} style={{textAlign: "center"}}>
            <button style={buttonStyle} onClick={this.submit}>Submit</button>
          </td>
        </tr>
      </tbody></table>
    )
  }
}

export default Track;
