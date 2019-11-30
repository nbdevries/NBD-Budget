import React, { Component } from 'react'

import DollarList from './DollarList'

const propsToSend = {
  mainRoute: "incomes",
  itemName: "Income",
  timeFrame: "monthly"
}

class Incomes extends Component {
  render () {
    return (
      <DollarList {...propsToSend}/>
    )
  }
}

export default Incomes;
