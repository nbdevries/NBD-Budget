import React, { Component } from 'react'

import { apiEndpoint } from './helpers'
import LoadingSpinner from './LoadingSpinner'

import axios from 'axios'

const initialState = {
  loading: false,
  expenses: []
}

class Expenses extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.getExpenses()
  }

  getExpenses = () => {
    this.setState({loading: true} , () => {
      axios({
        method: 'get',
        url: apiEndpoint('expenses/')
      })
      .then(response => {
        console.log(response)
        this.setState({
          loading: false,
          expenses: response.data
        })
      })
      .catch(error => console.log(error))
    })
  }

  render () {
    if (this.state.loading) {
      return (<LoadingSpinner/>)
    }

    return (
      <div>
        { this.state.expenses.map(expense => {
          return (
            <div key={expense.id}>{expense.name} {expense.monthly_allowance}</div>
          )
        })}
      </div>
    )
  }
}

export default Expenses;
