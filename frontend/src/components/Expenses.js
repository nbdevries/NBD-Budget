import React, { Component } from 'react'

import DollarList from './DollarList'

const propsToSend = {
  mainRoute: "expenses",
  itemName: "Expense",
  timeFrame: "monthly"
}

class Expenses extends Component {
  render () {
    return (
      <DollarList {...propsToSend}/>
    )
  }
}

export default Expenses;
