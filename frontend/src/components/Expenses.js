import React, { Component } from 'react'

import { apiEndpoint } from './helpers'
import LoadingSpinner from './LoadingSpinner'
import DollarInput from './DollarInput'
import { ReactComponent as XIcon } from '../media/x-icon.svg'

import axios from 'axios'

const initialState = {
  loading: false,
  expenses: [],
  newExpenseName: {}
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

  handleNewExpenseName = (e) => {
    this.setState({
      newExpenseName: e.target.value
    })
  }

  handleNewExpense = () => {
    this.setState({loading: true} , () => {
      axios({
        method: 'post',
        url: apiEndpoint('expenses/new'),
        data: {
          name: this.state.newExpenseName
        }
      })
      .then(response => {
        console.log(response)
        this.setState({ loading: false }, this.getExpenses)
      })
      .catch(error => console.log(error))
    })
  }

  updateExpenseValue = (id, value) => {
    this.setState({loading: true} , () => {
      axios({
        method: 'post',
        url: apiEndpoint('expenses/update/allowance'),
        data: {
          id: id,
          monthly_allowance: value
        }
      })
      .then(response => {
        console.log(response)
        this.setState({ loading: false }, this.getExpenses)
      })
      .catch(error => console.log(error))
    })
  }

  updateExpenseName = (id, name) => {
    this.setState({loading: true} , () => {
      axios({
        method: 'post',
        url: apiEndpoint('expenses/update/name'),
        data: {
          id: id,
          name: name
        }
      })
      .then(response => {
        console.log(response)
        this.setState({ loading: false }, this.getExpenses)
      })
      .catch(error => console.log(error))
    })
  }

  deleteExpense = (id) => {
    const expenseToDelete = this.state.expenses.find(x => x.id === id)

    if (expenseToDelete && window.confirm(`Are you sure you want to delete the expense: "${expenseToDelete.name}"?`)) {
      this.setState({loading: true} , () => {
        axios({
          method: 'post',
          url: apiEndpoint('expenses/delete'),
          data: {
            id: id
          }
        })
        .then(response => {
          console.log(response)
          this.setState({ loading: false }, this.getExpenses)
        })
        .catch(error => console.log(error))
      })
    }
  }

  render () {
    if (this.state.loading) {
      return (<LoadingSpinner/>)
    }

    const tableStyle = {
      textAlign: "right",
      margin: "0 auto"
    }

    const xIconStyle = {
      paddingRight: "10px",
      paddingLeft: "10px",
      cursor: "pointer"
    }

    return (
      <div>
        <table style={tableStyle}><tbody>
        { this.state.expenses.sort((a, b) => b.monthly_allowance - a.monthly_allowance).map(expense => {
          return (
            <tr key={expense.id}>
              <td><b>{expense.name}</b></td>
              <td><DollarInput defaultValue={expense.monthly_allowance}
                               handleUpdate={(value) => this.updateExpenseValue(expense.id, value)}/></td>
              <td><XIcon style={xIconStyle} onClick={() => this.deleteExpense(expense.id)}/></td>
            </tr>
          )
        })}
        </tbody></table>
        <br/><br/>
        <div>
          Enter new monthly expense:
          <br/><br/>
          <input type="text" placeholder="Expense Name" onChange={this.handleNewExpenseName}/>
          <button onClick={this.handleNewExpense}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Expenses;
