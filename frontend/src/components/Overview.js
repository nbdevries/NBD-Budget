import React, { Component } from 'react'

import axios from 'axios'

import { apiEndpoint } from './helpers'

import LoadingSpinner from './LoadingSpinner'

const initialState = {
  loading: false,
  incomeTotal: 0,
  expenseTotal: 0,
  obligationsTotal: 0,
  debtTotal: 0
}

class Overview extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }

  componentDidMount () {
    this.getOverview()
  }

  getOverview = () => {
    this.setState({loading: true} , () => {
      axios({
        method: 'get',
        url: apiEndpoint('overview')
      })
      .then(response => {
        console.log(response)
        this.setState({
          loading: false,
          ...response.data
        })
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

    const xLarge = {
      fontSize: "x-large"
    }

    const blackHRStyle = {
      display: "block",
      height: "1px",
      border: "0",
      borderTop: "1px solid #000",
      margin: "1em 0",
      padding: "0"
    }

    const difference = this.state.incomeTotal - this.state.expenseTotal - this.state.obligationsTotal

    return (
      <div>
        <table style={tableStyle}><tbody>
          <tr>
            <td>Incomes</td>
            <td style={xLarge}>$</td>
            <td style={xLarge}>{this.state.incomeTotal}</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td style={xLarge}>$</td>
            <td style={xLarge}>{this.state.expenseTotal}</td>
          </tr>
          <tr>
            <td>Obligations</td>
            <td style={xLarge}>$</td>
            <td style={xLarge}>{this.state.obligationsTotal}</td>
          </tr>
          <tr>
            <td colSpan={2}></td>
            <td><hr/></td>
          </tr>
          <tr>
            <td>Difference</td>
            <td style={xLarge}>$</td>
            <td style={xLarge}>{difference}</td>
          </tr>
          <tr>
            <td colSpan={3}><hr style={blackHRStyle}/></td>
          </tr>
          <tr>
            <td>Debts</td>
            <td style={xLarge}>$</td>
            <td style={xLarge}>{this.state.debtTotal}</td>
          </tr>
        </tbody></table>

        <hr style={blackHRStyle}/>

        <div>
          <h3>Time to pay off debts</h3>
          <table style={tableStyle}><tbody>
            <tr>
              <td>By Obligations</td>
              <td><b>{(this.state.debtTotal/(this.state.obligationsTotal*12)).toFixed(2)}</b> years</td>
            </tr>
            <tr>
              <td>Plus Difference</td>
              <td><b>{(this.state.debtTotal/((this.state.obligationsTotal+difference)*12)).toFixed(2)}</b> years</td>
            </tr>
          </tbody></table>
        </div>
      </div>
    )
  }
}

export default Overview;
